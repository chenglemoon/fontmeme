import { filesize } from 'filesize';

/**
 * Generate unique ID
 */
let __UniqIdIndex = 0;
export function uniqId() {
  __UniqIdIndex += 1;
  return __UniqIdIndex;
}

export function formatSize(num: number) {
  const result = filesize(num, { standard: 'jedec', output: 'array' });
  return result[0] + ' ' + result[1];
}

export const toDownloadFile = (url: string, name: string) => {
  const tmpLink = document.createElement('a');
  tmpLink.href = url;
  tmpLink.download = name;
  tmpLink.style.cssText = 'position: absolute; z-index: -111; visibility: none;';
  document.body.appendChild(tmpLink);
  tmpLink.click();
  document.body.removeChild(tmpLink);
};

export function getOutputFileName(info: any, option: any) {
  const originalName = info.name;
  const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '');
  const ext = originalName.split('.').pop()?.toLowerCase() || '';
  
  let targetExt = ext;
  if (option.format?.target && option.format.target !== 'auto') {
    targetExt = option.format.target;
  }
  
  return `${nameWithoutExt}.${targetExt}`;
}

export function getUniqNameOnNames(names: Set<string>, fileName: string) {
  if (!names.has(fileName)) {
    return fileName;
  }
  
  let counter = 1;
  const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '');
  const ext = fileName.split('.').pop() || '';
  let newName = `${nameWithoutExt}_${counter}.${ext}`;
  
  while (names.has(newName)) {
    counter++;
    newName = `${nameWithoutExt}_${counter}.${ext}`;
  }
  
  return newName;
}

export async function getFilesFromHandle(handle: FileSystemDirectoryHandle) {
  const files: File[] = [];
  
  for await (const entry of (handle as any).values()) {
    if (entry.kind === 'file') {
      const file = await entry.getFile();
      files.push(file);
    } else if (entry.kind === 'directory') {
      const subFiles = await getFilesFromHandle(entry);
      files.push(...subFiles);
    }
  }
  
  return files;
}

export async function getFilesFromEntry(entry: FileSystemEntry): Promise<File[]> {
  const files: File[] = [];
  
  if (entry.isFile) {
    return new Promise((resolve) => {
      (entry as FileSystemFileEntry).file((file) => {
        resolve([file]);
      });
    });
  } else if (entry.isDirectory) {
    const dirReader = (entry as FileSystemDirectoryEntry).createReader();
    const entries = await new Promise<FileSystemEntry[]>((resolve) => {
      dirReader.readEntries((entries) => {
        resolve(Array.from(entries));
      });
    });
    
    for (const subEntry of entries) {
      const subFiles = await getFilesFromEntry(subEntry);
      files.push(...subFiles);
    }
  }
  
  return files;
}

export async function getFilesHandleFromHandle(handle: FileSystemDirectoryHandle) {
  // Process files from directory handle
  return handle;
}

export async function createImageBatch(
  children: FileSystemHandle[],
  createImage: (file: File, dirName?: string) => Promise<void>,
  dirName: string
) {
  for (const child of children) {
    if (child.kind === 'file') {
      const fileHandle = child as FileSystemFileHandle;
      const file = await fileHandle.getFile();
      await createImage(file, dirName);
    } else if (child.kind === 'directory') {
      const dirHandle = child as FileSystemDirectoryHandle;
      const subChildren: FileSystemHandle[] = [];
      for await (const entry of (dirHandle as any).values()) {
        if (entry.kind === 'directory') {
          subChildren.push(entry);
        } else if (entry.kind === 'file') {
          const fileHandle = entry as FileSystemFileHandle;
          const file = await fileHandle.getFile();
          await createImage(file, `${dirName}/${dirHandle.name}/`);
        }
      }
      if (subChildren.length > 0) {
        await createImageBatch(subChildren, createImage, `${dirName}/${dirHandle.name}/`);
      }
    }
  }
}

export const isAppleDevice = () => {
  const PLATFORM = typeof navigator === 'object' ? navigator.platform : '';
  return /Mac|iPod|iPhone|iPad/.test(PLATFORM);
};

export const modKey = () => (isAppleDevice() ? '⌘' : 'Ctrl');
