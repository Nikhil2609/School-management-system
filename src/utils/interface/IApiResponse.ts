export interface APIResponse {
  data?: any;
  meta?: MetaTokenResponse | MetaPaginationResponse;
  message?: string;
  error?: string;
}

export interface MetaTokenResponse {
  token?: string;
}

export interface MetaPaginationResponse {
  totalRows: number;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface RegisterBody {
  email: string;
  password: string;
}
