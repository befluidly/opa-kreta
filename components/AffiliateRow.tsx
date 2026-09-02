import React from "react";

interface AffiliateRowProps {
  hotelLabel?: string;
  activityLabel?: string;
  ticketsLabel?: string;
  flightLabel?: string;
}

const AffiliateRow: React.FC<AffiliateRowProps> = ({
  hotelLabel = "Boek een hotel",
  activityLabel = "Vind een activiteit",
  ticketsLabel = "Reserveer tickets",
  flightLabel = "Boek een vlucht",
}) => {
  const links = [
    {
      title: hotelLabel,
      url: "https://www.booking.com/region/gr/crete.en.html?aid=1610831;label=crete-S7shqMI0B3AcCQjfJp0PCgS380765629129:pl:ta:p1:p2:ac:ap:neg:fi:tiaud-2382347442888:kwd-322484342358:lp9196395:li:dec:dm:ppccp=UmFuZG9tSVYkc2RlIyh9YVv642bd3dABkan2IoU65Cs;ws=&gad_source=1&gad_campaignid=1573113068&gbraid=0AAAAAD_Ls1I_Vvc9X3ZETvwEliFYPT3KY&gclid=CjwKCAjwmNLHBhA4EiwA3ts3mSToThrXIelVpdycvHR5Eo7gd6B5Mpf9s7k6U-BdkMcVTkxmJb9SZRoC_GEQAvD_BwE",
    },
    {
      title: activityLabel,
      url: "https://www.getyourguide.com/-l404/?cmp=brand&cq_src=google_ads&cq_cmp=16350394005&cq_con=146123444590&cq_term=getyourguide%20crete&cq_med=&cq_plac=&cq_net=g&cq_pos=&cq_plt=gp&campaign_id=16350394005&adgroup_id=146123444590&target_id=aud-2173238802615:kwd-1496469848637&loc_physical_ms=9196395&match_type=e&ad_id=628087653758&keyword=getyourguide%20crete&ad_position=&feed_item_id=&placement=&device=c&partner_id=CD951&gad_source=1&gad_campaignid=16350394005&gbraid=0AAAAADmzJCOpfy_naQrx2KBdom1i-iYjF&gclid=CjwKCAjwmNLHBhA4EiwA3ts3mc66qM5o4uMRzDwjukMxanlAi748-g06DQQPmdwdB54h4BH5WUwxlhoCC4AQAvD_BwE",
    },
    {
      title: ticketsLabel,
      url: "https://www.tiqets.com/en/crete-attractions-r1255/?partner=pack_amp_fly",
    },
    {
      title: flightLabel,
      url: "https://www.skyscanner.net/be/nl-nl/eur/",
    },
  ];

  return (
    <section className="relative z-30 max-w-screen-lg mx-auto px-4 mb-12 mt-10 md:mt-0">
      <div className="flex flex-wrap justify-center gap-3 md:gap-5">
        {links.map((link) => (
          <a
            key={link.title}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-darkCornflower hover:bg-spanishBlue text-white font-semibold 
                       py-2.5 px-6 md:px-7 rounded-[35px] text-sm md:text-base 
                       transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
          >
            {link.title}
          </a>
        ))}
      </div>
    </section>
  );
};

export default AffiliateRow;
