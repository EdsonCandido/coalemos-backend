import { manterApenasNumeros } from '../../helpers/format';

export class SearchCEPService {
  public async execute(cep: string) {
    const sanitazeCEP = manterApenasNumeros(cep);

    if (sanitazeCEP.length !== 8) throw new Error('CEP inválido');

    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200)
      throw new Error('Não foi possível encontrar o CEP');

    const data = await response.json();

    const result = {
      cep: data.cep,
      logradouro: data.logradouro,
      bairro: data.bairro,
      cidade: data.localidade,
      uf: data.uf,
    };
    return result;
  }
}
