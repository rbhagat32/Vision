import React from "react";
import moment from "moment";

export default function Reviews({ reviews }) {
  console.log(reviews);

  return (
    <div className="mt-12">
      <h1 className="text-4xl font-semibold text-rose-400 mt-10 mb-3">
        Reviews :
      </h1>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review, i) => (
          <div key={i}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={
                    review?.author_details?.avatar_path
                      ? `https://image.tmdb.org/t/p/w92/${review?.author_details?.avatar_path}`
                      : "/user-placeholder.png"
                  }
                  className="size-12 rounded-full object-cover"
                />
                <p className="font-semibold text-xl">{review?.author}</p>
              </div>

              <p className="text-zinc-400 mt-2">
                {moment(review?.created_at).fromNow()}
              </p>
            </div>
            <p className="mt-2 text-zinc-400 max-w-[60ch]">
              {review?.content.length > 300
                ? review?.content.slice(0, 300) + "..."
                : review?.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
