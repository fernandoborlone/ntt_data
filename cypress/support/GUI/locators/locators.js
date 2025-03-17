const locators = {
  PAGE_CREATE_USER: {
    BTN_CREATE_USER: '[data-testid="cadastrarUsuario"]',
  },
  PAGE_CREATE_PRODUCT: {
    BTN_REGISTER: '[data-testid="cadastarProdutos"]',
    INPUT_NAME: '[data-testid="nome"]',
    INPUT_PRICE: '[data-testid="preco"]',
    INPUT_DESCRIPTION: 'textarea[data-testid="descricao"]',
    INPUT_QUANTITY: '[data-testid="quantity"]',
  },
  PAGE_HOME: {
    BTN_CREATE_USERS: '[data-testid="cadastrarUsuarios"]',
    BTN_CREATE_PRODUCTS: '[data-testid="cadastrarProdutos"]',
    BTN_LOGOUT: '[data-testid="logout"]',
    BTN_PRODUCTS_LIST: '[data-testid="listarProdutos"]',
  },
  PAGE_LOGIN: {
    BTN_SUBMIT: '[data-testid="entrar"]',
    INPUT_EMAIL: '[data-testid="email"]',
    INPUT_PASSWORD: '[data-testid="senha"]',
    LINK_REGISTER: '[data-testid="cadastrar"]',
  },
  PAGE_PRODUCTS_LIST: {
    TBL_LIST: 'tbody tr',
  },
  PAGE_REGISTER: {
    ALERT: '.alert-link',
    ALERT_ERROR: '.alert',
    BTN_SUBMIT: '[data-testid="cadastrar"]',
    CHK_ADM_ACCOUNT: '[data-testid="checkbox"]',
    INPUT_EMAIL: '[data-testid="email"]',
    INPUT_NAME: '[data-testid="nome"]',
    INPUT_PASSWORD: '[data-testid="password"]',
  },
}
export default locators
