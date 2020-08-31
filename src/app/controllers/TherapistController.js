import Therapist from '../models/Therapist';
import User from '../models/User';

class TherapistController {
  async index(req, res) {
    const filter = req.query;

    const cost = Number(filter.cost);
    const { approach } = filter;

    if (filter.approach || filter.cost) {
      const therapistFilter = await Therapist.findAll({
        where: { cost, approach },
        include: [
          {
            model: User,
            attributes: ['id', 'name'],
          },
        ],
        attributes: ['id', 'crp', 'bio', 'approach', 'cost', 'duration'],
      });

      return res.status(200).json(therapistFilter);
    }

    const therapistAll = await Therapist.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
        },
      ],
      attributes: ['id', 'crp', 'bio', 'approach', 'cost', 'duration'],
    });

    return res.status(200).json(therapistAll);
  }

  async store(req, res) {
    const checkTherapist = req.therapist;

    if (!checkTherapist) {
      return res.status(400).json({ error: 'Access denied. Not a therapist.' });
    }

    const checkCrpExist = await Therapist.findOne({
      where: { crp: req.body.crp },
    });

    const checkUserCrpExist = await Therapist.findOne({
      where: { user_id: req.userId },
      include: [
        {
          model: User,
          attributes: ['id', 'therapist'],
        },
      ],
    });

    if (checkUserCrpExist) {
      return res.status(400).json({ error: 'User with CRP already exist.' });
    }

    if (checkCrpExist) {
      return res.status(400).json({ error: 'CRP already exist.' });
    }

    const { bio, crp, approach, cost, duration } = req.body;

    const { id } = await Therapist.create({
      user_id: req.userId,
      bio,
      crp,
      approach,
      cost,
      duration,
    });

    return res.json({
      id_therapist: id,
      id_user: req.userId,
      crp,
    });
  }
}

export default new TherapistController();
