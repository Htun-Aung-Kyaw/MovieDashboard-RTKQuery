# NextJS RTK Query Project using Express for Backend API


### Optimistic Update
```bash
updateMovie: build.mutation<Movie, Movie>({
            query: (movie:Movie) => ({
                url: `/movies/${movie._id}`,
                method: 'PUT',
                body: movie,
            }),
            async onQueryStarted(movie:Movie,{dispatch, queryFulfilled}){
                const patchResult = dispatch(
                    movieApiSlice.util.updateQueryData('getMovies', undefined, (draft)=>{
                        draft = draft.map(item=> item._id === movie._id? movie : item)
                        return draft;
                    })
                )
                try{
                    const {data:updateMovie} = await queryFulfilled;
                    console.log("Updated", updateMovie);
                }
                catch{
                    patchResult.undo()
                }
            },
        }),
```

### Cache Invalidation

```bash
tagTypes: ["Movies"],
    endpoints: (build) => ({
        getMovies: build.query<Movie[], number | undefined>({
            query: () => `/movies`,
            providesTags: () => ['Movies'],
        }),
        getMovieById: build.query<Movie, string | undefined>({
            query: (id) => `/movies/${id}`,
        }),
        addMovie: build.mutation<Movie, Partial<Movie>>({
            query: (movie:Partial<Movie>) => ({
                url: `/movies`,
                method: 'POST',
                body: movie,
            }),
            invalidatesTags: ['Movies'],
})
```
