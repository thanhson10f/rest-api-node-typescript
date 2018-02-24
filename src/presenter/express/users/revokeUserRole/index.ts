import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import {Request, Response} from 'express';
import {OK_200_HTTP_CODE} from '../../utils/constants';
import getAuthUser from '../../../../utils/jwt/getAuthUser';
import hasPermission from '../../../../utils/jwt/hasPermission';
import {CAN_REVOKE_ROLE, VARCHAR_FIELD_LENGTH, TEXT_FIELD_LENGTH} from '../../../../utils/constants';
import {minLength, maxLength, isEmail, validateMatchingPasswords} from '../../../../utils/validate';
import {maybe, required, optional, checkType,composeRules, first, restrictToSchema} from 'rulr';
import * as R from 'ramda';

const validateRevokeRole = maybe(composeRules([
  restrictToSchema({
    user_id: required(checkType(String)),
    role_id: required(checkType(String))
  })
]));

export default (config: Config) => {
  return catchErrors(config, async (req: Request, res: Response): Promise<void> => {
  
    const user = await getAuthUser({req, service: config.service});

    hasPermission({user, permissionName: CAN_REVOKE_ROLE});

    validateRevokeRole(req.params, ['user']);

    await config.service.revokeUserRole(req.params);

    res.status(OK_200_HTTP_CODE).json({success: true});
  });

};