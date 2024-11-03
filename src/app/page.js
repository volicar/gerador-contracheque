"use client";

import { useState } from 'react';
import { jsPDF } from 'jspdf';

const watermarkImageSrc = '/watermark.png'; // Caminho da imagem no diretório public

export default function Home() {
  const [employerName, setEmployerName] = useState('');
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');
  const [discounts, setDiscounts] = useState('');

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString();

    // Carrega a imagem da marca d'água
    const img = new Image();
    img.src = watermarkImageSrc;

    img.onload = () => {
      // Adicione a marca d'água com uma opacidade fixa de 0.5 (50%)
      const fixedOpacity = 0.5; // Opacidade fixa de 50%
      doc.addImage(img, 'PNG', 15, 40, 180, 160, undefined, 'FAST', fixedOpacity);

      // Cabeçalho da Empresa
      doc.setFontSize(18);
      doc.text('Burger Mania', 105, 20, { align: 'center' });
      doc.setFontSize(10);
      doc.text(`Recibo de Pagamento de Salário`, 105, 30, { align: 'center' });

      // Nome do Empregador
      doc.setFontSize(12);
      doc.text('Empregador:', 20, 40);
      doc.text(employerName, 70, 40);

      // Informações do Funcionário
      doc.setFontSize(10);
      doc.text('Nome do Funcionário:', 20, 50);
      doc.text(name, 70, 50);
      doc.text('Cargo:', 20, 60);
      doc.text(position, 70, 60);

      // Tabela de Valores
      doc.text('Descrição', 20, 80);
      doc.text('Valor', 150, 80);

      // Linhas da Tabela
      doc.setDrawColor(0);
      doc.line(20, 82, 190, 82);

      doc.text('Salário Bruto', 20, 90);
      doc.text(`R$ ${parseFloat(salary).toFixed(2)}`, 150, 90, { align: 'right' });

      doc.text('Total de Descontos', 20, 100);
      doc.text(`R$ ${parseFloat(discounts).toFixed(2)}`, 150, 100, { align: 'right' });

      const netSalary = parseFloat(salary) - parseFloat(discounts);
      doc.text('Salário Líquido', 20, 110);
      doc.text(`R$ ${netSalary.toFixed(2)}`, 150, 110, { align: 'right' });

      // Linha final da tabela
      doc.line(20, 115, 190, 115);

      // Assinatura e Data
      doc.text('______________________________________', 20, 140);
      doc.text('Assinatura do Funcionário', 20, 145);

      // Data de Emissão no Rodapé
      doc.text(`Data de Emissão: ${currentDate}`, 150, 145, { align: 'right' });

      // Nome do arquivo com base no nome do funcionário
      const fileName = `${name || 'Funcionario'}-contracheque.pdf`;

      // Salvar PDF
      doc.save(fileName);
    };

    img.onerror = () => {
      console.error('Erro ao carregar a imagem da marca d\'água.');
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-black">Burger Mania Contracheque</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Nome do Empregador</label>
          <input
            type="text"
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-black"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Nome do Funcionário</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-black"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Cargo</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-black"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Salário Bruto</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-black"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Descontos</label>
          <input
            type="number"
            value={discounts}
            onChange={(e) => setDiscounts(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-black"
          />
        </div>

        <button
          type="button"
          onClick={handleGeneratePDF}
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Gerar Contracheque
        </button>
      </form>
    </div>
  );
}
