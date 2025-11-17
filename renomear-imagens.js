// Script para renomear as imagens para os nomes corretos
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'images');

const renames = [
    { from: 'logotipo.png', to: 'logo.png' },
    { from: 'prateleira loja.png', to: 'loja-autopecas.png' },
    { from: 'rolamento castertech.png', to: 'rolamento.png' }
];

console.log('🔄 Renomeando imagens...\n');

renames.forEach(({ from, to }) => {
    const fromPath = path.join(imagesDir, from);
    const toPath = path.join(imagesDir, to);
    
    if (fs.existsSync(fromPath)) {
        try {
            fs.renameSync(fromPath, toPath);
            console.log(`✅ ${from} → ${to}`);
        } catch (error) {
            console.log(`❌ Erro ao renomear ${from}: ${error.message}`);
        }
    } else {
        console.log(`⚠️  ${from} não encontrado`);
    }
});

// Também criar um link simbólico ou copiar para caminhao-oficina.jpg se não existir
const lojaPath = path.join(imagesDir, 'loja-autopecas.png');
const caminhaoPath = path.join(imagesDir, 'caminhao-oficina.jpg');

if (fs.existsSync(lojaPath) && !fs.existsSync(caminhaoPath)) {
    // Copiar a imagem da loja como caminhao-oficina também
    const fsExtra = require('fs-extra');
    try {
        fs.copyFileSync(lojaPath, path.join(imagesDir, 'caminhao-oficina.png'));
        console.log('✅ Criado caminhao-oficina.png (cópia de loja-autopecas.png)');
    } catch (error) {
        console.log('⚠️  Não foi possível criar caminhao-oficina.png');
    }
}

console.log('\n✅ Renomeação concluída!');

