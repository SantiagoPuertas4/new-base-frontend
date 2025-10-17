import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

const isWindows = os.platform() === 'win32';

try {
  const nodeModulesPath = path.join(process.cwd(), 'node_modules');
  if (fs.existsSync(nodeModulesPath)) {
    console.log('🗑️  Eliminando node_modules...');
    if (isWindows) {
      execSync(`rmdir /s /q "${nodeModulesPath}"`, {
        stdio: 'inherit',
        shell: true,
      });
    } else {
      execSync(`rm -rf "${nodeModulesPath}"`, { stdio: 'inherit' });
    }
    console.log('✅ node_modules eliminado');
  } else {
    console.log('ℹ️  No se encontró node_modules');
  }

  const lockFilePath = path.join(process.cwd(), 'package-lock.json');
  if (fs.existsSync(lockFilePath)) {
    console.log('🗑️  Eliminando package-lock.json...');
    if (isWindows) {
      execSync(`del "${lockFilePath}"`, { stdio: 'inherit', shell: true });
    } else {
      fs.unlinkSync(lockFilePath);
    }
    console.log('✅ package-lock.json eliminado');
  } else {
    console.log('ℹ️  No se encontró package-lock.json');
  }

  console.log('📦 Instalando dependencias...');
  execSync('npm install', { stdio: 'inherit', shell: isWindows });

  console.log('✨ ¡Proceso completado con éxito!');
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
