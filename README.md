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

### Search and Sort Feature

```bash
const [searchTerm, setSearchTerm] = useState('');
    const [sort, setSort] = useState('Original');

    const filteredMovies = useMemo(() => {
        const moviesToManipulate = data || []; // this is important to solve ts error undefined

        const filter = moviesToManipulate.filter((movie) => {
            return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
        });

        if (sort !== 'Original') {
            return [...filter].sort((a, b) => {
                const nameA = a.title.toUpperCase(); // ignore upper and lowercase
                const nameB = b.title.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return sort === 'Ascending' ? -1 : 1;
                }
                if (nameA > nameB) {
                    return sort === 'Ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        else {
            return filter;
        }
    },[data, searchTerm, sort]);
```
