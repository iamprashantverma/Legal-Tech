// Node.js core modules for file paths and filesystem utilities
const path = require("path");
const fs = require("fs-extra");

// Cloudinary upload helper
const { uploadToCloudinary } = require("./cloudinary.service");

// Utility to calculate the next document version
const { nextVersion } = require("../utils/version.util");

// Utility to generate checksum for file integrity
const { generateChecksum } = require("../utils/checksum.util");

// Path to metadata JSON file
const METADATA_FILE = path.join(__dirname, "../../metadata/documents.json");

// Base directory where documents are stored locally
const UPLOAD_DIRECTORY = path.join(__dirname, "../../resources/uploads/documents");

// Format author into a consistent tag
function formatAuthor(author) {
  if (author === "System") return "system";          // System uploads
  if (Number.isInteger(author)) return `u${author}`; // User ID uploads
  return String(author).toLowerCase();               
}

// Extract file buffer from different upload formats
async function extractBuffer(file) {
  if (file.buffer) return file.buffer;       // Multer memory storage
  if (file.data) return file.data;           // Some upload libs
  if (file.path) return fs.readFile(file.path); // Disk-stored file
  if (file.toBuffer) return file.toBuffer(); // Custom buffer method
  throw new Error("Unsupported file upload format"); // Fail if unknown
}

// Document service containing all document-related logic
const documentService = {

  // Read metadata JSON from disk
  readMetaData() {
    if (!fs.existsSync(METADATA_FILE)) return {}; // Return empty if file missing
    return fs.readJsonSync(METADATA_FILE);        // Parse JSON metadata
  },

  // Write metadata JSON to disk
  writeMetaData(data) {
    fs.writeJsonSync(METADATA_FILE, data, { spaces: 2 }); // Pretty print JSON
  },

  // Upload document and store it locally
  async uploadDocumentLocally(file, author = "System") {
    const buffer = await extractBuffer(file);     // Get file buffer
    const checksum = generateChecksum(buffer);    // Generate file checksum

    const ext = path.extname(file.filename || file.originalname); // File extension
    const baseName = path.parse(file.filename || file.originalname).name; // File name

    const authorTag = formatAuthor(author);        // Format author tag
    const documentId = `${authorTag}_${baseName}`; // Unique document ID

    const metadata = this.readMetaData();          // Load existing metadata

    // Initialize document metadata if it doesn't exist
    const document = metadata[documentId] || {
      documentId,
      title: baseName + ext,
      author,
      status: "DRAFT",
      createdDate: new Date().toISOString(),
      modifiedDate: new Date().toISOString(),
      currentVersion: "0.0",
      storage: "LOCAL",
      versions: []
    };

    const version = nextVersion(document.currentVersion); 

    const documentDir = path.join(UPLOAD_DIRECTORY, documentId); // Document folder
    await fs.ensureDir(documentDir);                              // Create if missing

    const filePath = path.join(
      documentDir,
      `${authorTag}_${baseName}_v${version}${ext}` 
    );

    await fs.writeFile(filePath, buffer); 

    document.currentVersion = version;                    
    document.modifiedDate = new Date().toISOString();     

    // Store version metadata
    document.versions.push({
      versionNumber: version,
      filePath,
      checksum,
      createdDate: new Date().toISOString()
    });

    metadata[documentId] = document;
    this.writeMetaData(metadata);    

    return { documentId, version, filePath }; 
  },

  // Upload document to Cloudinary
  async uploadDocumentToCloudinary(file, author = "System") {
    const buffer = await extractBuffer(file);   // Get file buffer
    const checksum = generateChecksum(buffer);  // Generate checksum

    const ext = path.extname(file.filename);    // File extension
    const baseName = path.parse(file.filename).name; // File name

    const authorTag = formatAuthor(author);   
    const documentId = `${authorTag}_${baseName}`; 

    const metadata = this.readMetaData();    

    // Initialize document metadata if it doesn't exist
    const document = metadata[documentId] || {
      documentId,
      title: baseName + ext,
      author,
      status: "DRAFT",
      createdDate: new Date().toISOString(),
      modifiedDate: new Date().toISOString(),
      currentVersion: "0.0",
      storage: "CLOUDINARY",
      versions: []
    };

    const version = nextVersion(document.currentVersion); 
    const publicId = `${authorTag}_${baseName}_v${version}`; 


    const cloudResult = await uploadToCloudinary(
      buffer,
      publicId,
      "intake_uploads/documents"
    );

    document.currentVersion = version;                
    document.modifiedDate = new Date().toISOString(); 

    // Store version metadata
    document.versions.push({
      versionNumber: version,
      cloudUrl: cloudResult.secure_url,
      checksum,
      createdDate: new Date().toISOString()
    });

    metadata[documentId] = document; 
    this.writeMetaData(metadata);  

    return { documentId, version, cloudUrl: cloudResult.secure_url }; // Return result
  }
};


module.exports = { documentService };
