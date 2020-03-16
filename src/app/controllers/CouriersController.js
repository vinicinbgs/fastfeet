import * as Yup from 'yup';
import Courier from '../models/Courier';

class CouriersController {
  async index(req, res) {
    const page = req.query.page ? req.query.page : 0;
    const limit = req.query.limit ? req.query.limit : 10;

    const couriers = await Courier.findAll({ offset: page, limit });

    return res.status(200).json(couriers);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      avatar_id: Yup.number().required(),
      email: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const courier = await Courier.create(req.body);

    return res.json(courier);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      avatar_id: Yup.number(),
      email: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const courierId = req.params.id;

    const courierOld = await Courier.findByPk(courierId);

    if (!courierOld) {
      return res.status(400).json({ error: "Courier doesn't exist" });
    }

    const courier = await Courier.update(req.body, {
      where: {
        id: courierId,
      },
    });

    if (!courier) {
      return res.status(400).json({ error: 'Error to update courier' });
    }

    return res.status(204).json();
  }

  async show(req, res) {
    const courierId = req.params.id;

    const courier = await Courier.findByPk(courierId);

    if (!courier) {
      return res.status(400).json({
        error: 'Delivery man does not exist',
      });
    }

    return res.status(200).json(courier);
  }

  async delete(req, res) {
    const courierId = req.params.id;

    const courier = await Courier.destroy({
      where: {
        id: courierId,
      },
    });

    if (!courier) {
      return res.status(400).json({
        error: 'Delivery man does not exist',
      });
    }

    return res.status(204).json();
  }
}

export default new CouriersController();
