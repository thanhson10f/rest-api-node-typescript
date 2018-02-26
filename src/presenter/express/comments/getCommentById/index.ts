import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import { OK } from 'http-status-codes'; 
import getAuthUserAndPermissions from '../../../../utils/jwt/getAuthUserAndPermissions';
import hasPermission from '../../../../utils/jwt/hasPermission';
import { CAN_GET_COMMENT } from '../../../../utils/constants';

export default (config: Config) => {
  return catchErrors(config, async (req, res) => {
    
    const { permissions } = await getAuthUserAndPermissions({req, service: config.service});
  
    hasPermission({ permissions, permissionName:  CAN_GET_COMMENT});

    const {comment_id} = req.params;

    const fetchedComment = await config.service.getCommentById({id: comment_id});
    
    res.status(OK).json(fetchedComment);
  });
}
  
  