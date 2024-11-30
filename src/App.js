import React, { useState } from 'react';

const CadastroPassageiroScreen = () => {
  // Estados para armazenar os dados do formulário
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [errors, setErrors] = useState({});

  // Função para formatar CPF
  const formatCPF = (value) => {
    const cleanedValue = value.replace(/\D/g, '');
    
    if (cleanedValue.length <= 11) {
      return cleanedValue
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    return cleanedValue.slice(0, 14);
  };

  // Função para formatar Data
  const formatData = (value) => {
    const cleanedValue = value.replace(/\D/g, '');
    
    if (cleanedValue.length <= 8) {
      return cleanedValue
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{2})(\d)/, '$1/$2');
    }
    return cleanedValue.slice(0, 10);
  };

  // Função para validar CPF 
  const validarCPF = (cpf) => {
    const cpfLimpo = cpf.replace(/[^\d]/g, '');
    
    if (cpfLimpo.length !== 11) return false;
    
    if (/^(\d)\1+$/.test(cpfLimpo)) return false;
    
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpfLimpo.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    
    if (resto !== parseInt(cpfLimpo.charAt(9))) return false;
    
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpfLimpo.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    
    return resto === parseInt(cpfLimpo.charAt(10));
  };

  // Função para validar data de nascimento
  const validarData = (data) => {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!regex.test(data)) return false;

    const [, dia, mes, ano] = data.match(regex);
    const dataObj = new Date(ano, mes - 1, dia);
    
    return dataObj && 
           dataObj.getFullYear() == ano &&
           dataObj.getMonth() == mes - 1 &&
           dataObj.getDate() == dia &&
           dataObj <= new Date(); // Não permite datas futuras
  };

  // Função para lidar com o cadastro
  const handleCadastro = () => {
    const newErrors = {};

    // Validar nome completo
    if (!nomeCompleto.trim()) {
      newErrors.nomeCompleto = 'Nome completo é obrigatório';
    }

    // Validar CPF
    if (!cpf.trim()) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (!validarCPF(cpf)) {
      newErrors.cpf = 'CPF inválido';
    }

    // Validar data de nascimento
    if (!dataNascimento.trim()) {
      newErrors.dataNascimento = 'Data de nascimento é obrigatória';
    } else if (!validarData(dataNascimento)) {
      newErrors.dataNascimento = 'Data de nascimento inválida';
    }

    // Se houver erros, atualiza o estado de erros e para
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Se passou por todas as validações
    alert('Cadastro realizado com sucesso!');
    
    // Limpar formulário e erros
    setNomeCompleto('');
    setCpf('');
    setDataNascimento('');
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Cadastro de Passageiro
        </h1>
        
        {/* Nome Completo */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Nome Completo"
            value={nomeCompleto}
            onChange={(e) => setNomeCompleto(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              errors.nomeCompleto ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.nomeCompleto && (
            <p className="text-red-500 text-sm mt-1">
              {errors.nomeCompleto}
            </p>
          )}
        </div>
        
        {/* CPF */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="CPF (xxx.xxx.xxx-xx)"
            value={cpf}
            onChange={(e) => setCpf(formatCPF(e.target.value))}
            maxLength={14}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              errors.cpf ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.cpf && (
            <p className="text-red-500 text-sm mt-1">
              {errors.cpf}
            </p>
          )}
        </div>
        
        {/* Data de Nascimento */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Data de Nascimento (DD/MM/AAAA)"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(formatData(e.target.value))}
            maxLength={10}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              errors.dataNascimento ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.dataNascimento && (
            <p className="text-red-500 text-sm mt-1">
              {errors.dataNascimento}
            </p>
          )}
        </div>
        
        {/* Botão de Cadastro */}
        <button
          onClick={handleCadastro}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Cadastrar
        </button>
      </div>
    </div>
  );
};

export default CadastroPassageiroScreen;