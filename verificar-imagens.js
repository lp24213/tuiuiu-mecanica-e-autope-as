// Script para verificar se as imagens foram adicionadas corretamente
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'images');
const requiredImages = [
    'logo.png',
    'caminhao-oficina.jpg'
];

const optionalImages = [
    'rolamento.jpg',
    'loja-autopecas.jpg'
];

console.log('🔍 Verificando imagens na pasta images/...\n');

// Verificar se a pasta existe
if (!fs.existsSync(imagesDir)) {
    console.log('❌ ERRO: A pasta images/ não existe!');
    console.log('   Crie a pasta: mkdir images');
    process.exit(1);
}

// Listar todos os arquivos na pasta
const files = fs.readdirSync(imagesDir).filter(f => 
    f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg')
);

console.log('📁 Arquivos encontrados na pasta images/:');
if (files.length === 0) {
    console.log('   ❌ NENHUM ARQUIVO DE IMAGEM ENCONTRADO!');
} else {
    files.forEach(file => {
        const filePath = path.join(imagesDir, file);
        const stats = fs.statSync(filePath);
        const sizeKB = (stats.size / 1024).toFixed(2);
        console.log(`   ✓ ${file} (${sizeKB} KB)`);
    });
}

console.log('\n📋 Verificando imagens obrigatórias:');
let allOk = true;

requiredImages.forEach(img => {
    const filePath = path.join(imagesDir, img);
    if (fs.existsSync(filePath)) {
        console.log(`   ✅ ${img} - OK`);
    } else {
        console.log(`   ❌ ${img} - FALTANDO!`);
        allOk = false;
    }
});

console.log('\n📋 Imagens opcionais:');
optionalImages.forEach(img => {
    const filePath = path.join(imagesDir, img);
    if (fs.existsSync(filePath)) {
        console.log(`   ✅ ${img} - OK`);
    } else {
        console.log(`   ⚠️  ${img} - Não encontrada (opcional)`);
    }
});

if (allOk) {
    console.log('\n✅ TODAS AS IMAGENS OBRIGATÓRIAS ESTÃO PRESENTES!');
    console.log('🎉 O site deve funcionar corretamente agora!');
} else {
    console.log('\n❌ FALTAM IMAGENS OBRIGATÓRIAS!');
    console.log('📝 Siga as instruções em COMO_SALVAR_IMAGENS.md');
}

