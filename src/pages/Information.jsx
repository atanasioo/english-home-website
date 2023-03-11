import { useEffect, useState } from "react";
// import { Helmet } from "react-helmet";
import { useParams } from "react-router";
import _axios from "../axios";
import Loader from "../components/Loader";
import buildLink from "../urls";
// import PointsLoader from "../components/PointsLoader";
var htmlEntities = {
  nbsp: " ",
  cent: "¢",
  pound: "£",
  yen: "¥",
  euro: "€",
  copy: "©",
  reg: "®",
  lt: "<",
  gt: ">",
  quot: '"',
  amp: "&",
  apos: "'",
};

function unescapeHTML(str) {
  if (!str) {
    return;
  }
  return str.replace(/\&([^;]+);/g, function (entity, entityCode) {
    var match;

    if (entityCode in htmlEntities) {
      return htmlEntities[entityCode];
      /*eslint no-cond-assign: 0*/
    } else if ((match = entityCode.match(/^#x([\da-fA-F]+)$/))) {
      return String.fromCharCode(parseInt(match[1], 16));
      /*eslint no-cond-assign: 0*/
    } else if ((match = entityCode.match(/^#(\d+)$/))) {
      return String.fromCharCode(~~match[1]);
    } else {
      return entity;
    }
  });
}
function Information() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  const id = useParams().id;
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setData({});
    _axios
      .get(
        buildLink("information", undefined, window.innerWidth) +
          "&information_id=" +
          id
      )
      .then((response) => {
        response.data.data.description = unescape(
          response.data.data.description
        );
        setData(response.data.data);
        setLoading(false);
      });
    return () => {
      setData({});
      setLoading(true);
    };
  }, [id]);

  return (
    <div key={id}>
      {/* <Helmet>
        <title>{data?.title}</title>
      </Helmet> */}
      {loading ? (
        <Loader />
      ) : (
        <div
          className={`text-left ${window.innerWidth > 650  ? "container pt-10 px-32" : "px-3 pt-6" }`}
          dangerouslySetInnerHTML={{
            __html: unescapeHTML(data.description),
          }}
        />
      )}
    </div>
  );
}

export default Information;
