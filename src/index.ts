import { resolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { PDFDocument } from 'pdf-lib';

const main = async () => {
  // Lê o arquivo PDF a ser preenchido
  const path = resolve(__dirname, '..', 'files');
  const filepath = resolve(path, 'S-21_T.pdf');

  console.log({ filepath });

  const pdfBytes = readFileSync(filepath);

  // Cria um novo documento PDF com o conteúdo do arquivo lido
  const pdfDoc = await PDFDocument.load(pdfBytes);

  const form = pdfDoc.getForm();
  const fields = form.getFields();

  const checkBoxMale = form.getCheckBox('900_4_CheckBox');
  const checkBoxFemale = form.getCheckBox('900_5_CheckBox');

  const checkBoxOtherSheep = form.getCheckBox('900_6_CheckBox');
  const checkBoxAnointed = form.getCheckBox('900_7_CheckBox');

  const checkBoxElder = form.getCheckBox('900_8_CheckBox');
  const checkBoxMinisterialServant = form.getCheckBox('900_9_CheckBox');
  const checkBoxRegularPioneer = form.getCheckBox('900_10_CheckBox');

  checkBoxMinisterialServant.check();

  fields.forEach((field, index) => {
    const type = field.constructor.name;
    const name = field.getName();

    switch (type) {
      case 'PDFTextField':
        const textfield = form.getTextField(name);
        textfield.setText(String(index));
        break;
    }

    if (type === `PDFCheckBox`) {
      console.log(`${type}: ${name}`);
    }
  });

  const pdfBytesPreenchido = await pdfDoc.save();

  writeFileSync(resolve(path, 'joao.pdf'), pdfBytesPreenchido);
};

main();
