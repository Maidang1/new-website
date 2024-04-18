import path from 'path';

export function normalizePath(id: string): string {
  return path.posix.normalize(isWindows ? slash(id) : id);
}
const windowsSlashRE = /\\/g;
export function slash(p: string): string {
  return p.replace(windowsSlashRE, '/');
}

export const isWindows =
  typeof process !== 'undefined' && process.platform === 'win32';

export async function recursiveReaddir(dir: string): Promise<string[]> {
  const fsp = await import('fs/promises');
  const fs = await import('fs');
  const path = await import('path');
  if (!fs.existsSync(dir)) {
    return [];
  }

  let directs;
  try {
    directs = await fsp.readdir(dir, { withFileTypes: true });
  } catch (e: any) {
    if (e.code === 'EACCES') {
      // Ignore permission errors
      return [];
    }
    throw e;
  }
  if (directs.some((dirent) => dirent.isSymbolicLink())) {
    const err: any = new Error(
      'Symbolic links are not supported in recursiveReaddir'
    );
    err.code = 'ERR_SYMLINK_IN_RECURSIVE_READDIR';
    throw err;
  }
  const files = await Promise.all(
    directs.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? recursiveReaddir(res) : normalizePath(res);
    })
  );
  return files.flat(1);
}

export function getSegments(file: string) {
  let segments = file.slice(0, -4).replace(/\\/g, '/').split('/');
  if (segments[segments.length - 1] === 'index') {
    segments.pop();
  }
  return segments;
}
