import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string().required(),
      state: Yup.string()
        .max(2)
        .required(),
      city: Yup.string().required(),
      zipcode: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.string(),
      complement: Yup.string(),
      state: Yup.string(2),
      city: Yup.string(),
      zipcode: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipientId = req.params.id;

    const recipientOld = await Recipient.findByPk(recipientId);

    if (!recipientOld) {
      return res.status(400).json({ error: "Recipient doesn't exist" });
    }

    const recipient = await Recipient.update(req.body, {
      where: {
        id: recipientId,
      },
    });

    if (!recipient) {
      return res.status(400).json({ error: 'Error to update recipient' });
    }

    return res.status(204).json();
  }
}

export default new RecipientsController();
