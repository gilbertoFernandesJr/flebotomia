import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfLGPD'
})
export class CpfLGPDPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return value;
    }

    // Verifica se o CPF possui o formato esperado com pontuação 111.222.333-44
    const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (cpfPattern.test(value)) {
      //console.error('CPF não está no formato correto');
      // Retorna o CPF mascarado
      return `***.${value.substring(4, 7)}.${value.substring(8, 11)}-**`;
    }

    if (value.length != 11) {
      return value;
    }

    // Formata o CPF e aplica a máscara tipo 11122233344
    const parteVisivel1 = value.substring(3, 6);
    const parteVisivel2 = value.substring(6, 9);
    return `***.${parteVisivel1}.${parteVisivel2}-**`;
  }
}
