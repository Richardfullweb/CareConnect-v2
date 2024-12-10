import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oxizvwxyblaaacaojzzd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94aXp2d3h5YmxhYWFjYW9qenpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE1OTk4MzQsImV4cCI6MjA0NzE3NTgzNH0.mVufHg7eNdbtAKfMuYprFCiZIXJ1YaeBH4HdIYZpkJY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
    try {
        // Teste 1: Verificar conexão básica através da tabela categories
        const { data: categories, error: categoriesError } = await supabase
            .from('categories')
            .select('name')
            .limit(1);

        if (categoriesError) {
            throw new Error(`Erro ao acessar categories: ${categoriesError.message}`);
        }

        console.log('✅ Conexão com o Supabase estabelecida com sucesso!');
        console.log(`Categories encontradas: ${categories?.length || 0}`);

        // Teste 2: Verificar autenticação anônima
        const { data: { session }, error: authError } = await supabase.auth.getSession();
        
        if (authError) {
            console.log('⚠️ Aviso: Erro ao verificar sessão:', authError.message);
        } else {
            console.log('✅ Cliente configurado corretamente para autenticação');
        }

        // Teste 3: Verificar acesso a outras tabelas
        const tables = ['events', 'profiles', 'tickets'];
        for (const table of tables) {
            const { error } = await supabase
                .from(table)
                .select('id')
                .limit(1);

            if (error) {
                console.log(`⚠️ Aviso: Erro ao acessar ${table}: ${error.message}`);
            } else {
                console.log(`✅ Acesso à tabela ${table} confirmado`);
            }
        }

    } catch (error) {
        console.error('❌ Erro ao testar conexão:', error);
        return false;
    }
}

// Executar o teste
testConnection();
