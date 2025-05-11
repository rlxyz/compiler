export const environs = {
  collectionSize: Number(process.env.COLLECTION_SIZE || 1111),
  storageUrl: process.env.STORAGE_URL || "https://ipfs.rlxyz.xyz/ipfs/",
  description: process.env.COLLECTION_DESCRIPTION || "",
  externalUrl:
    process.env.COLLECTION_EXTERNAL_URL || "https://reflections.dreamlab.art/",
  storageService: process.env.STORAGE_SERVICE || "s3",
  numProcesses: Number(process.env.WATCHER_NUM_PROCESSES || 1),
  moduloResult: Number(process.env.WATCHER_MODULO_RESULT || 0),
};
