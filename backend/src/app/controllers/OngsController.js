import generateUniqueId from '../../utils/generateUniqueId';
import Ong from '../models/Ong';

class OngsController {
  async index(request, response) {
    const ongs = await Ong.findAll();

    return response.json(ongs);
  }

  async store(request, response) {
    const { name, email, whatsapp, city, uf } = request.body;
    const id = generateUniqueId();

    await Ong.create({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });

    return response.json({ id });
  }
}

export default new OngsController();
