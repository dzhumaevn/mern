import {Link} from 'react-router-dom';

export const LinksList = ({links}) => {
    if (links.length === 0) {
        return <p className="centered">Ссылок пока нет</p>
    }

  return (
      <table className="striped">
          <thead>
          <tr>
              <th>№</th>
              <th>Оригинальная</th>
              <th>Сокращённая</th>
              <th>Открыть</th>
          </tr>
          </thead>

          <tbody>
          {links.map((link, index) => (
              <tr key={link._id}>
                  <td>{index + 1}</td>
                  <td>{link.from}</td>
                  <td>{link.to}</td>
                  <td>
                      <Link to={`/detail/${link._id}`}>Открыть</Link>
                  </td>
              </tr>
          ))}
          </tbody>
      </table>
  );
}