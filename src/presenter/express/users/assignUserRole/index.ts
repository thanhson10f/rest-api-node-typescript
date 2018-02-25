import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import { OK } from 'http-status-codes';
import getAuthUser from '../../../../utils/jwt/getAuthUser';
import hasPermission from '../../../../utils/jwt/hasPermission';
import { CAN_ASSIGN_ROLE } from '../../../../utils/constants';
import { maybe, required, checkType, composeRules, restrictToSchema } from 'rulr';

const validateAssignUserRole = maybe(composeRules([
  restrictToSchema({
    role_id: required(checkType(String))
  })
]));

export default (config: Config) => {
  return catchErrors(config, async (req, res) => {
  
    const user = await getAuthUser({req, service: config.service});

    hasPermission({user, permissionName: CAN_ASSIGN_ROLE});
 
    validateAssignUserRole(req.body, ['user']);

    const {user_id} = req.params;
    const {role_id} = req.body;

    await config.service.assignUserRole({
      user_id, role_id
    });

    res.status(OK).json({success: true});
  });
};