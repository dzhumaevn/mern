import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../hooks/auth.hook';
import {useHttp} from '../hooks/http.hook';

export const CreatePage = (props) => {
    const navigate = useNavigate();
    const {request} = useHttp();
    const { token } = useAuth();
    const [link, setLink] = useState('');

    const pressHandler = async (e) => {
      if (e.key !== 'Enter') {
          return;
      }

      try {
          const data = await request('/api/link/generate', 'POST', {from: link}, {Authorization: `Bearer ${token}`});
          navigate(`/detail/${data.link._id}`);
      } catch (e) {

      }
    };

    return (
      <div className="row">
        <div className="col s8 offset-s2">
            <label>
                <input
                    placeholder="Вставьте ссылку"
                    id="link"
                    type="text"
                    value={link}
                    onChange={e => setLink(e.target.value)}
                    onKeyUp={pressHandler}
                />
                Вставьте ссылку
            </label>
        </div>
      </div>
    );
};