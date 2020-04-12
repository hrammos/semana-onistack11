import Incident from '../models/Incident';
import Ong from '../models/Ong';

class IncidentsController {
  async index(request, response) {
    const { page = 1 } = request.query;

    const { count } = await Incident.findAndCountAll();

    const incidents = await Incident.findAll({
      include: [
        {
          model: Ong,
          as: 'ong',
          attributes: ['name', 'email', 'whatsapp', 'city', 'uf'],
        },
      ],
      limit: 5,
      offset: (page - 1) * 5,
    });

    response.header('X-Total-Count', count);

    return response.json(incidents);
  }

  async store(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    const incident = await Incident.create({
      title,
      description,
      value,
      ong_id,
    });

    return response.json(incident);
  }

  async destroy(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await Incident.findByPk(id);

    if (incident.ong_id !== ong_id) {
      return response.status(401).json({ error: 'Operation not permitted.' });
    }

    incident.destroy();

    return response.status(204).send();
  }
}

export default new IncidentsController();
