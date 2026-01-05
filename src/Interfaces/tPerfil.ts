type Roles = 'admin' | 'usuario';

const roleMap: Record<Roles, string> = {
  admin: 'Administrador do sistema',
  usuario: 'Usuário comum',
};

export { Roles, roleMap };
