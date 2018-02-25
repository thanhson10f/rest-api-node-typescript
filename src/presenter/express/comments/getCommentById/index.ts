import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import { OK } from 'http-status-codes'; 
import getAuthUser from '../../../../utils/jwt/getAuthUser';
import hasPermission from '../../../../utils/jwt/hasPermission';
import { CAN_GET_COMMENT } from '../../../../utils/constants';

export default (config: Config) => {
  return catchErrors(config, async (req, res) => {
    
    const user = await getAuthUser({req, service: config.service});

    hasPermission({ user, permissionName:  CAN_GET_COMMENT});

    const {comment_id} = req.params;

    const fetchedComment = await config.service.getCommentById({id: comment_id});
    
    res.status(OK).json(fetchedComment);
  });
}
  
  