import ListVideos from '../screens/home';
import UploadVideo from '../screens/upload';

const publicRoutes = [
  {
    key: 'ListVideos',
    exact: true,
    path: '/',
    component: ListVideos,
  },
  {
    key: 'UploadVideos',
    exact: true,
    path: '/upload',
    component: UploadVideo,
  },
];

export default publicRoutes;
