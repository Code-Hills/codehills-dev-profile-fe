import { IRoute } from '@/interfaces/route.interface';
import UserActivity from '@/modules/activities/userActivity';

const userRoute: IRoute = {
    title: 'Users - Codehills',
    protected: false,
    guestOnly: false,
    path: '/dashboard/users',
    component: UserActivity,
};

export default userRoute;
