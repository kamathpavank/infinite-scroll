import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";

type Props = {}

type imageData = {
	images:any[]
}

export const InfiniteScroll = (props: Props) => {
  let history = useHistory();
  const [imageData, setimageData] = useState<imageData>({
    images: [],
  });
  const [isFetching, setisFetching] = useState<boolean>(true);
  const [pageNumber, setpageNumber] = useState<number>(0);

  let bottomBoundaryRef: any = useRef(null);

  useEffect(() => {
    const imageDataObserver = new IntersectionObserver(handleImageDataObserver);
    if (bottomBoundaryRef.current) {
      imageDataObserver.observe(bottomBoundaryRef.current);
    }
  }, []);

  const handleImageDataObserver = (entities: any) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setpageNumber((pageNumber) => pageNumber + 1);
    }
  };

  useEffect(() => {
    setisFetching(true);
    fetch(`https://picsum.photos/v2/list?page=${pageNumber}&limit=10`)
      .then((data) => data.json())
      .then((images) => {
        setisFetching(false);
        const newImageData = {
          ...imageData,
          images: imageData.images.concat(images),
        };
        setimageData(newImageData);
      })
      .catch((e) => {
        setisFetching(false);
        return e;
      });
  }, [pageNumber]);

  const logout = (e: any) => {
    e.preventDefault();
    localStorage.clear();
    history.push("/login");
  };
  return (
    <>
      <nav className="navbar navbar-light bg-light justify-content-between">
        <a className="navbar-brand">Infinte Scroll</a>
        <form onSubmit={logout} className="form-inline">
          <button
            className="btn btn-outline-primary my-2 my-sm-0"
            type="submit"
          >
            Logout
          </button>
        </form>
      </nav>

      <div id="images" className="container">
        <div className="row">
          {imageData.images.map((image: any, index: any) => {
            const { author, download_url, id } = image;
            return (
              <div key={id} className="col-lg-4 col-md-3 col-sm-12">
                <div key={index} className="card" id="image-card">
                  <div className="card-body ">
                    <img
                      alt={author}
                      className="card-img-top"
                      src={download_url}
                    />
                  </div>
                  <div className="card-footer">
                    <p className="card-text text-center text-capitalize text-primary">
                      Shot by: {author}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {isFetching && (
        <div className="d-flex justify-content-center text-primary mt-2 mb-2">
          <div className="spinner-border" role="status"></div>
        </div>
      )}
      <div id="page-bottom-boundary" ref={bottomBoundaryRef}></div>
    </>
  );
};
