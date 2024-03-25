/* eslint-disable import/newline-after-import */
/* eslint-disable import/first */
import { Request, Response, Router } from 'express';
import auth from '../utils/auth';
const router = Router();

// eslint-disable-next-line import/no-unresolved
import {
  createUser,
  getUser,
  assignUserRole,
  listUsers,
  listRoles,
  createPermission,
  listPermissions,
  createSTS,
  updateUser,
  deleteUser,
  getProfile,
  updateProfile,
} from '../services/systemadmin.service';
import HttpException from '../models/http-exception.model';

// Create a new user
router.post('/users', auth.required, auth.isSystemAdmin, async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body.userId, req.body.name, req.body.image);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// List all users
router.get('/users', auth.required, auth.isSystemAdmin, async (req: Request, res: Response) => {
  try {
    const users = await listUsers();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// List all roles
router.get('/users/roles', auth.required, async (req: Request, res: Response) => {
  try {
    const roles = await listRoles();
    res.status(200).json(roles);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Get a specific user
router.get('/users/:userId', auth.required, async (req: Request, res: Response) => {
  try {
    const user = await getUser(req.params.userId);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// update user
router.put('/users/:userId', auth.required, async (req: Request, res: Response) => {
  try {
    const user = await updateUser(req, Number(req.params.userId), req.body.name, req.body.image);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// delete user
router.delete(
  '/users/:userId',
  auth.required,
  auth.isSystemAdmin,
  async (req: Request, res: Response) => {
    try {
      const user = await deleteUser(Number(req.params.userId));
      res.status(200).json({ message: 'User deleted successfully', user });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
);

// Assign a role to a user
router.put(
  '/users/:userId/roles',
  auth.required,
  auth.isSystemAdmin,
  async (req: Request, res: Response) => {
    try {
      const updatedUser = await assignUserRole(req.params.userId, req.body.roleId);
      res.status(200).json(updatedUser);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
);

// Get profile
router.get('/profile', auth.required, async (req: Request, res: Response) => {
  try {
    const user = await getProfile(String(req.user?.id));
    console.log(user);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// update profile
router.put('/profile', auth.required, async (req: Request, res: Response) => {
  try {
    if(!req.user?.id) throw new HttpException(400, 'Invalid token');
    const user = await updateProfile(req.user.id, req.body.name, req.body.image);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});


// Create a new permission
router.post(
  '/rbac/permissions',
  auth.required,
  auth.isSystemAdmin,
  async (req: Request, res: Response) => {
    try {
      const permission = await createPermission(req.body);
      res.status(201).json(permission);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
);

// List all permissions
router.get(
  '/rbac/permissions',
  auth.required,
  auth.isSystemAdmin,
  async (req: Request, res: Response) => {
    try {
      const permissions = await listPermissions();
      res.json(permissions);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
);

// Create a new vehicle
// router.post('/vehicles', auth.required, auth.isSystemAdmin, async (req: Request, res: Response) => {
//   try {
//     const vehicle = await createVehicle(req.body);
//     res.status(201).json(vehicle);
//   } catch (error: any) {
//     res.status(400).json({ message: error.message });
//   }
// });

// Create a new STS
router.post('/sts', auth.required, auth.isSystemAdmin, async (req: Request, res: Response) => {
  try {
    const sts = await createSTS(req.body);
    res.status(201).json(sts);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
