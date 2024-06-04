import CategoryFilter from '@/components/shared/CategoryFilter';
import Collection from '@/components/shared/Collection';
import Search from '@/components/shared/Search';
import { Button } from '@/components/ui/button';
import { getAllEvents } from '@/lib/actions/event.actions';
import { SearchParamProps } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = searchParams?.query as string || '';
  const category = searchParams?.category as string || '';

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6,
  });

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="text-3xl font-bold">Empowering Connections, Celebrating Occasions:Where Your Events Find a Home!</h1>
            <p className="text-base md:text-lg">
            Discover invaluable insights from over 3,168 mentors across leading global corporations, enriching your knowledge within our expansive community.
            </p>
            <Button
              size="lg"
              asChild
              className="w-full sm:w-fit bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Link href="#events">Explore Now</Link>
            </Button>
          </div>

          <Image
            src="/assets/images/hero.jpeg"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>

      <section id="events" className="wrapper my-8 space-y-8 md:space-y-12">
        <h2 className="text-2xl font-bold">Trust by Thousands of Events</h2>

        <div className="flex flex-col space-y-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>

        <Collection
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />
      </section>
    </>
  );
}
