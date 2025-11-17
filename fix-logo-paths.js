// Script para corrigir os caminhos da logo em todas as páginas de produtos
const fs = require('fs');
const path = require('path');

const produtosDir = path.join(__dirname, 'produtos');
const produtos = fs.readdirSync(produtosDir).filter(f => f.endsWith('.html'));

produtos.forEach(file => {
    const filePath = path.join(produtosDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Corrigir caminho da logo
    content = content.replace(
        /src="\.\.\/images\/produtos\/[^"]+\.jpg" alt="TUIUIÚ AUTO PEÇAS" class="logo-img"/g,
        'src="../images/logo.png" alt="TUIUIÚ AUTO PEÇAS" class="logo-img"'
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Corrigido: ${file}`);
});

console.log('\n✅ Todos os caminhos da logo foram corrigidos!');

