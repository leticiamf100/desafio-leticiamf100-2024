class RecintosZoo {
    constructor() {
      this.recintos = [
        { numero: 1, bioma: 'savana1', tamanho: 10, animais: ['macaco', 'macaco', 'macaco'] },
        { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
        { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: ['gazela'] },
        { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
        { numero: 5, bioma: 'savana2', tamanho: 9, animais: ['leao'] }
      ];

      this.animaisInfo = {
        'LEAO': { tamanho: 3, biomas: ['savana2'], carnivoro: true },
        'LEOPARDO': { tamanho: 2, biomas: ['savana2'], carnivoro: true },
        'CROCODILO': { tamanho: 3, biomas: ['rio'], carnivoro: true },
        'MACACO': { tamanho: 1, biomas: ['savana1', 'floresta', 'savana e rio'], carnivoro: false },
        'GAZELA': { tamanho: 2, biomas: ['savana1', 'savana e rio'], carnivoro: false },
        'HIPOPOTAMO': { tamanho: 4, biomas: ['savana1', 'rio', 'savana e rio'], carnivoro: false }
      };
    }

    analisaRecintos(animal, quantidade) {
        if (!this.animaisInfo[animal]) return { erro: 'Animal inválido' };
        if (quantidade <= 0) return { erro: 'Quantidade inválida' };
    
        const { tamanho, biomas, carnivoro } = this.animaisInfo[animal];
        const recintosViaveis = [];
    
        for (let recinto of this.recintos) {
            // Verifica compatibilidade de bioma
            if (!biomas.includes(recinto.bioma) && !(recinto.bioma === 'savana e rio' && animal === 'HIPOPOTAMO')) {
                continue;
            }
    
            // Animais herbívoros só podem ir para savana1
            if (!carnivoro && recinto.bioma === 'savana2') continue;
    
            // Animais carnívoros só podem ir para savana2
            if (carnivoro && recinto.bioma === 'savana1') continue;
    
            // Calcula espaço ocupado pelos animais já existentes no recinto
            let espacoOcupado = 0;
            if (recinto.animais.length > 0) {
                for (let animalExistente of recinto.animais) {
                    espacoOcupado += this.animaisInfo[animalExistente.toUpperCase()].tamanho;
                }
                // Considera o espaço extra se houver mais de uma espécie
                if (recinto.animais.length > 0 && recinto.animais[0].toUpperCase() !== animal) {
                    espacoOcupado += 1; // Regra do espaço extra
                }
            }
    
            // Verifica se há espaço suficiente para o novo animal
            const espacoDisponivel = recinto.tamanho - espacoOcupado;
            if (espacoDisponivel < tamanho * quantidade) continue;
    
            // Verifica se o novo animal é carnívoro e se ele pode coexistir com outros animais
            if (carnivoro && recinto.animais.length > 0 && recinto.animais[0].toUpperCase() !== animal) continue;
    
            // Verifica regra do macaco (precisa de outro animal no recinto)
            if (animal === 'MACACO' && quantidade === 1 && recinto.animais.length === 0) continue;
    
            // Se o recinto for viável, calcula o espaço restante
            const espacoRestante = recinto.tamanho - (espacoOcupado + quantidade * tamanho);
            recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoRestante} total: ${recinto.tamanho})`);
        }

        console.log('Recintos viáveis encontrados:', recintosViaveis);
      return recintosViaveis.length > 0 ? { recintosViaveis } : { erro: 'Não há recinto viável' };
    }
  }

  export { RecintosZoo };

