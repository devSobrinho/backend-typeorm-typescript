**RF** -> Requisitos funcionais -> funcionalidades que nossa aplicação podera ter
**RNF** -> Requisitos não funcionais -> requisitos que não estão ligados diretamente com nossa aplicação
**RN** -> Regras de negócios -> as regras para que os requisitos funcionais funcionem


# Cadastro de carro

**RF**
  - Deve ser possível cadastrar um novo carro.

**RN**
  - Não deve ser possível cadastrar um carro com uma placa já existente.
  - O carro deve ser cadastrado por padrão com disponibilidade.
*  - O usuário responsável pelo cadastro deve ser um usuário administrador.


# Listagem de carros

**RF**
  - Deve ser possível listar todos os carros dispiníveis.
  - Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
  - Deve ser possível listar todos os carros disponíveis pelo nome da marca.
  - Deve ser possível listar todos os carros disponíveis pelo nome da carro.

**RN**
  - O usuário não precisa esta logado no sistema.


# Cadastro de Especificação no carro

**RF**
  - Deve ser possível cadastrar uma ou mais especificações para um carro.


**RN**
  - Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
  - Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
  - O usuário responsável pelo cadastro deve ser um usuário administrador.


# Cadastro de imagens do carro

**RF**
  - Deve ser possível cadastrar a imagem do carro.
  - Deve ser possível listar todos os carros.

**RNF**
  - Utilizar o multer para upload dos arquivos.

**RN**
  - O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
  - O usuário responsável pelo cadastro deve ser um usuário administrador.


# Alugel

**RF**
  - Deve ser possível cadastrar um aluguel.

**RN**
  - O aluguel deve ter duração mínima de 24 horas.
  - Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário. 
  - Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro. # backend-typeorm-typescript
# backend-typeorm-typescript
