import { Roles } from './tPerfil';
export type tUser = {
  cod?: number;
  nome?: string;
  login?: string;
  senha?: string;
  foto_perfil?: string;
  is_primeiro_acesso?: boolean;
  perfil?: Roles;
  is_ativo?: boolean;
  created_at?: string;
  updated_at?: string;
};
