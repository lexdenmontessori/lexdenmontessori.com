# lexdenmontessori.com

The source for http://lexdenmontessori.com/

## Calculator

When you visit `https://lexdenmontessori.com/calculator/`
it makes a request for `https://lexdenmontessori.com/calculator/public/terms.yml` -
all the data for each specific term is there.
There is no database: the whole website is pure static files.
Typically, the only thing which needs editing is that terms.yml file.

I recently changed how the site is deployed, so you can work on it more easily.
https://lexdenmontessori.com/ is hosted by [Netlify](https://www.netlify.com/).
Netlify takes the static site from the `master` branch of https://github.com/lexdenmontessori/lexdenmontessori.com -
a public git repository.
There is no build process -
it just serves the exact files which are in the repository.
Thus to deploy the site you only need to push a commit to the master branch of this repository and wait ~60 seconds.

To develop, I recommend cloning the repository and running a static web server, e.g.

```bash
git clone git@github.com:lexdenmontessori/lexdenmontessori.com.git
cd lexdenmontessori.com
python -m SimpleHTTPServer &  # run a web server here
# edit calculator/public/terms.yml, and view/refresh at http://localhost:8000/calculator
git add calculator/public/terms.yml
git commit -m "Terms for Autumn 2018"
git push origin master
```

For instance, you can see the source for `terms.yml` here:
https://github.com/lexdenmontessori/lexdenmontessori.com/blob/master/calculator/public/terms.yml.
You can see here the start of a long array called `terms` -
your main job will be to add more terms to the end of this array.
Within each term, there's also a reference a `fees` block and a `funding` block from earlier in the YAML file.
Here's a commented structure of the `terms.yml` file:

```yaml
fees:
  ...
  ...
  ...
  2015-09-onwards: &fees-2015-09-onwards
    fees:
      morning: 33
      afternoon: 33
      full: 60
      hour: 7.50
      lunch: 3
      dinner: 3
    discount:
      perHour: 1
      maxPercentage: 30
      minHoursToEnableDiscount: 10
      appliesToMeals: false  # TODO not implemented
    payment:
      perMonth: 10
      perWeek: false

funding:
  ...
  ...
  ...
  2017-18: &funding-2017-18
    funded: true
    minimumAge: 3 # TODO funding for age 2 is defined separately; we should put this in the calculator
    perHour: 4.21
    maxWeeks: 13 # ignore this one - it's not used any more
    fundableHoursPerDay: 10
    fundableHoursPerWeek: 15

terms:
- ...
- ...
- ...
- year: 2017 # the academic term 2017-18
  season: autumn # can autumn, spring, or summer
  type: term # can be term, halfterm, holiday, or termhalftermandholidayclub
  babyroom: false # The nursery is split into baby room and older child areas
  provisional: false # true will just add "(PROVISIONAL)" to the term name
  dates:
    interval: [2017-09-04, 2017-12-15] # start and end date of the term, inclusive
    holes: # a list of dates to not include in the term. Put half-term and bank holidays here. Don't worry about weekends - it does those automatically.
    - [2017-10-23, 2017-10-27] # Exclude the Half-term week
  funding:
    headcount: 2017-09-28 # Gaynor can explain this one
    maxWeeks: 14 # Gaynor can explain this one
    <<: *funding-2017-18  # this is a YAML reference to the "funding" block above
  minimumAge: 2  # should correspond to the babyroom setting above
  <<: *fees-2015-09-onwards  # this a YAML reference to the "fees" block above
```
