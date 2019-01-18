import amandes from '../Assets/Images/topping_amandes.png';
import cacahuetes from '../Assets/Images/topping_cacahuetes.png';

export default () => {
  return [
    {
      id: 1,
      name: 'Chocolat amandes',
      type: 'Base cookie',
      size: 'S',
      price: 4,
      dispo: true,
      info: 'some info',
      img: amandes,
      allerg: '',
      compatible: [],
    },
    {
      id: 2,
      name: 'Cacahuètes',
      type: 'Base cookie',
      size: 'S',
      price: 4,
      dispo: true,
      info: 'some info',
      img: cacahuetes,
      allerg: '',
      compatible: [],
    },
  ];
};
