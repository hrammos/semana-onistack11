import Ong from '../models/Ong';

class SessionController {
  async store(request, response) {
    const { id } = request.body;

    const ong = await Ong.findByPk(id, {
      attributes: ['name'],
    });

    if (!ong) {
      return response
        .status(400)
        .json({ error: 'No ONG found with this ID. ' });
    }

    return response.json(ong);
  }
}

export default new SessionController();
