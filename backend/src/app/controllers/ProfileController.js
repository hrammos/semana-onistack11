import Incident from '../models/Incident';

class ProfileController {
  async index(request, response) {
    const ong_id = request.headers.authorization;

    const incidents = await Incident.findAll({
      where: { ong_id },
    });

    return response.json(incidents);
  }
}

export default new ProfileController();
