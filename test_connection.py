from supabase import create_client

# Configurações do Supabase
SUPABASE_URL = "https://oxizvwxyblaaacaojzzd.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94aXp2d3h5YmxhYWFjYW9qenpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE1OTk4MzQsImV4cCI6MjA0NzE3NTgzNH0.mVufHg7eNdbtAKfMuYprFCiZIXJ1YaeBH4HdIYZpkJY"

def test_connection():
    try:
        # Criar cliente Supabase
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
        
        # Tentar fazer uma consulta na tabela categories
        response = supabase.table('categories').select("*").execute()
        
        print("Conexão estabelecida com sucesso!")
        print(f"Número de categorias encontradas: {len(response.data)}")
        
        # Mostrar as categorias encontradas
        if response.data:
            print("\nCategorias:")
            for category in response.data:
                print(f"- {category.get('name', 'N/A')}")
        else:
            print("Nenhuma categoria encontrada, mas a conexão está funcionando!")
            
        return True
    except Exception as e:
        print(f"Erro ao conectar com o Supabase: {str(e)}")
        return False

if __name__ == "__main__":
    test_connection()
