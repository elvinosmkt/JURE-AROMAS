# Plano de Construção Frontend - Jurê Aromas

Este plano detalha as etapas para construir o frontend completo do e-commerce Jurê Aromas, com foco especial na implementação do Painel Administrativo baseado nas referências visuais fornecidas (tema Dark Green e Gold).

## 1. Estrutura e Configuração Inicial
- [ ] **Organização de Pastas**: Reestruturar o projeto para separar claramente a Loja (Storefront) do Painel Administrativo (Admin).
  - `src/layouts/`: `MainLayout` (Loja), `AdminLayout` (Painel).
  - `src/pages/store/`: Páginas da loja (Home, Produto, Checkout).
  - `src/pages/admin/`: Páginas do painel (Dashboard, Pedidos, Produtos, Clientes).
  - `src/components/admin/`: Componentes específicos do admin (Sidebar, StatsCard, StatusBadge).
- [ ] **Definição de Tema**: Atualizar o `tailwind.config.js` com a paleta de cores exata das imagens (Dark Green `#0f281e`, Gold `#d4a351`, Light Background `#f8f9fa`, Success Green `#50b83c`).

## 2. Implementação do Layout Administrativo (`AdminLayout`)
- [ ] **Sidebar (Menu Lateral)**:
  - Fundo Dark Green com logo Jurê em Gold.
  - Navegação: Dashboard, Pedidos, Produtos, Clientes, Relatórios, Marketing/Promoções, Configurações.
  - Item ativo com destaque (fundo verde mais claro ou borda lateral).
- [ ] **Header (Topo)**:
  - Barra de busca global.
  - Notificações e Perfil do Administrador.
  - Breadcrumbs para navegação.

## 3. Desenvolvimento das Páginas do Painel

### 3.1 Dashboard (Visão Geral)
- [ ] **Cards de Métricas**: Total de Vendas, Pedidos Hoje, Taxa de Conversão, Visitantes Online.
- [ ] **Gráfico de Vendas**: Implementar visualização gráfica (usando `recharts` ou similar, mockado inicialmente) para "Desempenho de Vendas Mensais".
- [ ] **Tabela de Pedidos Recentes**: Listagem simplificada com Status colorido.

### 3.2 Gestão de Pedidos
- [ ] **Listagem de Pedidos**:
  - Filtros por abas: Todos, Aguardando Pagamento, Em Preparação, Enviado, Entregue, Cancelado.
  - Tabela detalhada com ID, Data, Cliente, Valor e Status.
- [ ] **Detalhes do Pedido**:
  - Timeline de status (Pago -> Preparação -> Despachado -> Entregue).
  - Lista de itens comprados.
  - Cards de endereço de entrega e dados do cliente.
  - Área de "Expedição e Logística" com etiqueta de envio e rastreamento.

### 3.3 Gestão de Produtos (Inventário)
- [ ] **Listagem**: Tabela com miniatura da imagem, nome, categoria, estoque, preço e status.
- [ ] **Edição/Criação**:
  - Formulário de cadastro com "Live Preview" (como visto na imagem de referência).
  - Upload de imagens.
  - Configuração de variantes e notas olfativas.

### 3.4 Marketing e Promoções
- [ ] **Painel de Cupons**:
  - Cards de Campanhas Ativas.
  - Tabela de cupons com barra de progresso de uso.
  - Botão para criar novo cupom.

### 3.5 Clientes
- [ ] **Listagem de Clientes**: Dados básicos e status (Ativo/Inativo).
- [ ] **Perfil do Cliente**: Histórico de pedidos e LTV (Lifetime Value).

## 4. Integração e Refinamento
- [ ] **Rotas**: Configurar `react-router-dom` para proteger as rotas `/admin` (simulação de login).
- [ ] **Mock Data**: Expandir `constants.tsx` para incluir dados fictícios robustos para o admin (pedidos passados, métricas, lista de clientes).
- [ ] **Responsividade**: Garantir que o painel funcione bem em tablets e desktops.

## 5. Review Final
- [ ] Comparação visual com as imagens de referência.
- [ ] Teste de fluxo: Navegar da Home -> Checkout -> Admin -> Processar Pedido.
