/**
 * Official list of Gujarat's revenue villages, grouped by taluka and district.
 *
 * Source: "LIST OF VILLAGES (Gujarati)", Government of Gujarat — 18,225 villages
 * across 26 districts. Generated once from that PDF; this file is not meant to
 * be hand-edited. City/town names (Ahmedabad, Surat, etc.) are not revenue
 * villages and stay in india-places.ts's curated list instead.
 *
 * Stored as tab-separated rows rather than an array of object literals — at
 * this size the repeated `{ village: ..., taluka: ..., district: ... }` keys
 * would roughly double the file size for no benefit.
 */

const RAW = `\
Chher Nani	Lakhpat	Kachchh
Shinapar	Lakhpat	Kachchh
Punrajpar	Lakhpat	Kachchh
Kaner	Lakhpat	Kachchh
Lakhpat	Lakhpat	Kachchh
Karanpar	Lakhpat	Kachchh
Guneri	Lakhpat	Kachchh
Sayra	Lakhpat	Kachchh
Mudhan	Lakhpat	Kachchh
Siyot	Lakhpat	Kachchh
Atdo	Lakhpat	Kachchh
Ukher	Lakhpat	Kachchh
Umarsar	Lakhpat	Kachchh
Pranpar	Lakhpat	Kachchh
Baiyavo	Lakhpat	Kachchh
Maldo	Lakhpat	Kachchh
Khengarpar	Lakhpat	Kachchh
Chher Moti	Lakhpat	Kachchh
Fatehpur	Lakhpat	Kachchh
Kapurasi	Lakhpat	Kachchh
Koriyani	Lakhpat	Kachchh
Mundhvay	Lakhpat	Kachchh
Panandhro	Lakhpat	Kachchh
Fulra	Lakhpat	Kachchh
Akari	Lakhpat	Kachchh
Chhuger	Lakhpat	Kachchh
Dhareshi	Lakhpat	Kachchh
Ghaduli	Lakhpat	Kachchh
Lakhapar	Lakhpat	Kachchh
Bana	Lakhpat	Kachchh
Jara	Lakhpat	Kachchh
Khatiyun (Khatiya)	Lakhpat	Kachchh
Virani	Lakhpat	Kachchh
Khanot	Lakhpat	Kachchh
Naredi	Lakhpat	Kachchh
Kaiyari	Lakhpat	Kachchh
Dhunay	Lakhpat	Kachchh
Koteshvar	Lakhpat	Kachchh
Narayan Sarovar	Lakhpat	Kachchh
Kanoj	Lakhpat	Kachchh
Sheh	Lakhpat	Kachchh
Godhatad	Lakhpat	Kachchh
Mindhiyari	Lakhpat	Kachchh
Subhashpar(Sanandhro)	Lakhpat	Kachchh
Dayapar	Lakhpat	Kachchh
Amiya	Lakhpat	Kachchh
Haroda	Lakhpat	Kachchh
Jumara	Lakhpat	Kachchh
Nara	Lakhpat	Kachchh
Junachay	Lakhpat	Kachchh
Meghpar	Lakhpat	Kachchh
Dolatpar	Lakhpat	Kachchh
Bitiyari	Lakhpat	Kachchh
Chamra	Lakhpat	Kachchh
Mudiya	Lakhpat	Kachchh
Bhudha (Budha)	Lakhpat	Kachchh
Guhar Nani	Lakhpat	Kachchh
Guhar Moti	Lakhpat	Kachchh
Tahera	Lakhpat	Kachchh
Kunri	Lakhpat	Kachchh
Hamankhudi	Lakhpat	Kachchh
Rodasar Lakki	Lakhpat	Kachchh
Lakhmirani	Lakhpat	Kachchh
Naredo	Lakhpat	Kachchh
Baranda	Lakhpat	Kachchh
Chakrai	Lakhpat	Kachchh
Khadak	Lakhpat	Kachchh
Ravareshvar	Lakhpat	Kachchh
Ashaldi (Suja Vandh)	Lakhpat	Kachchh
Matana Madh	Lakhpat	Kachchh
Denma	Lakhpat	Kachchh
Dhrang	Lakhpat	Kachchh
Murchbana	Lakhpat	Kachchh
Suja Vandh	Lakhpat	Kachchh
Samjiaro	Lakhpat	Kachchh
Saran Moti	Lakhpat	Kachchh
Saran Nani	Lakhpat	Kachchh
Harudi	Lakhpat	Kachchh
Jadva	Lakhpat	Kachchh
Ratipar	Lakhpat	Kachchh
Bhujpar	Lakhpat	Kachchh
Mori	Lakhpat	Kachchh
Gugariyana	Lakhpat	Kachchh
Pipar	Lakhpat	Kachchh
Khirsara (Gunau)	Lakhpat	Kachchh
Gunau	Lakhpat	Kachchh
Maniara	Lakhpat	Kachchh
Pakho	Lakhpat	Kachchh
Kharai	Lakhpat	Kachchh
Kharoda	Lakhpat	Kachchh
Julrai	Lakhpat	Kachchh
Ramaniya	Lakhpat	Kachchh
Junagiya	Lakhpat	Kachchh
Ekliun	Lakhpat	Kachchh
Sambhada	Lakhpat	Kachchh
Kandhora	Lakhpat	Kachchh
Kotda	Lakhpat	Kachchh
Dedrani	Lakhpat	Kachchh
Bhadara Nana	Lakhpat	Kachchh
Bhadara Mota	Lakhpat	Kachchh
Lodrani (Parkara Vandh)	Rapar	Kachchh
Versara	Rapar	Kachchh
Jatavada (Jilar Vandh)	Rapar	Kachchh
Dhabda	Rapar	Kachchh
Bela	Rapar	Kachchh
Mauvana (Shivagadh)	Rapar	Kachchh
Vrajvani	Rapar	Kachchh
Anandpar	Rapar	Kachchh
Balasar	Rapar	Kachchh
Lakda Vandh	Rapar	Kachchh
Surba Vandh	Rapar	Kachchh
Deshalpar	Rapar	Kachchh
Nagalpar	Rapar	Kachchh
Gedi	Rapar	Kachchh
Fatehgadh	Rapar	Kachchh
Manjuvas	Rapar	Kachchh
Momaymora	Rapar	Kachchh
Khandek	Rapar	Kachchh
Hamirpar Nani	Rapar	Kachchh
Sangadh	Rapar	Kachchh
Selari	Rapar	Kachchh
Thanpar	Rapar	Kachchh
Davri	Rapar	Kachchh
Rav Moti	Rapar	Kachchh
Sudana Vandh	Rapar	Kachchh
Naranpar	Rapar	Kachchh
Vanoi	Rapar	Kachchh
Gavaripar	Rapar	Kachchh
Suvai	Rapar	Kachchh
Khengarpar	Rapar	Kachchh
Vajepar	Rapar	Kachchh
Jesda	Rapar	Kachchh
Nandasar	Rapar	Kachchh
Kalyanpar	Rapar	Kachchh
Karuda	Rapar	Kachchh
Umaiya	Rapar	Kachchh
Kanpar	Rapar	Kachchh
Hamirpar Moti	Rapar	Kachchh
Moda	Rapar	Kachchh
Sanva	Rapar	Kachchh
Bambhansar	Rapar	Kachchh
Adesar	Rapar	Kachchh
Jadupar (Bhangera)	Rapar	Kachchh
Lakhagadh	Rapar	Kachchh
Bhimasar	Rapar	Kachchh
Bharidia (Bhutakia)	Rapar	Kachchh
Sonalva	Rapar	Kachchh
Pragpar	Rapar	Kachchh
Dabhunda	Rapar	Kachchh
Nilpar	Rapar	Kachchh
Palanpar	Rapar	Kachchh
Trambau	Rapar	Kachchh
Ramvav	Rapar	Kachchh
Kuda(Kuda-Jampar)	Rapar	Kachchh
Pagivandh	Rapar	Kachchh
Dhadadhroni Vandh	Rapar	Kachchh
Sarasla	Rapar	Kachchh
Badargadh	Rapar	Kachchh
Khirai	Rapar	Kachchh
Sai	Rapar	Kachchh
Tindalva Mota	Rapar	Kachchh
Vallabhpar	Rapar	Kachchh
Vekra	Rapar	Kachchh
Padampar	Rapar	Kachchh
Makhel	Rapar	Kachchh
Taga	Rapar	Kachchh
Vijapar	Rapar	Kachchh
Nanda	Rapar	Kachchh
Sukhpar	Rapar	Kachchh
Varnun	Rapar	Kachchh
Pandya No Gadh	Rapar	Kachchh
Palansva	Rapar	Kachchh
Amrapar	Rapar	Kachchh
Somani Vandh	Rapar	Kachchh
Mangadh	Rapar	Kachchh
Ghanithal	Rapar	Kachchh
Jadavas	Rapar	Kachchh
Kidiyanagar	Rapar	Kachchh
Chhotapar	Rapar	Kachchh
Badalpar	Rapar	Kachchh
Naliyatimbo	Rapar	Kachchh
Dedarva	Rapar	Kachchh
Govindpar	Rapar	Kachchh
Chitrod	Rapar	Kachchh
Rampar	Rapar	Kachchh
khanpar	Rapar	Kachchh
Pratap Gadh	Rapar	Kachchh
Mevasa	Rapar	Kachchh
Sany	Rapar	Kachchh
Kanmer	Rapar	Kachchh
Gagodar	Rapar	Kachchh
Thoriari	Rapar	Kachchh
Kumbhariya	Rapar	Kachchh
Pethapar	Rapar	Kachchh
Bhimdevka	Rapar	Kachchh
Manaba	Rapar	Kachchh
Fulpara	Rapar	Kachchh
Dholavira	Bhachau	Kachchh
Kharoda	Bhachau	Kachchh
Kalyanpar	Bhachau	Kachchh
Janan	Bhachau	Kachchh
Ratanpar	Bhachau	Kachchh
Gadhada	Bhachau	Kachchh
Amarapar	Bhachau	Kachchh
Ganeshpar	Bhachau	Kachchh
Bambhanka	Bhachau	Kachchh
Bapuari	Bhachau	Kachchh
Bharudia	Bhachau	Kachchh
Kankhoi	Bhachau	Kachchh
Chobari	Bhachau	Kachchh
Kadol	Bhachau	Kachchh
Manfara	Bhachau	Kachchh
Kakarva	Bhachau	Kachchh
Kanthkot	Bhachau	Kachchh
Nara	Bhachau	Kachchh
Gamdau	Bhachau	Kachchh
Toraniya	Bhachau	Kachchh
Jadsa	Bhachau	Kachchh
Vamka	Bhachau	Kachchh
May	Bhachau	Kachchh
Kharoi	Bhachau	Kachchh
Ner	Bhachau	Kachchh
Baniari	Bhachau	Kachchh
Morgar	Bhachau	Kachchh
Amardi	Bhachau	Kachchh
Kabrau	Bhachau	Kachchh
Kumbhardi	Bhachau	Kachchh
Bandhadi	Bhachau	Kachchh
Sikara	Bhachau	Kachchh
Meghpar (Kunjisar)	Bhachau	Kachchh
Karmariya	Bhachau	Kachchh
Vondhada	Bhachau	Kachchh
Halra	Bhachau	Kachchh
Rampar	Bhachau	Kachchh
Adhoi (Pasakayara)	Bhachau	Kachchh
Vasatva	Bhachau	Kachchh
Shivlakha	Bhachau	Kachchh
Lakadiya	Bhachau	Kachchh
Gharana	Bhachau	Kachchh
Lakhpat	Bhachau	Kachchh
Vijpasar	Bhachau	Kachchh
Vondh	Bhachau	Kachchh
Chopadva	Bhachau	Kachchh
Lunva	Bhachau	Kachchh
Sukhpar	Bhachau	Kachchh
Bhujpar	Bhachau	Kachchh
Chirai Nani	Bhachau	Kachchh
Chirai Moti	Bhachau	Kachchh
Chhadavada	Bhachau	Kachchh
Samakhiari	Bhachau	Kachchh
Piprapati	Bhachau	Kachchh
Rajansar	Bhachau	Kachchh
Khodasar	Bhachau	Kachchh
Rajthali	Bhachau	Kachchh
Chandrodi	Bhachau	Kachchh
Naransari	Bhachau	Kachchh
Katariya Juna	Bhachau	Kachchh
Katariya Nava	Bhachau	Kachchh
Laliana	Bhachau	Kachchh
Amaliyara	Bhachau	Kachchh
Jangi	Bhachau	Kachchh
Godpar	Bhachau	Kachchh
Vandhiya	Bhachau	Kachchh
Modpar	Bhachau	Kachchh
Lakhapar	Bhachau	Kachchh
Lakhdhirgadh (Alepar)	Bhachau	Kachchh
Shikarpur	Bhachau	Kachchh
Khirsara	Anjar	Kachchh
Devisar	Anjar	Kachchh
Jagatpar	Anjar	Kachchh
Amrapar (1)	Anjar	Kachchh
Amrapar (2)	Anjar	Kachchh
Budharmora	Anjar	Kachchh
Dhamadka	Anjar	Kachchh
Dudhai	Anjar	Kachchh
Khengarpar	Anjar	Kachchh
Navagam	Anjar	Kachchh
Hirapar	Anjar	Kachchh
Chandrani	Anjar	Kachchh
Kotda	Anjar	Kachchh
Pashuda	Anjar	Kachchh
Tapar	Anjar	Kachchh
Lakhapar	Anjar	Kachchh
Ambapar	Anjar	Kachchh
Rapar	Anjar	Kachchh
Khokhra	Anjar	Kachchh
Jaru	Anjar	Kachchh
Modsar	Anjar	Kachchh
Sugariya	Anjar	Kachchh
Ratnal	Anjar	Kachchh
Ningal	Anjar	Kachchh
Maringana	Anjar	Kachchh
Bhadroi	Anjar	Kachchh
Sapeda	Anjar	Kachchh
Ratatalav	Anjar	Kachchh
Satapar	Anjar	Kachchh
Pashwadi Mitha	Anjar	Kachchh
Pashwadi Khara	Anjar	Kachchh
Ajapar	Anjar	Kachchh
Bhimasar	Anjar	Kachchh
Varsana	Anjar	Kachchh
Modvadar	Anjar	Kachchh
Varsamedi	Anjar	Kachchh
Nagalpar Nani	Anjar	Kachchh
Nagalpar Moti	Anjar	Kachchh
Khambhara	Anjar	Kachchh
Hamirpar	Anjar	Kachchh
Vada	Anjar	Kachchh
Lohariya Mota	Anjar	Kachchh
Chandiya	Anjar	Kachchh
Sarkhan	Anjar	Kachchh
Bhalot	Anjar	Kachchh
Makhiana	Anjar	Kachchh
Mathda	Anjar	Kachchh
Lohariya Nana	Anjar	Kachchh
Pantiya	Anjar	Kachchh
Khedoi	Anjar	Kachchh
Sinugra	Anjar	Kachchh
Vidi	Anjar	Kachchh
Meghpar (Borichi)	Anjar	Kachchh
Meghpar (Kumbhardi)	Anjar	Kachchh
Devaliya	Anjar	Kachchh
Mindiyala	Anjar	Kachchh
Kumbhariya	Anjar	Kachchh
Bhuvad	Anjar	Kachchh
Chandroda	Anjar	Kachchh
Valadiya Bitta (East)	Anjar	Kachchh
Mathak	Anjar	Kachchh
Tuna	Anjar	Kachchh
Rampar	Anjar	Kachchh
Sanghad	Anjar	Kachchh
Valadiya Bitta (West)	Anjar	Kachchh
Nagavaladiya	Anjar	Kachchh
Vira	Anjar	Kachchh
Chandrapar	Anjar	Kachchh
Luna	Bhuj	Kachchh
Bhitara Mota	Bhuj	Kachchh
Udhmo	Bhuj	Kachchh
Gorewali	Bhuj	Kachchh
Khavda	Bhuj	Kachchh
Ratadiya	Bhuj	Kachchh
Dinara	Bhuj	Kachchh
Dhrobana	Bhuj	Kachchh
Kuran	Bhuj	Kachchh
Kunariya (Jam)	Bhuj	Kachchh
Juna	Bhuj	Kachchh
Sadhara	Bhuj	Kachchh
Andhau	Bhuj	Kachchh
Dhoravar	Bhuj	Kachchh
Ludiya	Bhuj	Kachchh
Godpar (Khavda)	Bhuj	Kachchh
Khari	Bhuj	Kachchh
Soyla	Bhuj	Kachchh
Mithdi	Bhuj	Kachchh
Bhagadio	Bhuj	Kachchh
Shervo	Bhuj	Kachchh
Hodka	Bhuj	Kachchh
Bhirandiyara	Bhuj	Kachchh
Dedhiya Nana-Mota	Bhuj	Kachchh
Daddhar Nani	Bhuj	Kachchh
Daddhar Moti	Bhuj	Kachchh
Misariyado	Bhuj	Kachchh
Bhojardo	Bhuj	Kachchh
Berdo	Bhuj	Kachchh
Raiyada	Bhuj	Kachchh
Kharod	Bhuj	Kachchh
Dhori	Bhuj	Kachchh
Sumarasar -Shekhvali	Bhuj	Kachchh
Loria	Bhuj	Kachchh
Palara	Bhuj	Kachchh
Juriya	Bhuj	Kachchh
Kamaguna	Bhuj	Kachchh
Traya Bhakhari	Bhuj	Kachchh
Mod Bhakhari	Bhuj	Kachchh
Notiyar Bhakhari	Bhuj	Kachchh
Nokhaniya	Bhuj	Kachchh
Kunaria Nana-Mota	Bhuj	Kachchh
Kotay	Bhuj	Kachchh
Fulay	Bhuj	Kachchh
Dhrang	Bhuj	Kachchh
Lodai	Bhuj	Kachchh
Vantra	Bhuj	Kachchh
Dharampur	Bhuj	Kachchh
Jawaharnagar	Bhuj	Kachchh
Lothia	Bhuj	Kachchh
Modsar	Bhuj	Kachchh
Mokhana	Bhuj	Kachchh
Dagala	Bhuj	Kachchh
Naliyeri Timbo	Bhuj	Kachchh
Nadapa	Bhuj	Kachchh
Habay	Bhuj	Kachchh
Chapreli	Bhuj	Kachchh
Boladi	Bhuj	Kachchh
Jikadi	Bhuj	Kachchh
Paiya	Bhuj	Kachchh
Sangada Timbo	Bhuj	Kachchh
Sarspar	Bhuj	Kachchh
Rudramata	Bhuj	Kachchh
Makanpar	Bhuj	Kachchh
Dhonsa	Bhuj	Kachchh
Baukho (Odhejavalo)	Bhuj	Kachchh
Baukho (Samavalo)	Bhuj	Kachchh
Tankanasar	Bhuj	Kachchh
Vatachhad	Bhuj	Kachchh
Vehro	Bhuj	Kachchh
Natharkui	Bhuj	Kachchh
Vyara	Bhuj	Kachchh
Vinchhiya	Bhuj	Kachchh
Sumarasar (Jatvali)	Bhuj	Kachchh
Virai	Bhuj	Kachchh
Khilna	Bhuj	Kachchh
Nagor	Bhuj	Kachchh
Trambau	Bhuj	Kachchh
Varnora Nana	Bhuj	Kachchh
Raydhanpar	Bhuj	Kachchh
Varnora Mota	Bhuj	Kachchh
Galpadar	Bhuj	Kachchh
Kali Talavdi	Bhuj	Kachchh
Mamuara	Bhuj	Kachchh
Kanaiyabe	Bhuj	Kachchh
Ukhad Mora	Bhuj	Kachchh
Dhaneti	Bhuj	Kachchh
Vadvara	Bhuj	Kachchh
Padhar	Bhuj	Kachchh
Lakhond	Bhuj	Kachchh
Traya	Bhuj	Kachchh
Purasar	Bhuj	Kachchh
Gado	Bhuj	Kachchh
Bhujodi	Bhuj	Kachchh
Ratiya	Bhuj	Kachchh
Nava Vas	Bhuj	Kachchh
Kodki	Bhuj	Kachchh
Makhna	Bhuj	Kachchh
Pirvadi	Bhuj	Kachchh
Payarko	Bhuj	Kachchh
Kuvathada	Bhuj	Kachchh
Sadau Rakhal	Bhuj	Kachchh
Fulra Timbo	Bhuj	Kachchh
Anandsar	Bhuj	Kachchh
Kanpar	Bhuj	Kachchh
Fotdi	Bhuj	Kachchh
Kalyanpar	Bhuj	Kachchh
Godsar (Rakhal)	Bhuj	Kachchh
Kukma	Bhuj	Kachchh
Reldi Moti	Bhuj	Kachchh
Reldi Nani	Bhuj	Kachchh
Kanderai	Bhuj	Kachchh
Chubdak	Bhuj	Kachchh
Gandher	Bhuj	Kachchh
Saiyedpar	Bhuj	Kachchh
Vavdi	Bhuj	Kachchh
Vadva	Bhuj	Kachchh
Ler	Bhuj	Kachchh
Nagiyari	Bhuj	Kachchh
Deshalpar	Bhuj	Kachchh
Kurbai	Bhuj	Kachchh
Nabhoi	Bhuj	Kachchh
Vandhay	Bhuj	Kachchh
Samatra	Bhuj	Kachchh
Bharasar	Bhuj	Kachchh
Vandh Sim	Bhuj	Kachchh
Jadura	Bhuj	Kachchh
Reha Mota	Bhuj	Kachchh
Tharavada Nana	Bhuj	Kachchh
Tharavada Mota	Bhuj	Kachchh
Sakrai Timbo	Bhuj	Kachchh
Hajapar	Bhuj	Kachchh
Harudi	Bhuj	Kachchh
Reha Nana	Bhuj	Kachchh
Sanosara	Bhuj	Kachchh
Sapar Timbo	Bhuj	Kachchh
Bharapar	Bhuj	Kachchh
Sedata	Bhuj	Kachchh
Naranpar Ravli	Bhuj	Kachchh
Vadasar	Bhuj	Kachchh
Zizu Timbo	Bhuj	Kachchh
Sarli	Bhuj	Kachchh
Dahinsara	Bhuj	Kachchh
Godpar (Sarli)	Bhuj	Kachchh
Meghpar	Bhuj	Kachchh
Naranpar Pasayati	Bhuj	Kachchh
Baladiya	Bhuj	Kachchh
Kotda Athamana	Bhuj	Kachchh
Jambudi	Bhuj	Kachchh
Kotda Ugamana	Bhuj	Kachchh
Varli	Bhuj	Kachchh
Bandhara Nana	Bhuj	Kachchh
Chakar	Bhuj	Kachchh
Bandhara Mota	Bhuj	Kachchh
Vadzar	Bhuj	Kachchh
Jhumkha	Bhuj	Kachchh
Kera	Bhuj	Kachchh
Chunadi	Bhuj	Kachchh
Gajod	Bhuj	Kachchh
Paneli	Nakhatrana	Kachchh
Valka Mota	Nakhatrana	Kachchh
Valka Nana	Nakhatrana	Kachchh
Rajday	Nakhatrana	Kachchh
Gajansar	Nakhatrana	Kachchh
Ludbay	Nakhatrana	Kachchh
Dhoro	Nakhatrana	Kachchh
Unthongadi	Nakhatrana	Kachchh
Nadapa	Nakhatrana	Kachchh
Gadani	Nakhatrana	Kachchh
Lifri	Nakhatrana	Kachchh
Ravapar (Navavas)	Nakhatrana	Kachchh
Ambara (Amara)	Nakhatrana	Kachchh
Aiyar	Nakhatrana	Kachchh
Tal	Nakhatrana	Kachchh
Fulay	Nakhatrana	Kachchh
Maru (Muru)	Nakhatrana	Kachchh
Ratadiya	Nakhatrana	Kachchh
Vigodi	Nakhatrana	Kachchh
Nagviri	Nakhatrana	Kachchh
Bhunjay Nani	Nakhatrana	Kachchh
Bhunjay Moti	Nakhatrana	Kachchh
Lakshmipur(Bhunjay)	Nakhatrana	Kachchh
Bharapar (Bhadravali)	Nakhatrana	Kachchh
Bandiyara	Nakhatrana	Kachchh
Rangaypadar	Nakhatrana	Kachchh
Khirsara	Nakhatrana	Kachchh
Rampar (Sarva)	Nakhatrana	Kachchh
Ugedi	Nakhatrana	Kachchh
Jinjay	Nakhatrana	Kachchh
Dhamay	Nakhatrana	Kachchh
Jalu	Nakhatrana	Kachchh
Vang	Nakhatrana	Kachchh
Kharadiya	Nakhatrana	Kachchh
Dador	Nakhatrana	Kachchh
Aral Moti	Nakhatrana	Kachchh
Jatavira	Nakhatrana	Kachchh
Charakhada	Nakhatrana	Kachchh
Umrapar	Nakhatrana	Kachchh
Deshalpar	Nakhatrana	Kachchh
Moray	Nakhatrana	Kachchh
Khombhdi Nani	Nakhatrana	Kachchh
Netra	Nakhatrana	Kachchh
Rasaliya	Nakhatrana	Kachchh
Khombhdi Moti	Nakhatrana	Kachchh
Todiya	Nakhatrana	Kachchh
Mathal	Nakhatrana	Kachchh
Bagpat	Nakhatrana	Kachchh
Aral Nani	Nakhatrana	Kachchh
Than	Nakhatrana	Kachchh
Haripar (Hirapar)	Nakhatrana	Kachchh
Bibar	Nakhatrana	Kachchh
Nirona	Nakhatrana	Kachchh
Badi (Palanpur)	Nakhatrana	Kachchh
Oriro	Nakhatrana	Kachchh
Medisar	Nakhatrana	Kachchh
Vamrapadar	Nakhatrana	Kachchh
Akadna	Nakhatrana	Kachchh
Ratamiya	Nakhatrana	Kachchh
Bhimsar	Nakhatrana	Kachchh
Devisar	Nakhatrana	Kachchh
Bharapar(Guda Puntha)	Nakhatrana	Kachchh
Khambhla	Nakhatrana	Kachchh
Kadiya Mota	Nakhatrana	Kachchh
Ukharda	Nakhatrana	Kachchh
Kadiya Nana	Nakhatrana	Kachchh
Jadodar	Nakhatrana	Kachchh
Kotda Jadodar	Nakhatrana	Kachchh
Virani Nani	Nakhatrana	Kachchh
Virani Moti	Nakhatrana	Kachchh
Sukhpar (Virani)	Nakhatrana	Kachchh
Devsar	Nakhatrana	Kachchh
Lakhiyarvira	Nakhatrana	Kachchh
Virkhal	Nakhatrana	Kachchh
Ulat	Nakhatrana	Kachchh
Kotda (Tharavada)	Nakhatrana	Kachchh
Tharavada	Nakhatrana	Kachchh
Chavadka	Nakhatrana	Kachchh
Jinday	Nakhatrana	Kachchh
Nakhatrana	Nakhatrana	Kachchh
Jaday	Nakhatrana	Kachchh
Nakhatrana Nana	Nakhatrana	Kachchh
Nagalpar	Nakhatrana	Kachchh
Angiya Mota	Nakhatrana	Kachchh
Vithon	Nakhatrana	Kachchh
Morjar	Nakhatrana	Kachchh
Bhadali	Nakhatrana	Kachchh
Ranara Mota	Nakhatrana	Kachchh
Ranara Nana	Nakhatrana	Kachchh
Adhochhani	Nakhatrana	Kachchh
Anandsar	Nakhatrana	Kachchh
Dhavda Mota	Nakhatrana	Kachchh
Dhavda Nana	Nakhatrana	Kachchh
Angiya Nana	Nakhatrana	Kachchh
Beru	Nakhatrana	Kachchh
Vehar	Nakhatrana	Kachchh
Sangnara	Nakhatrana	Kachchh
Devpar	Nakhatrana	Kachchh
Lakshmipur (Tara)	Nakhatrana	Kachchh
Lakhadi	Nakhatrana	Kachchh
Kakadbhit	Nakhatrana	Kachchh
Sanyra	Nakhatrana	Kachchh
Sukhsan	Nakhatrana	Kachchh
Rampar (Roha)	Nakhatrana	Kachchh
Olangiya	Nakhatrana	Kachchh
Mosuna	Nakhatrana	Kachchh
Naranpar	Nakhatrana	Kachchh
Gangon Ugamani	Nakhatrana	Kachchh
Morgar	Nakhatrana	Kachchh
Anandpar	Nakhatrana	Kachchh
Tara	Nakhatrana	Kachchh
Kalyanpar	Nakhatrana	Kachchh
Manjal	Nakhatrana	Kachchh
Mathalapadar	Nakhatrana	Kachchh
Vibhapar	Nakhatrana	Kachchh
Mangvana	Nakhatrana	Kachchh
Palivad	Nakhatrana	Kachchh
Vijpasar	Nakhatrana	Kachchh
Roha(Sumari)	Nakhatrana	Kachchh
Bhitara	Nakhatrana	Kachchh
Jarjok	Nakhatrana	Kachchh
Kotda (Roha)	Nakhatrana	Kachchh
Bhojraj Vandh	Nakhatrana	Kachchh
Jesarvandh	Nakhatrana	Kachchh
Danana	Nakhatrana	Kachchh
Versalpar	Nakhatrana	Kachchh
Khirsara (Nava)	Nakhatrana	Kachchh
Sukhpar (Roha)	Nakhatrana	Kachchh
Varamseda	Nakhatrana	Kachchh
Jiyapar	Nakhatrana	Kachchh
Vadva Bhopavala	Nakhatrana	Kachchh
Vadva Kanyavala	Nakhatrana	Kachchh
Hothiay	Abdasa	Kachchh
Ber Moti	Abdasa	Kachchh
Golay	Abdasa	Kachchh
Navavas (Vandh)	Abdasa	Kachchh
Ber Nani	Abdasa	Kachchh
Vayor	Abdasa	Kachchh
Sarangvado	Abdasa	Kachchh
Vagapaddhar	Abdasa	Kachchh
Jagaliya	Abdasa	Kachchh
Goyla	Abdasa	Kachchh
Mokhra	Abdasa	Kachchh
Valsra	Abdasa	Kachchh
Fulay	Abdasa	Kachchh
Bhoa	Abdasa	Kachchh
Vagoth	Abdasa	Kachchh
Karamta	Abdasa	Kachchh
Thumdi	Abdasa	Kachchh
Akri Moti	Abdasa	Kachchh
Mohadi	Abdasa	Kachchh
Charopdi Moti	Abdasa	Kachchh
Ukir	Abdasa	Kachchh
Laiyari	Abdasa	Kachchh
Aida	Abdasa	Kachchh
Butta (Abdawali)	Abdasa	Kachchh
Bandiya	Abdasa	Kachchh
Ustiya (Bandiya)	Abdasa	Kachchh
Nangiya	Abdasa	Kachchh
Sujapar	Abdasa	Kachchh
Trambau	Abdasa	Kachchh
Rampar	Abdasa	Kachchh
Vadsar	Abdasa	Kachchh
Chhasra	Abdasa	Kachchh
Sukhpar (Sayand)	Abdasa	Kachchh
Charopdi Nani	Abdasa	Kachchh
Jana-Kosa	Abdasa	Kachchh
Kosa	Abdasa	Kachchh
Ashapar	Abdasa	Kachchh
Bara	Abdasa	Kachchh
Ragan Vandh	Abdasa	Kachchh
Kuvapaddhar	Abdasa	Kachchh
Daban	Abdasa	Kachchh
Khanay	Abdasa	Kachchh
Pat	Abdasa	Kachchh
Karaiya	Abdasa	Kachchh
Lakhania	Abdasa	Kachchh
Sukhpar Bara	Abdasa	Kachchh
Gudthar	Abdasa	Kachchh
Chhadura	Abdasa	Kachchh
Naliya	Abdasa	Kachchh
Sudadhro Nani	Abdasa	Kachchh
Sudadhro Moti	Abdasa	Kachchh
Kala Talav	Abdasa	Kachchh
Tera	Abdasa	Kachchh
Dhufi Moti	Abdasa	Kachchh
Balapar	Abdasa	Kachchh
Budadhro	Abdasa	Kachchh
Vamoti Nani	Abdasa	Kachchh
Samanda	Abdasa	Kachchh
Piyoni	Abdasa	Kachchh
Kandhay	Abdasa	Kachchh
Vamoti Moti	Abdasa	Kachchh
Bitta	Abdasa	Kachchh
Hamirpar	Abdasa	Kachchh
Dhufi Nani	Abdasa	Kachchh
Kunathia	Abdasa	Kachchh
Raydhanpar (Moti and Nani)	Abdasa	Kachchh
Jasapar	Abdasa	Kachchh
Kukadau	Abdasa	Kachchh
Jakhau	Abdasa	Kachchh
Budiya	Abdasa	Kachchh
Lala	Abdasa	Kachchh
Vingaber	Abdasa	Kachchh
Bhanada	Abdasa	Kachchh
Khirsara(Kothara)	Abdasa	Kachchh
Bhachunda	Abdasa	Kachchh
Biriari	Abdasa	Kachchh
Berachiya	Abdasa	Kachchh
Bhavanipar	Abdasa	Kachchh
Vandh Timbo	Abdasa	Kachchh
Balachod Nani	Abdasa	Kachchh
Balachod Moti	Abdasa	Kachchh
Bhimpar	Abdasa	Kachchh
Mothala	Abdasa	Kachchh
Rava	Abdasa	Kachchh
Nagor	Abdasa	Kachchh
Sandhav	Abdasa	Kachchh
Fulay Vandh	Abdasa	Kachchh
Vadapaddhar	Abdasa	Kachchh
Prajau	Abdasa	Kachchh
Ranpur	Abdasa	Kachchh
Varnori Budia	Abdasa	Kachchh
Sindhodi Moti	Abdasa	Kachchh
Sindhodi Nani	Abdasa	Kachchh
Vanku	Abdasa	Kachchh
Nodevandh	Abdasa	Kachchh
Bhedi (Pay)	Abdasa	Kachchh
Pay	Abdasa	Kachchh
Gadhvala Vada	Abdasa	Kachchh
Kanakpar	Abdasa	Kachchh
Nandhra Mota	Abdasa	Kachchh
Sanosara	Abdasa	Kachchh
Nandhra Nana	Abdasa	Kachchh
Naredi	Abdasa	Kachchh
Hingania	Abdasa	Kachchh
Chavadaka	Abdasa	Kachchh
Chiyasar	Abdasa	Kachchh
Kharua	Abdasa	Kachchh
Nundhatad	Abdasa	Kachchh
Miyani	Abdasa	Kachchh
Hajapar	Abdasa	Kachchh
Nanavada	Abdasa	Kachchh
Dhana Vara Vada	Abdasa	Kachchh
Kothara	Abdasa	Kachchh
Varadiya	Abdasa	Kachchh
Sanyara	Abdasa	Kachchh
Arikhana	Abdasa	Kachchh
Rapar Gadhvali	Abdasa	Kachchh
Kadoli	Abdasa	Kachchh
Kamand	Abdasa	Kachchh
Suthari	Abdasa	Kachchh
Vinjhan	Abdasa	Kachchh
Khirsara (Vinjhan)	Abdasa	Kachchh
Raydhanjar	Abdasa	Kachchh
Daha	Abdasa	Kachchh
Boha	Abdasa	Kachchh
Reladiya Manjal	Abdasa	Kachchh
Naranpar	Abdasa	Kachchh
Vandi Moti	Abdasa	Kachchh
Dumra	Abdasa	Kachchh
Sandhan	Abdasa	Kachchh
Khuado	Abdasa	Kachchh
Dhunvai	Abdasa	Kachchh
Chhachhi	Abdasa	Kachchh
Lathedi	Abdasa	Kachchh
Karodiya Mota	Abdasa	Kachchh
Karodiya Nana	Abdasa	Kachchh
Traya	Mandvi	Kachchh
Makda	Mandvi	Kachchh
Devpar	Mandvi	Kachchh
Dujapar	Mandvi	Kachchh
Filon	Mandvi	Kachchh
Nabhoi	Mandvi	Kachchh
Ajapar	Mandvi	Kachchh
Vinganiya	Mandvi	Kachchh
Jamthada	Mandvi	Kachchh
Ludva	Mandvi	Kachchh
Bheraiya	Mandvi	Kachchh
Virani	Mandvi	Kachchh
Gadhsisa	Mandvi	Kachchh
Mau Nani	Mandvi	Kachchh
Mau Moti	Mandvi	Kachchh
Poladiya	Mandvi	Kachchh
Kotdi	Mandvi	Kachchh
Sabhrai Nani	Mandvi	Kachchh
Sabhrai Moti	Mandvi	Kachchh
Halapar	Mandvi	Kachchh
Kotaya	Mandvi	Kachchh
Vindh	Mandvi	Kachchh
Kokaliya	Mandvi	Kachchh
Dedhiya	Mandvi	Kachchh
Bhojay	Mandvi	Kachchh
Nagrecha	Mandvi	Kachchh
Pyaka	Mandvi	Kachchh
Manjal	Mandvi	Kachchh
Asarani	Mandvi	Kachchh
Rajpar	Mandvi	Kachchh
Darashadi	Mandvi	Kachchh
Mamaymora	Mandvi	Kachchh
Rampar	Mandvi	Kachchh
Dhunai	Mandvi	Kachchh
Vekra	Mandvi	Kachchh
Kojachora	Mandvi	Kachchh
Vandh	Mandvi	Kachchh
Sherdi	Mandvi	Kachchh
Hamla	Mandvi	Kachchh
Ratadiya Nana	Mandvi	Kachchh
Ratadiya Mota	Mandvi	Kachchh
Gandhigram	Mandvi	Kachchh
Undoth Nani	Mandvi	Kachchh
Undoth Moti	Mandvi	Kachchh
Undoth Brahmanvali	Mandvi	Kachchh
Padamapar	Mandvi	Kachchh
Bayath	Mandvi	Kachchh
Mapar	Mandvi	Kachchh
Changdai	Mandvi	Kachchh
Mod Kuba	Mandvi	Kachchh
Bambhadai	Mandvi	Kachchh
Bada	Mandvi	Kachchh
Bhinsara	Mandvi	Kachchh
Layja Mota	Mandvi	Kachchh
Rajda	Mandvi	Kachchh
Bhadai Nani	Mandvi	Kachchh
Bhadai Moti	Mandvi	Kachchh
Gangapar	Mandvi	Kachchh
Dhokda	Mandvi	Kachchh
Goniyasar Nana	Mandvi	Kachchh
Goniyasar Mota	Mandvi	Kachchh
Asambiya Nana	Mandvi	Kachchh
Punadi	Mandvi	Kachchh
Faradi	Mandvi	Kachchh
Asambiya Mota	Mandvi	Kachchh
Jakhaniya	Mandvi	Kachchh
Koday	Mandvi	Kachchh
Don	Mandvi	Kachchh
Godhra	Mandvi	Kachchh
Panchatiya	Mandvi	Kachchh
Vindh Timbo	Mandvi	Kachchh
Bhada	Mandvi	Kachchh
Layja Nana	Mandvi	Kachchh
Kathda	Mandvi	Kachchh
Shirva	Mandvi	Kachchh
Merau	Mandvi	Kachchh
Vada	Mandvi	Kachchh
Rayan Moti	Mandvi	Kachchh
Rajpar Timbo	Mandvi	Kachchh
Talvana	Mandvi	Kachchh
Bidada	Mandvi	Kachchh
Nani Khakhar	Mandvi	Kachchh
Nana Bhadiya	Mandvi	Kachchh
Pipari	Mandvi	Kachchh
Rayan Nani	Mandvi	Kachchh
Durgapar	Mandvi	Kachchh
Bharapar	Mandvi	Kachchh
Mandvi (Rural)	Mandvi	Kachchh
Nagalpar	Mandvi	Kachchh
Maska	Mandvi	Kachchh
Bag	Mandvi	Kachchh
Gundiyali	Mandvi	Kachchh
Mota Bhadiya	Mandvi	Kachchh
Tragadi	Mandvi	Kachchh
Tumbadi Nani	Mundra	Kachchh
Tumbadi Moti	Mundra	Kachchh
Babiya	Mundra	Kachchh
Tappar	Mundra	Kachchh
Kanajra	Mundra	Kachchh
Lifara	Mundra	Kachchh
Vagura	Mundra	Kachchh
Bagda	Mundra	Kachchh
Fachariya	Mundra	Kachchh
Patri	Mundra	Kachchh
Vanki	Mundra	Kachchh
Bocha	Mundra	Kachchh
Beraja	Mundra	Kachchh
Ramaniya	Mundra	Kachchh
Depa	Mundra	Kachchh
Sukhpar	Mundra	Kachchh
Gelda	Mundra	Kachchh
Karagoga	Mundra	Kachchh
Lakhapar	Mundra	Kachchh
Kandagara Nana	Mundra	Kachchh
Kundrodi	Mundra	Kachchh
Chhasra	Mundra	Kachchh
Vovar	Mundra	Kachchh
Bharudiya	Mundra	Kachchh
Hatdi	Mundra	Kachchh
Kuvay	Mundra	Kachchh
Kukadsar	Mundra	Kachchh
Bhadresar	Mundra	Kachchh
Pavdiara	Mundra	Kachchh
Vadala	Mundra	Kachchh
Mokha	Mundra	Kachchh
Ratadiya	Mundra	Kachchh
Viraniya	Mundra	Kachchh
Toda	Mundra	Kachchh
Baraya	Mundra	Kachchh
Deshalpar	Mundra	Kachchh
Khakhar Moti	Mundra	Kachchh
Kandagara Mota	Mundra	Kachchh
Tunda	Mundra	Kachchh
Shiracha	Mundra	Kachchh
Moti Bhujpar	Mundra	Kachchh
Samagoga	Mundra	Kachchh
Pragpar (1)	Mundra	Kachchh
Pragpar (2)	Mundra	Kachchh
Bhorara	Mundra	Kachchh
Gundala	Mundra	Kachchh
Raga	Mundra	Kachchh
Luni	Mundra	Kachchh
Shekhadiya	Mundra	Kachchh
Sadau	Mundra	Kachchh
Mangra	Mundra	Kachchh
Mota Kapaya	Mundra	Kachchh
Nana Kapaya	Mundra	Kachchh
Borana	Mundra	Kachchh
Pratappar (1)	Mundra	Kachchh
Pratappar (2)	Mundra	Kachchh
Nani Bhujpar	Mundra	Kachchh
Navinal	Mundra	Kachchh
Jarpara	Mundra	Kachchh
Dhrab	Mundra	Kachchh
Baroi	Mundra	Kachchh
Goersama	Mundra	Kachchh
Padana	Gandhidham	Kachchh
Chudva	Gandhidham	Kachchh
Mithi Rohar	Gandhidham	Kachchh
Shinay	Gandhidham	Kachchh
Kidana	Gandhidham	Kachchh
Bharapar	Gandhidham	Kachchh
Mavsari	Vav	Banas Kantha
Jordiyali	Vav	Banas Kantha
Takhatpura (J)	Vav	Banas Kantha
Mithavi Rana	Vav	Banas Kantha
Mithavi Charan	Vav	Banas Kantha
Daiyap	Vav	Banas Kantha
Kumbhardi	Vav	Banas Kantha
Tejpura	Vav	Banas Kantha
Arjanpura	Vav	Banas Kantha
Panesada	Vav	Banas Kantha
Akoli	Vav	Banas Kantha
Baradvi	Vav	Banas Kantha
Kundaliya	Vav	Banas Kantha
Radha Nesda	Vav	Banas Kantha
Kareli	Vav	Banas Kantha
Baluntri	Vav	Banas Kantha
Tobha	Vav	Banas Kantha
Sanval	Vav	Banas Kantha
Vajiyasara	Vav	Banas Kantha
Chotil	Vav	Banas Kantha
Haripura	Vav	Banas Kantha
Rabadi Padar	Vav	Banas Kantha
Chandangadh	Vav	Banas Kantha
Chothar Nesda	Vav	Banas Kantha
Tadav	Vav	Banas Kantha
Fangadi	Vav	Banas Kantha
Kolava	Vav	Banas Kantha
Takhatpura (Dhima)	Vav	Banas Kantha
Pratappura	Vav	Banas Kantha
Dhima	Vav	Banas Kantha
Dheriana	Vav	Banas Kantha
Umedpura	Vav	Banas Kantha
Rachhena	Vav	Banas Kantha
Achhuva	Vav	Banas Kantha
Sapreda	Vav	Banas Kantha
Bhakhari	Vav	Banas Kantha
Gambhirpura	Vav	Banas Kantha
Chuva	Vav	Banas Kantha
Uchpa	Vav	Banas Kantha
Vav	Vav	Banas Kantha
Sardarpura	Vav	Banas Kantha
Golgam	Vav	Banas Kantha
Nalodar	Vav	Banas Kantha
Lodrani	Vav	Banas Kantha
Bukna	Vav	Banas Kantha
Reluchi	Vav	Banas Kantha
Khimanavas	Vav	Banas Kantha
Ravla	Vav	Banas Kantha
Malsan	Vav	Banas Kantha
Vavdi	Vav	Banas Kantha
Chandarva	Vav	Banas Kantha
Khimana Padar	Vav	Banas Kantha
Asaravas	Vav	Banas Kantha
Asaragam	Vav	Banas Kantha
Chatarpura	Vav	Banas Kantha
Padan	Vav	Banas Kantha
Golap	Vav	Banas Kantha
Jelana	Vav	Banas Kantha
Khardol	Vav	Banas Kantha
Bhatvar Vas	Vav	Banas Kantha
Bhachali	Vav	Banas Kantha
Madka	Vav	Banas Kantha
Morikha	Vav	Banas Kantha
Devpura (Suigam)	Vav	Banas Kantha
Devpura (Talsari)	Vav	Banas Kantha
Baiyak	Vav	Banas Kantha
Dharadhara	Vav	Banas Kantha
Dethali	Vav	Banas Kantha
Tithgam	Vav	Banas Kantha
Dendava	Vav	Banas Kantha
Bhatvargam	Vav	Banas Kantha
Kanothi	Vav	Banas Kantha
"Nesda (Go)"	Vav	Banas Kantha
Meghpura	Vav	Banas Kantha
Radosan	Vav	Banas Kantha
Nadabet	Vav	Banas Kantha
Bharadava	Vav	Banas Kantha
Koreti	Vav	Banas Kantha
Mamana	Vav	Banas Kantha
Limbala	Vav	Banas Kantha
Dhanana	Vav	Banas Kantha
Bahisara	Vav	Banas Kantha
Vasarda	Vav	Banas Kantha
Savpura	Vav	Banas Kantha
Bhadvel	Vav	Banas Kantha
Ishvariya	Vav	Banas Kantha
Janavada	Vav	Banas Kantha
Bhankhod	Vav	Banas Kantha
Rampura	Vav	Banas Kantha
Khadol	Vav	Banas Kantha
Chala	Vav	Banas Kantha
Motipura	Vav	Banas Kantha
Suigam	Vav	Banas Kantha
Jaloya	Vav	Banas Kantha
Benap	Vav	Banas Kantha
Sedav	Vav	Banas Kantha
Kumbharkha	Vav	Banas Kantha
Bhatasana	Vav	Banas Kantha
Eta	Vav	Banas Kantha
Kalyanpura	Vav	Banas Kantha
Lalpura	Vav	Banas Kantha
Radka	Vav	Banas Kantha
Jorawargadh	Vav	Banas Kantha
Uchosan	Vav	Banas Kantha
Dudhva	Vav	Banas Kantha
Rajpura	Vav	Banas Kantha
Limbuni	Vav	Banas Kantha
Masali	Vav	Banas Kantha
Madhpura	Vav	Banas Kantha
Harsad	Vav	Banas Kantha
Navapura	Vav	Banas Kantha
Katav	Vav	Banas Kantha
Garambadi	Vav	Banas Kantha
Morwada	Vav	Banas Kantha
Dhrechana	Vav	Banas Kantha
Boru	Vav	Banas Kantha
Dudosan	Vav	Banas Kantha
Dungala	Vav	Banas Kantha
Vaghpura	Vav	Banas Kantha
Dabhi	Vav	Banas Kantha
Soneth	Vav	Banas Kantha
Kasavi	Tharad	Banas Kantha
Bhardasar	Tharad	Banas Kantha
Takhuva	Tharad	Banas Kantha
Radka	Tharad	Banas Kantha
Betaliya	Tharad	Banas Kantha
Vantdau	Tharad	Banas Kantha
Khoda	Tharad	Banas Kantha
Vara	Tharad	Banas Kantha
Kharakhoda	Tharad	Banas Kantha
Miyal	Tharad	Banas Kantha
Vaghasan	Tharad	Banas Kantha
Savarakha	Tharad	Banas Kantha
Naroli	Tharad	Banas Kantha
Antrol	Tharad	Banas Kantha
Ranesari	Tharad	Banas Kantha
Sherau	Tharad	Banas Kantha
Ratanpura	Tharad	Banas Kantha
Ranpur	Tharad	Banas Kantha
Ajawada	Tharad	Banas Kantha
Karbun	Tharad	Banas Kantha
Nana Mesara	Tharad	Banas Kantha
Mota Mesara	Tharad	Banas Kantha
Dipda	Tharad	Banas Kantha
Jadara	Tharad	Banas Kantha
Chotapa	Tharad	Banas Kantha
Bevata	Tharad	Banas Kantha
Terol	Tharad	Banas Kantha
Therwada	Tharad	Banas Kantha
Dedudi	Tharad	Banas Kantha
Deduva	Tharad	Banas Kantha
Morthal	Tharad	Banas Kantha
Luvana (K)	Tharad	Banas Kantha
Kesargam	Tharad	Banas Kantha
Pepar	Tharad	Banas Kantha
Valadar	Tharad	Banas Kantha
Dantiya	Tharad	Banas Kantha
Piluda	Tharad	Banas Kantha
Rampura	Tharad	Banas Kantha
Patiyasara	Tharad	Banas Kantha
Rajkot	Tharad	Banas Kantha
Jampur	Tharad	Banas Kantha
Pirgadh	Tharad	Banas Kantha
Saba	Tharad	Banas Kantha
Gadsisar	Tharad	Banas Kantha
Medhala	Tharad	Banas Kantha
Ghantiyali	Tharad	Banas Kantha
Bhorol	Tharad	Banas Kantha
Ganeshpura	Tharad	Banas Kantha
Savpura	Tharad	Banas Kantha
Bhadodar	Tharad	Banas Kantha
Bhapi	Tharad	Banas Kantha
Bhapdi	Tharad	Banas Kantha
Hathawada	Tharad	Banas Kantha
Mangrol	Tharad	Banas Kantha
Bhuriya	Tharad	Banas Kantha
Kamali	Tharad	Banas Kantha
Changada	Tharad	Banas Kantha
Meghpura	Tharad	Banas Kantha
Thara	Tharad	Banas Kantha
Kiyal	Tharad	Banas Kantha
Duva	Tharad	Banas Kantha
Pavadasan	Tharad	Banas Kantha
Arantva	Tharad	Banas Kantha
Kochala	Tharad	Banas Kantha
Rah	Tharad	Banas Kantha
Lakhapura	Tharad	Banas Kantha
Bhalasara	Tharad	Banas Kantha
Chhanasara	Tharad	Banas Kantha
Didarada	Tharad	Banas Kantha
Lodhnor	Tharad	Banas Kantha
Vami	Tharad	Banas Kantha
Lorwada	Tharad	Banas Kantha
Mahadevpura	Tharad	Banas Kantha
Idhata	Tharad	Banas Kantha
Jamda	Tharad	Banas Kantha
Lunal	Tharad	Banas Kantha
Dudhva	Tharad	Banas Kantha
Kumbhara	Tharad	Banas Kantha
Vedala	Tharad	Banas Kantha
Bhimpura	Tharad	Banas Kantha
Khengarpura	Tharad	Banas Kantha
Delankot	Tharad	Banas Kantha
Ghodasar	Tharad	Banas Kantha
Sidhotara	Tharad	Banas Kantha
Untveliya	Tharad	Banas Kantha
Madal	Tharad	Banas Kantha
Asodar	Tharad	Banas Kantha
Undrana	Tharad	Banas Kantha
Bhordu	Tharad	Banas Kantha
Karanpura	Tharad	Banas Kantha
Gagana	Tharad	Banas Kantha
Janadi	Tharad	Banas Kantha
Dolatpura	Tharad	Banas Kantha
Mahajanpura	Tharad	Banas Kantha
Lendau	Tharad	Banas Kantha
Bhachar	Tharad	Banas Kantha
Chudmer	Tharad	Banas Kantha
Budhanpur	Tharad	Banas Kantha
Ghesda	Tharad	Banas Kantha
Kothigam	Tharad	Banas Kantha
Zenta	Tharad	Banas Kantha
Nanol	Tharad	Banas Kantha
Sedla	Tharad	Banas Kantha
Taruwa	Tharad	Banas Kantha
Bhimgadh	Tharad	Banas Kantha
Detal Duva	Tharad	Banas Kantha
Detal Darbari	Tharad	Banas Kantha
Dodiya	Tharad	Banas Kantha
Lalpur	Tharad	Banas Kantha
Ganata	Tharad	Banas Kantha
Morila	Tharad	Banas Kantha
Pathamda	Tharad	Banas Kantha
Vadgamda	Tharad	Banas Kantha
Abhepura	Tharad	Banas Kantha
Charda	Tharad	Banas Kantha
Khanpur	Tharad	Banas Kantha
Nagala	Tharad	Banas Kantha
Vajegadh	Tharad	Banas Kantha
Malupur	Tharad	Banas Kantha
Karnasar	Tharad	Banas Kantha
Padadar	Tharad	Banas Kantha
Gela	Tharad	Banas Kantha
Peparal	Tharad	Banas Kantha
Jetda	Tharad	Banas Kantha
Lunawa	Tharad	Banas Kantha
Khorda	Tharad	Banas Kantha
Moti Pavad	Tharad	Banas Kantha
Nani Pavad	Tharad	Banas Kantha
Jandla	Tharad	Banas Kantha
Dodgam	Tharad	Banas Kantha
Sanadhar	Tharad	Banas Kantha
Del	Tharad	Banas Kantha
Sanavia	Tharad	Banas Kantha
Asasan	Tharad	Banas Kantha
Nenava	Dhanera	Banas Kantha
Khaprol	Dhanera	Banas Kantha
Gola	Dhanera	Banas Kantha
Aeta	Dhanera	Banas Kantha
Vasan	Dhanera	Banas Kantha
Pengiya	Dhanera	Banas Kantha
Dharnodhar	Dhanera	Banas Kantha
Shergadh (Jadiya)	Dhanera	Banas Kantha
Kunwarla	Dhanera	Banas Kantha
Magarawa	Dhanera	Banas Kantha
Lawara	Dhanera	Banas Kantha
Lelava	Dhanera	Banas Kantha
Bhajna	Dhanera	Banas Kantha
Nanuda	Dhanera	Banas Kantha
Vinchhivadi	Dhanera	Banas Kantha
Charda	Dhanera	Banas Kantha
Hadta	Dhanera	Banas Kantha
Rampura Chhota	Dhanera	Banas Kantha
Jadiya	Dhanera	Banas Kantha
Bhatib	Dhanera	Banas Kantha
Dugdol Moti	Dhanera	Banas Kantha
Dugdol Nani	Dhanera	Banas Kantha
Edal	Dhanera	Banas Kantha
Talegadh	Dhanera	Banas Kantha
Kundi	Dhanera	Banas Kantha
Bapla	Dhanera	Banas Kantha
Vachhol	Dhanera	Banas Kantha
Vaktapura	Dhanera	Banas Kantha
Rampura (Vaghpura)	Dhanera	Banas Kantha
Mandal	Dhanera	Banas Kantha
Anapur Chhota	Dhanera	Banas Kantha
Janali	Dhanera	Banas Kantha
Siya	Dhanera	Banas Kantha
Jadi	Dhanera	Banas Kantha
Jiwana	Dhanera	Banas Kantha
Kotda (Dhakha)	Dhanera	Banas Kantha
Ramuna	Dhanera	Banas Kantha
Dhakha	Dhanera	Banas Kantha
Thawar	Dhanera	Banas Kantha
Mota Meda	Dhanera	Banas Kantha
Malotra	Dhanera	Banas Kantha
Sera	Dhanera	Banas Kantha
Kotda (Raviya)	Dhanera	Banas Kantha
Raviya	Dhanera	Banas Kantha
Nana Meda	Dhanera	Banas Kantha
Anapurgadh	Dhanera	Banas Kantha
Negala	Dhanera	Banas Kantha
Vasda	Dhanera	Banas Kantha
Ravi	Dhanera	Banas Kantha
Sodal	Dhanera	Banas Kantha
Bhatram	Dhanera	Banas Kantha
Alwada	Dhanera	Banas Kantha
Sabawadi	Dhanera	Banas Kantha
Dedha	Dhanera	Banas Kantha
Rampura Mota	Dhanera	Banas Kantha
Sotwada	Dhanera	Banas Kantha
Fatepura (Malotra)	Dhanera	Banas Kantha
Jorapura (Dhakha)	Dhanera	Banas Kantha
Yavarpura	Dhanera	Banas Kantha
Sankad	Dhanera	Banas Kantha
Saral	Dhanera	Banas Kantha
Asiya	Dhanera	Banas Kantha
Samalwada	Dhanera	Banas Kantha
Karadhani	Dhanera	Banas Kantha
Valer	Dhanera	Banas Kantha
Voda	Dhanera	Banas Kantha
Runi	Dhanera	Banas Kantha
Mewada	Dhanera	Banas Kantha
Rajoda	Dhanera	Banas Kantha
Khangan	Dhanera	Banas Kantha
Dhanpura (Kheda)	Dhanera	Banas Kantha
Vachhdal	Dhanera	Banas Kantha
Khimat	Dhanera	Banas Kantha
Kumar	Dhanera	Banas Kantha
Chhindivadi	Dhanera	Banas Kantha
Silasana	Dhanera	Banas Kantha
Virol	Dhanera	Banas Kantha
Panswal	Dantiwada	Banas Kantha
Rampura (Panswal)	Dantiwada	Banas Kantha
Santarwada	Dantiwada	Banas Kantha
Dhaniyawada	Dantiwada	Banas Kantha
Bhandotra	Dantiwada	Banas Kantha
Gundari	Dantiwada	Banas Kantha
Satsan	Dantiwada	Banas Kantha
Arkhi	Dantiwada	Banas Kantha
Vagor	Dantiwada	Banas Kantha
Panthawada	Dantiwada	Banas Kantha
Zat	Dantiwada	Banas Kantha
Akoli	Dantiwada	Banas Kantha
Bhilada	Dantiwada	Banas Kantha
Ganguwada	Dantiwada	Banas Kantha
Bhadali (Zat)	Dantiwada	Banas Kantha
Lakhanasar	Dantiwada	Banas Kantha
Mahudi Moti	Dantiwada	Banas Kantha
Mahudi Nani	Dantiwada	Banas Kantha
Rampura Mahudi	Dantiwada	Banas Kantha
Kotda (Jegol)	Dantiwada	Banas Kantha
Gangudara	Dantiwada	Banas Kantha
Rajkot	Dantiwada	Banas Kantha
Bhilachal	Dantiwada	Banas Kantha
Deri	Dantiwada	Banas Kantha
Vavdhara	Dantiwada	Banas Kantha
Hariyawada	Dantiwada	Banas Kantha
Odhava	Dantiwada	Banas Kantha
Jegol	Dantiwada	Banas Kantha
Ganodara	Dantiwada	Banas Kantha
Atal	Dantiwada	Banas Kantha
Bhakodar	Dantiwada	Banas Kantha
Dhaneri	Dantiwada	Banas Kantha
Velavas	Dantiwada	Banas Kantha
Shergadh Odhava	Dantiwada	Banas Kantha
Malpuriya	Dantiwada	Banas Kantha
Talenagar	Dantiwada	Banas Kantha
Ranol	Dantiwada	Banas Kantha
Marwada	Dantiwada	Banas Kantha
Ratanpur	Dantiwada	Banas Kantha
Chodungri	Dantiwada	Banas Kantha
Jorapura Bhadli	Dantiwada	Banas Kantha
Bhadli Kotha	Dantiwada	Banas Kantha
Godh	Dantiwada	Banas Kantha
Nandotra (Brahmanvas)	Dantiwada	Banas Kantha
Dantiwada	Dantiwada	Banas Kantha
Fatepura (Dhanawada)	Dantiwada	Banas Kantha
Vadvas	Dantiwada	Banas Kantha
Jorapura (Lodpa)	Dantiwada	Banas Kantha
Nilpur	Dantiwada	Banas Kantha
Nandotra (Thakorvas)	Dantiwada	Banas Kantha
Sikariya	Dantiwada	Banas Kantha
Bhakhar Nani	Dantiwada	Banas Kantha
Bhakhar Moti	Dantiwada	Banas Kantha
Vaghrol	Dantiwada	Banas Kantha
Lodpa	Dantiwada	Banas Kantha
Ramsida (Chhapra)	Dantiwada	Banas Kantha
Dangiya	Dantiwada	Banas Kantha
Kapasiya	Amirgadh	Banas Kantha
Khari	Amirgadh	Banas Kantha
Zaba	Amirgadh	Banas Kantha
Rabariya	Amirgadh	Banas Kantha
Gadhada	Amirgadh	Banas Kantha
Awal	Amirgadh	Banas Kantha
Dabheli	Amirgadh	Banas Kantha
Savaniya	Amirgadh	Banas Kantha
Sonwadi	Amirgadh	Banas Kantha
Ghanta	Amirgadh	Banas Kantha
Vera	Amirgadh	Banas Kantha
Awala (Arniwada)	Amirgadh	Banas Kantha
Manpuriya	Amirgadh	Banas Kantha
Vaghoriya	Amirgadh	Banas Kantha
Khara	Amirgadh	Banas Kantha
Karaza	Amirgadh	Banas Kantha
Umarkot	Amirgadh	Banas Kantha
Deri	Amirgadh	Banas Kantha
Balundra	Amirgadh	Banas Kantha
Juni Roh Sarotri	Amirgadh	Banas Kantha
Laxmipura (Amirgadh)	Amirgadh	Banas Kantha
Kali Mati	Amirgadh	Banas Kantha
Sarotra	Amirgadh	Banas Kantha
Kidotar	Amirgadh	Banas Kantha
Isvani	Amirgadh	Banas Kantha
Kakwada	Amirgadh	Banas Kantha
Amirgadh	Amirgadh	Banas Kantha
Juni Roh	Amirgadh	Banas Kantha
Nichlo Bandh	Amirgadh	Banas Kantha
Uplo Bandh	Amirgadh	Banas Kantha
Dungarpura	Amirgadh	Banas Kantha
Jorapura (Amirgadh)	Amirgadh	Banas Kantha
Ghanghu	Amirgadh	Banas Kantha
Dholia	Amirgadh	Banas Kantha
Zanzarvav	Amirgadh	Banas Kantha
Iqbalgadh	Amirgadh	Banas Kantha
Jethi	Amirgadh	Banas Kantha
Bantawada	Amirgadh	Banas Kantha
Rajpuriya	Amirgadh	Banas Kantha
Ambapani	Amirgadh	Banas Kantha
Mandaliya	Amirgadh	Banas Kantha
Khajuriya	Amirgadh	Banas Kantha
Rabaran	Amirgadh	Banas Kantha
Bhamariya	Amirgadh	Banas Kantha
Khuniya	Amirgadh	Banas Kantha
Khapa	Amirgadh	Banas Kantha
Karmadi	Amirgadh	Banas Kantha
Dabhchatra	Amirgadh	Banas Kantha
Ganji	Amirgadh	Banas Kantha
Ghoda	Amirgadh	Banas Kantha
Dhanpura (Dholiya)	Amirgadh	Banas Kantha
Surela	Amirgadh	Banas Kantha
Ajapur Mota	Amirgadh	Banas Kantha
Ajapur Vanka	Amirgadh	Banas Kantha
Kansaravid	Amirgadh	Banas Kantha
Rampura (Vadla)	Amirgadh	Banas Kantha
Vagdadi	Amirgadh	Banas Kantha
Khemarajiya	Amirgadh	Banas Kantha
Dabhela	Amirgadh	Banas Kantha
Dhanpura	Amirgadh	Banas Kantha
Chikanvas	Amirgadh	Banas Kantha
Virampur	Amirgadh	Banas Kantha
Kanpura	Amirgadh	Banas Kantha
Bhayla	Amirgadh	Banas Kantha
Kengora	Amirgadh	Banas Kantha
Pedcholi	Amirgadh	Banas Kantha
Tadholi	Amirgadh	Banas Kantha
Gavara	Amirgadh	Banas Kantha
Khapara	Amirgadh	Banas Kantha
Dabhchatra	Danta	Banas Kantha
Guda	Danta	Banas Kantha
Sembalpani	Danta	Banas Kantha
Bedapani	Danta	Banas Kantha
Sarhad Chhapri	Danta	Banas Kantha
Amblimal	Danta	Banas Kantha
Ghodatankani	Danta	Banas Kantha
Khokhar Bili	Danta	Banas Kantha
Koteshvar	Danta	Banas Kantha
Jharivav	Danta	Banas Kantha
Padaliya	Danta	Banas Kantha
Naivada	Danta	Banas Kantha
Kengora	Danta	Banas Kantha
Viramveri	Danta	Banas Kantha
Kumbhariya	Danta	Banas Kantha
Chikhla	Danta	Banas Kantha
Ranpur	Danta	Banas Kantha
Jetvas	Danta	Banas Kantha
Rinchhadi	Danta	Banas Kantha
Panchha	Danta	Banas Kantha
Dhareda	Danta	Banas Kantha
Siyavada	Danta	Banas Kantha
Dhabani Vav	Danta	Banas Kantha
Devaliyavali Vav	Danta	Banas Kantha
Jambera	Danta	Banas Kantha
Rupvas	Danta	Banas Kantha
Jhumfali	Danta	Banas Kantha
Tarangda	Danta	Banas Kantha
Khokhariyavas	Danta	Banas Kantha
Ganapipli	Danta	Banas Kantha
Machakoda	Danta	Banas Kantha
Javara	Danta	Banas Kantha
Mahuda	Danta	Banas Kantha
Kesarpura	Danta	Banas Kantha
Kodaravi Ranpur	Danta	Banas Kantha
Begadiyavas	Danta	Banas Kantha
Hadad	Danta	Banas Kantha
Dhamanva	Danta	Banas Kantha
Gothada	Danta	Banas Kantha
Dericharda	Danta	Banas Kantha
Manchhla	Danta	Banas Kantha
Taleti	Danta	Banas Kantha
Pipalavali Vav	Danta	Banas Kantha
Vasi	Danta	Banas Kantha
Divdi	Danta	Banas Kantha
Kansa	Danta	Banas Kantha
Hedo	Danta	Banas Kantha
Vaghdacha	Danta	Banas Kantha
Pethapur	Danta	Banas Kantha
Manpur (Pethapur)	Danta	Banas Kantha
Kheroj	Danta	Banas Kantha
Pataliya	Danta	Banas Kantha
Harivav	Danta	Banas Kantha
Mal	Danta	Banas Kantha
Chori	Danta	Banas Kantha
Bhadramal	Danta	Banas Kantha
Kunvarsi	Danta	Banas Kantha
Khermal	Danta	Banas Kantha
Kherani Umbari	Danta	Banas Kantha
Miranvas	Danta	Banas Kantha
Khatal	Danta	Banas Kantha
Raghpur	Danta	Banas Kantha
Sultanpur	Danta	Banas Kantha
Banodara	Danta	Banas Kantha
Virpur(Hadad)	Danta	Banas Kantha
Bamnoj	Danta	Banas Kantha
Sarakala	Danta	Banas Kantha
Dhrangivas	Danta	Banas Kantha
Vadnal	Danta	Banas Kantha
Rayaniya	Danta	Banas Kantha
Mankanchampa	Danta	Banas Kantha
Mahobatgadh (Hadad)	Danta	Banas Kantha
Navovas (Hadad)	Danta	Banas Kantha
Unodara	Danta	Banas Kantha
Toraniya	Danta	Banas Kantha
Amloi	Danta	Banas Kantha
Khandhora	Danta	Banas Kantha
Bordiyala	Danta	Banas Kantha
Chokibor	Danta	Banas Kantha
Kanabiyavas	Danta	Banas Kantha
Danta	Danta	Banas Kantha
Balvantpura	Danta	Banas Kantha
Velvada	Danta	Banas Kantha
Ganchhera	Danta	Banas Kantha
Karanpur	Danta	Banas Kantha
Motasada	Danta	Banas Kantha
Mahobatgadh (Danta)	Danta	Banas Kantha
Punjpur	Danta	Banas Kantha
Ratanpur	Danta	Banas Kantha
Vadvera	Danta	Banas Kantha
Mota Pipodara	Danta	Banas Kantha
Barvas	Danta	Banas Kantha
Vagada Kyari	Danta	Banas Kantha
Jalana	Danta	Banas Kantha
Beda	Danta	Banas Kantha
Chhota Bamodara	Danta	Banas Kantha
Mota Bamodara	Danta	Banas Kantha
Chhota Pipodara	Danta	Banas Kantha
Sanali	Danta	Banas Kantha
Santpur	Danta	Banas Kantha
Ruppura	Danta	Banas Kantha
Dhagadiya	Danta	Banas Kantha
Jasvantpura (Hadad)	Danta	Banas Kantha
Mandali	Danta	Banas Kantha
Udavas	Danta	Banas Kantha
Hathi Pagala	Danta	Banas Kantha
Jamru	Danta	Banas Kantha
Jodhsar	Danta	Banas Kantha
Ranika	Danta	Banas Kantha
Samaiya	Danta	Banas Kantha
Dalpura	Danta	Banas Kantha
Pith (Navanagar)	Danta	Banas Kantha
Khaivad	Danta	Banas Kantha
Gadh (Danta)	Danta	Banas Kantha
Kundel	Danta	Banas Kantha
Thana	Danta	Banas Kantha
Nargadh	Danta	Banas Kantha
Gangva	Danta	Banas Kantha
Jagatapura	Danta	Banas Kantha
Nanasada	Danta	Banas Kantha
Harigadh	Danta	Banas Kantha
Bamaniya	Danta	Banas Kantha
Amarpura	Danta	Banas Kantha
Toda	Danta	Banas Kantha
Abhapura	Danta	Banas Kantha
Aderan (Danta)	Danta	Banas Kantha
Godhani	Danta	Banas Kantha
Paniyari	Danta	Banas Kantha
Panudara	Danta	Banas Kantha
Vadusan	Danta	Banas Kantha
Gadh (Mahudi)	Danta	Banas Kantha
Gajipur	Danta	Banas Kantha
Manpur (Ghorad)	Danta	Banas Kantha
Ghorad	Danta	Banas Kantha
Mor Dungara	Danta	Banas Kantha
Mankdi	Danta	Banas Kantha
Sembal	Danta	Banas Kantha
Pasiya	Danta	Banas Kantha
Umbara	Danta	Banas Kantha
Khantani Magari	Danta	Banas Kantha
Bhanpur	Danta	Banas Kantha
Rani Umbari	Danta	Banas Kantha
Magvas	Danta	Banas Kantha
Sandhosi	Danta	Banas Kantha
Thalvada	Danta	Banas Kantha
Kanagar	Danta	Banas Kantha
Navanu Padar	Danta	Banas Kantha
Kukadi	Danta	Banas Kantha
Vekari	Danta	Banas Kantha
Chorasan	Danta	Banas Kantha
Navavas (Danta)	Danta	Banas Kantha
Jasvantgadh	Danta	Banas Kantha
Nagel	Danta	Banas Kantha
Jasvantpura (Danta)	Danta	Banas Kantha
Bhankhri	Danta	Banas Kantha
Savaipura	Danta	Banas Kantha
Sembaliya	Danta	Banas Kantha
Ambaghanta	Danta	Banas Kantha
Vajasana	Danta	Banas Kantha
Nani Tudiya	Danta	Banas Kantha
Mahudi	Danta	Banas Kantha
Jasvapura (Mankdi)	Danta	Banas Kantha
Aderan (Mankadi)	Danta	Banas Kantha
Motipura	Danta	Banas Kantha
Virpur (Lotol)	Danta	Banas Kantha
Dhunali	Danta	Banas Kantha
Senkda	Danta	Banas Kantha
Tekari	Danta	Banas Kantha
Lotol	Danta	Banas Kantha
Bhachadiya	Danta	Banas Kantha
Ranol	Danta	Banas Kantha
Rangpur	Danta	Banas Kantha
Kantivas	Danta	Banas Kantha
Bhavangadh	Danta	Banas Kantha
Madhusudanpura	Danta	Banas Kantha
Pruthvirajgadh	Danta	Banas Kantha
Solsanda	Danta	Banas Kantha
Koylapur	Danta	Banas Kantha
Navaniya	Danta	Banas Kantha
Jitpur	Danta	Banas Kantha
Vijalasan	Danta	Banas Kantha
Umedpura	Danta	Banas Kantha
Jorapura	Danta	Banas Kantha
Ghantodi	Danta	Banas Kantha
Bharod	Vadgam	Banas Kantha
Dhanpura	Vadgam	Banas Kantha
Jalotra	Vadgam	Banas Kantha
Dhori	Vadgam	Banas Kantha
Pavthi	Vadgam	Banas Kantha
Motipura	Vadgam	Banas Kantha
Vagadadi	Vadgam	Banas Kantha
Andhariya	Vadgam	Banas Kantha
Amadpura (Mumanvas)	Vadgam	Banas Kantha
Mumanvas	Vadgam	Banas Kantha
Thuvar	Vadgam	Banas Kantha
Moteta	Vadgam	Banas Kantha
Majatpur	Vadgam	Banas Kantha
Parkhadi	Vadgam	Banas Kantha
Samsherpura	Vadgam	Banas Kantha
Islampura	Vadgam	Banas Kantha
Varvadiya	Vadgam	Banas Kantha
Chhaniyana	Vadgam	Banas Kantha
Hasanpur	Vadgam	Banas Kantha
Vansol	Vadgam	Banas Kantha
Kamalpura	Vadgam	Banas Kantha
Karnala	Vadgam	Banas Kantha
Hatavad	Vadgam	Banas Kantha
Joita	Vadgam	Banas Kantha
Moriya	Vadgam	Banas Kantha
Sabalpura	Vadgam	Banas Kantha
Ghodiyal	Vadgam	Banas Kantha
Varnawada	Vadgam	Banas Kantha
Dhota	Vadgam	Banas Kantha
Vadgam	Vadgam	Banas Kantha
Bhangrodiya	Vadgam	Banas Kantha
Malosana	Vadgam	Banas Kantha
Majadar	Vadgam	Banas Kantha
Sherpura (Majadar)	Vadgam	Banas Kantha
Changwada	Vadgam	Banas Kantha
Changa	Vadgam	Banas Kantha
Basu	Vadgam	Banas Kantha
Meta	Vadgam	Banas Kantha
Pirojpura	Vadgam	Banas Kantha
Mahi	Vadgam	Banas Kantha
Bharkawada	Vadgam	Banas Kantha
Nalasar	Vadgam	Banas Kantha
Timbachudi	Vadgam	Banas Kantha
Magarwada	Vadgam	Banas Kantha
Limboi	Vadgam	Banas Kantha
Memadpur	Vadgam	Banas Kantha
Sakalana	Vadgam	Banas Kantha
Karasanpura	Vadgam	Banas Kantha
Hadmatiya	Vadgam	Banas Kantha
Amadpura (Ghodiyal)	Vadgam	Banas Kantha
Sukhpura	Vadgam	Banas Kantha
Sardarpura	Vadgam	Banas Kantha
Dhanali	Vadgam	Banas Kantha
Bhatvas	Vadgam	Banas Kantha
Sisrana	Vadgam	Banas Kantha
Chitroda	Vadgam	Banas Kantha
Mejarpura	Vadgam	Banas Kantha
Rupal	Vadgam	Banas Kantha
Navisana	Vadgam	Banas Kantha
Varasada	Vadgam	Banas Kantha
Bavalchudi	Vadgam	Banas Kantha
Rajosana	Vadgam	Banas Kantha
Teniwada	Vadgam	Banas Kantha
Kotadi	Vadgam	Banas Kantha
Kodarali	Vadgam	Banas Kantha
Edrana	Vadgam	Banas Kantha
Vesa	Vadgam	Banas Kantha
Gidasan Nani	Vadgam	Banas Kantha
Megal	Vadgam	Banas Kantha
Pepol	Vadgam	Banas Kantha
Panchada	Vadgam	Banas Kantha
Kabirpura	Vadgam	Banas Kantha
Nizampura	Vadgam	Banas Kantha
Mokeshvar	Vadgam	Banas Kantha
Pandva	Vadgam	Banas Kantha
Navo Vas	Vadgam	Banas Kantha
Iqbalpura	Vadgam	Banas Kantha
Tajpura	Vadgam	Banas Kantha
Salemkot	Vadgam	Banas Kantha
Badarpura	Vadgam	Banas Kantha
Mepada	Vadgam	Banas Kantha
Gidasan Moti	Vadgam	Banas Kantha
Nandotra	Vadgam	Banas Kantha
Fategadh	Vadgam	Banas Kantha
Pasvadal	Vadgam	Banas Kantha
Manpura	Vadgam	Banas Kantha
Dharewada	Vadgam	Banas Kantha
Nanosana	Vadgam	Banas Kantha
Umrecha	Vadgam	Banas Kantha
Paldi	Vadgam	Banas Kantha
Nagana	Vadgam	Banas Kantha
Nagarpura	Vadgam	Banas Kantha
Juni Nagari	Vadgam	Banas Kantha
Bhalgam	Vadgam	Banas Kantha
Bhakhari	Vadgam	Banas Kantha
Sherpura (Sembhar)	Vadgam	Banas Kantha
Kaleda	Vadgam	Banas Kantha
Harde Vasana	Vadgam	Banas Kantha
Juni Sendhani	Vadgam	Banas Kantha
Navi Sendhani	Vadgam	Banas Kantha
Amirpura	Vadgam	Banas Kantha
Vasana (Sembhar)	Vadgam	Banas Kantha
Navi Nagari	Vadgam	Banas Kantha
Pilucha	Vadgam	Banas Kantha
Dalvana	Vadgam	Banas Kantha
Thalwada	Vadgam	Banas Kantha
Iqbalgadh	Vadgam	Banas Kantha
Bhukhla	Vadgam	Banas Kantha
Kodaram	Vadgam	Banas Kantha
Jorapura Bhakhar	Palanpur	Banas Kantha
Ranawas	Palanpur	Banas Kantha
Juvol	Palanpur	Banas Kantha
Chekhala	Palanpur	Banas Kantha
Rampura (Karaza)	Palanpur	Banas Kantha
Bhatamal Nani	Palanpur	Banas Kantha
Akedi	Palanpur	Banas Kantha
Badarpura (Bhutedi)	Palanpur	Banas Kantha
Vadhana	Palanpur	Banas Kantha
Madana (Dangiya)	Palanpur	Banas Kantha
Kotda (Bhakhar)	Palanpur	Banas Kantha
Mota	Palanpur	Banas Kantha
Chandisar	Palanpur	Banas Kantha
Kushakal	Palanpur	Banas Kantha
Delwada	Palanpur	Banas Kantha
Rajpur (Pakhanva)	Palanpur	Banas Kantha
Bhutedi	Palanpur	Banas Kantha
Sangla	Palanpur	Banas Kantha
Bhatamal Moti	Palanpur	Banas Kantha
Antroli	Palanpur	Banas Kantha
Pirojpura(Tankani)	Palanpur	Banas Kantha
Kotda (Chand Gadh)	Palanpur	Banas Kantha
Chitrasani	Palanpur	Banas Kantha
Ranpuriya	Palanpur	Banas Kantha
Ukarda	Palanpur	Banas Kantha
Malpuriya	Palanpur	Banas Kantha
Jaspuriya	Palanpur	Banas Kantha
Hebatpur	Palanpur	Banas Kantha
Malana	Palanpur	Banas Kantha
Pakhanwa	Palanpur	Banas Kantha
Moriya	Palanpur	Banas Kantha
Lunwa	Palanpur	Banas Kantha
Varwadia	Palanpur	Banas Kantha
Khemana	Palanpur	Banas Kantha
Surajpura (Khe)	Palanpur	Banas Kantha
Sangra	Palanpur	Banas Kantha
Laxmanpura	Palanpur	Banas Kantha
Hasanpur	Palanpur	Banas Kantha
Merwada (Mahajan)	Palanpur	Banas Kantha
Hathidra	Palanpur	Banas Kantha
Pedagara	Palanpur	Banas Kantha
Malan	Palanpur	Banas Kantha
Vasda (Fatepur)	Palanpur	Banas Kantha
Manpur (Karjoda)	Palanpur	Banas Kantha
Asmapura (Karjoda)	Palanpur	Banas Kantha
Karjoda	Palanpur	Banas Kantha
Songadh	Palanpur	Banas Kantha
Parpada	Palanpur	Banas Kantha
Angola	Palanpur	Banas Kantha
Badarpura (Khodla)	Palanpur	Banas Kantha
Khodla	Palanpur	Banas Kantha
Kumbhalmer	Palanpur	Banas Kantha
Sundha	Palanpur	Banas Kantha
Samdhi Ranajivas	Palanpur	Banas Kantha
Samdhi (Motavas)	Palanpur	Banas Kantha
Samdhi (Nadhanivas)	Palanpur	Banas Kantha
Vasani	Palanpur	Banas Kantha
Kumbhasan	Palanpur	Banas Kantha
Vedancha	Palanpur	Banas Kantha
Akesan	Palanpur	Banas Kantha
Chadotar	Palanpur	Banas Kantha
Sadarpur	Palanpur	Banas Kantha
Aligadh	Palanpur	Banas Kantha
Vasda (Mujpur)	Palanpur	Banas Kantha
Nalasar	Palanpur	Banas Kantha
Ambaliyal	Palanpur	Banas Kantha
Jadial	Palanpur	Banas Kantha
Bhatwadi	Palanpur	Banas Kantha
Kumpar	Palanpur	Banas Kantha
Godh	Palanpur	Banas Kantha
Dhandha	Palanpur	Banas Kantha
Vasan	Palanpur	Banas Kantha
Bhagal (Pipli)	Palanpur	Banas Kantha
Dhaniyana	Palanpur	Banas Kantha
Ambetha	Palanpur	Banas Kantha
Virpur	Palanpur	Banas Kantha
Ratanpur	Palanpur	Banas Kantha
Gathaman	Palanpur	Banas Kantha
Bhavisana	Palanpur	Banas Kantha
Salempura	Palanpur	Banas Kantha
Gadh	Palanpur	Banas Kantha
Talepura (Madana)	Palanpur	Banas Kantha
Dalwada	Palanpur	Banas Kantha
Madana (Gadh)	Palanpur	Banas Kantha
Khasa	Palanpur	Banas Kantha
Hoda	Palanpur	Banas Kantha
Galwada	Palanpur	Banas Kantha
Sagrosana	Palanpur	Banas Kantha
Esbipura	Palanpur	Banas Kantha
Lalawada	Palanpur	Banas Kantha
Sambarda	Palanpur	Banas Kantha
Pipli	Palanpur	Banas Kantha
Gopalpura	Palanpur	Banas Kantha
Manaka	Palanpur	Banas Kantha
Ruppura	Palanpur	Banas Kantha
Gola	Palanpur	Banas Kantha
Merwada (Ratanpur)	Palanpur	Banas Kantha
Vagda	Palanpur	Banas Kantha
Jagana	Palanpur	Banas Kantha
Vasna (Jagana)	Palanpur	Banas Kantha
Badarpura (Kalusana)	Palanpur	Banas Kantha
Saripada	Palanpur	Banas Kantha
Patosan	Palanpur	Banas Kantha
Salla	Palanpur	Banas Kantha
Sasam	Palanpur	Banas Kantha
Takarwada	Palanpur	Banas Kantha
Tokariya	Palanpur	Banas Kantha
Sedrasana	Palanpur	Banas Kantha
Kamalpur	Palanpur	Banas Kantha
Fatepur	Palanpur	Banas Kantha
Semodra	Palanpur	Banas Kantha
Asmapura (Gola)	Palanpur	Banas Kantha
Dhelana	Palanpur	Banas Kantha
Kharodiya	Palanpur	Banas Kantha
Jasleni	Palanpur	Banas Kantha
Badargadh	Palanpur	Banas Kantha
Jadiyali	Deesa	Banas Kantha
Sunthiya	Deesa	Banas Kantha
Chora	Deesa	Banas Kantha
Ramun	Deesa	Banas Kantha
Dhanavada	Deesa	Banas Kantha
Bural	Deesa	Banas Kantha
Kuchavada	Deesa	Banas Kantha
Viruna	Deesa	Banas Kantha
Vithodar	Deesa	Banas Kantha
Bhachalva	Deesa	Banas Kantha
Tetoda	Deesa	Banas Kantha
Ramsan	Deesa	Banas Kantha
Bhadra	Deesa	Banas Kantha
Nandla	Deesa	Banas Kantha
Ghana	Deesa	Banas Kantha
Bhakadiyal	Deesa	Banas Kantha
Kotda	Deesa	Banas Kantha
Dhunsol	Deesa	Banas Kantha
Dhroba	Deesa	Banas Kantha
Kherola	Deesa	Banas Kantha
Nagafana	Deesa	Banas Kantha
Kochasana	Deesa	Banas Kantha
Javal	Deesa	Banas Kantha
Talegadh	Deesa	Banas Kantha
Robas Nani	Deesa	Banas Kantha
Robas Moti	Deesa	Banas Kantha
Fagudra	Deesa	Banas Kantha
Agdol	Deesa	Banas Kantha
Sodapur	Deesa	Banas Kantha
Meda	Deesa	Banas Kantha
Kotha	Deesa	Banas Kantha
Ghada	Deesa	Banas Kantha
Dhanpura	Deesa	Banas Kantha
Talepura	Deesa	Banas Kantha
Thervada	Deesa	Banas Kantha
Jherda	Deesa	Banas Kantha
Pamaru	Deesa	Banas Kantha
Gugal	Deesa	Banas Kantha
Pechhdal	Deesa	Banas Kantha
Sarat	Deesa	Banas Kantha
Kamodi	Deesa	Banas Kantha
Deka	Deesa	Banas Kantha
Vasna (Kuda)	Deesa	Banas Kantha
Jasara	Deesa	Banas Kantha
Kuda	Deesa	Banas Kantha
Chekra	Deesa	Banas Kantha
Kamoda	Deesa	Banas Kantha
Devsari	Deesa	Banas Kantha
Varan	Deesa	Banas Kantha
Sherpura	Deesa	Banas Kantha
Kunvara Padar	Deesa	Banas Kantha
Kasari	Deesa	Banas Kantha
Baiwada	Deesa	Banas Kantha
Morthal Golia	Deesa	Banas Kantha
Genaji rabari Golia	Deesa	Banas Kantha
Chandaji Golia	Deesa	Banas Kantha
Bhadath	Deesa	Banas Kantha
Chatrala	Deesa	Banas Kantha
Latiya	Deesa	Banas Kantha
Vasada	Deesa	Banas Kantha
Davas	Deesa	Banas Kantha
Shamsherpura	Deesa	Banas Kantha
Yavarpura	Deesa	Banas Kantha
Zenal	Deesa	Banas Kantha
Nani	Deesa	Banas Kantha
Jhakol	Deesa	Banas Kantha
Matu	Deesa	Banas Kantha
Dodana	Deesa	Banas Kantha
Moral	Deesa	Banas Kantha
Lakhani	Deesa	Banas Kantha
Vasna (Vatam)	Deesa	Banas Kantha
Manaki	Deesa	Banas Kantha
Agthala	Deesa	Banas Kantha
Chitroda	Deesa	Banas Kantha
Katarva	Deesa	Banas Kantha
Gamdi	Deesa	Banas Kantha
Varnoda	Deesa	Banas Kantha
Laxmipura	Deesa	Banas Kantha
Dama	Deesa	Banas Kantha
Jorapura	Deesa	Banas Kantha
Akhol Nani	Deesa	Banas Kantha
Akhol Moti	Deesa	Banas Kantha
Mahadeviya	Deesa	Banas Kantha
Vadli Farm	Deesa	Banas Kantha
Ranpur Athamno Vas	Deesa	Banas Kantha
Ranpur Vachlovas	Deesa	Banas Kantha
Ranpur Ugamno Vas	Deesa	Banas Kantha
Kant	Deesa	Banas Kantha
Sherganj	Deesa	Banas Kantha
Kumpat	Deesa	Banas Kantha
Malgadh	Deesa	Banas Kantha
Dhedhal	Deesa	Banas Kantha
Rampura	Deesa	Banas Kantha
Godha	Deesa	Banas Kantha
Mota Kapra	Deesa	Banas Kantha
Nana Kapra	Deesa	Banas Kantha
Vakvada	Deesa	Banas Kantha
Dharanva	Deesa	Banas Kantha
Shergadh	Deesa	Banas Kantha
Peplu	Deesa	Banas Kantha
Taleganj	Deesa	Banas Kantha
Balodhar	Deesa	Banas Kantha
Odhava	Deesa	Banas Kantha
Dedol	Deesa	Banas Kantha
Lorvada	Deesa	Banas Kantha
Vadaval	Deesa	Banas Kantha
Juna Deesa	Deesa	Banas Kantha
Bhoyan	Deesa	Banas Kantha
Rasana Nana	Deesa	Banas Kantha
Rasana Mota	Deesa	Banas Kantha
Dhuva	Deesa	Banas Kantha
Dharpada	Deesa	Banas Kantha
Fatepura	Deesa	Banas Kantha
Vasna (Juna Deesa)	Deesa	Banas Kantha
Sanath	Deesa	Banas Kantha
Sandiya	Deesa	Banas Kantha
Sotambla	Deesa	Banas Kantha
Gharnal Nani	Deesa	Banas Kantha
Gharnal Moti	Deesa	Banas Kantha
Nesda Juna	Deesa	Banas Kantha
Nesda Nava	Deesa	Banas Kantha
Ramvas	Deesa	Banas Kantha
Paldi	Deesa	Banas Kantha
Ratanpura	Deesa	Banas Kantha
Soyla	Deesa	Banas Kantha
Bhildi	Deesa	Banas Kantha
Khentva	Deesa	Banas Kantha
Vahara	Deesa	Banas Kantha
Viruvada	Deesa	Banas Kantha
Dasanavas	Deesa	Banas Kantha
Lunpur	Deesa	Banas Kantha
Manekpura	Deesa	Banas Kantha
Khadosan	Deesa	Banas Kantha
Aseda	Deesa	Banas Kantha
Nava	Deesa	Banas Kantha
Sadarpur	Deesa	Banas Kantha
Chhatrala	Deesa	Banas Kantha
Mudetha	Deesa	Banas Kantha
Yavarganj	Deesa	Banas Kantha
Bodal	Deesa	Banas Kantha
Jhabadiya	Deesa	Banas Kantha
Bhadramali	Deesa	Banas Kantha
Dharisana	Deesa	Banas Kantha
Kanajhara	Deesa	Banas Kantha
Samau Motavas	Deesa	Banas Kantha
Saviyana	Deesa	Banas Kantha
Velavapura	Deesa	Banas Kantha
Samau Nanavas	Deesa	Banas Kantha
Lembau	Deodar	Banas Kantha
Achhavadiya	Deodar	Banas Kantha
Kuwana	Deodar	Banas Kantha
Lavana	Deodar	Banas Kantha
Chalva	Deodar	Banas Kantha
Sanav	Deodar	Banas Kantha
Daua	Deodar	Banas Kantha
Chibhda	Deodar	Banas Kantha
Makhanu	Deodar	Banas Kantha
Makdala	Deodar	Banas Kantha
Rantila	Deodar	Banas Kantha
Vajegadh	Deodar	Banas Kantha
Dera	Deodar	Banas Kantha
Jalodha	Deodar	Banas Kantha
Narana	Deodar	Banas Kantha
Vatam Nava	Deodar	Banas Kantha
Sesan Nava	Deodar	Banas Kantha
Sesan Juna	Deodar	Banas Kantha
Mojru Juna	Deodar	Banas Kantha
Paldi	Deodar	Banas Kantha
Kunvata	Deodar	Banas Kantha
Golvo	Deodar	Banas Kantha
Golvi	Deodar	Banas Kantha
Kotarwada	Deodar	Banas Kantha
Manpura Dhunsol	Deodar	Banas Kantha
Dhunsol	Deodar	Banas Kantha
Rampura	Deodar	Banas Kantha
Sardarpura (Ravel)	Deodar	Banas Kantha
Khanodar	Deodar	Banas Kantha
Mojru Nava	Deodar	Banas Kantha
Vatam Juna	Deodar	Banas Kantha
Manpura Jalodha	Deodar	Banas Kantha
Navapura	Deodar	Banas Kantha
Forna	Deodar	Banas Kantha
Kotda Forna	Deodar	Banas Kantha
Duchakwada	Deodar	Banas Kantha
Bhagwanpura	Deodar	Banas Kantha
Ravel	Deodar	Banas Kantha
Nokha	Deodar	Banas Kantha
Vadiya	Deodar	Banas Kantha
Dhrandvada	Deodar	Banas Kantha
Bhesana	Deodar	Banas Kantha
Jada	Deodar	Banas Kantha
Chamanpura	Deodar	Banas Kantha
Chagwada	Deodar	Banas Kantha
Liladhar	Deodar	Banas Kantha
Gangol	Deodar	Banas Kantha
Soni	Deodar	Banas Kantha
Jasali	Deodar	Banas Kantha
Sardarpura (Jasali)	Deodar	Banas Kantha
Kunvarva	Deodar	Banas Kantha
Odha	Deodar	Banas Kantha
Dhanakwada	Deodar	Banas Kantha
Delwada	Deodar	Banas Kantha
Kotda Deodar	Deodar	Banas Kantha
Ludara	Deodar	Banas Kantha
Samla Vadana	Deodar	Banas Kantha
Dhrandav	Deodar	Banas Kantha
Bhadkasar	Deodar	Banas Kantha
Ogadpura	Deodar	Banas Kantha
Mesra	Deodar	Banas Kantha
Goda	Deodar	Banas Kantha
Vakha	Deodar	Banas Kantha
Boda	Deodar	Banas Kantha
Sanadar	Deodar	Banas Kantha
Salpura	Deodar	Banas Kantha
Raiya	Deodar	Banas Kantha
Nava	Deodar	Banas Kantha
Surana	Deodar	Banas Kantha
Mulakpur	Deodar	Banas Kantha
Vajapur Juna	Bhabhar	Banas Kantha
Vajapur Nava	Bhabhar	Banas Kantha
Sanesda	Bhabhar	Banas Kantha
Mera	Bhabhar	Banas Kantha
Devkapdi	Bhabhar	Banas Kantha
Harkudiya	Bhabhar	Banas Kantha
Radakiya	Bhabhar	Banas Kantha
Balodhan	Bhabhar	Banas Kantha
Khari Paldi	Bhabhar	Banas Kantha
Asana	Bhabhar	Banas Kantha
Kuvala	Bhabhar	Banas Kantha
Barvala	Bhabhar	Banas Kantha
Bhem Bordi	Bhabhar	Banas Kantha
Abasana	Bhabhar	Banas Kantha
Lunsela	Bhabhar	Banas Kantha
Suthar Nesdi	Bhabhar	Banas Kantha
Tetarva	Bhabhar	Banas Kantha
Chatara	Bhabhar	Banas Kantha
Mespura	Bhabhar	Banas Kantha
Chaladara	Bhabhar	Banas Kantha
Chembuva	Bhabhar	Banas Kantha
Nesda	Bhabhar	Banas Kantha
Bhodaliya	Bhabhar	Banas Kantha
Mitha	Bhabhar	Banas Kantha
Khara	Bhabhar	Banas Kantha
Karela	Bhabhar	Banas Kantha
Vadana	Bhabhar	Banas Kantha
Abala	Bhabhar	Banas Kantha
Runi	Bhabhar	Banas Kantha
Sanva	Bhabhar	Banas Kantha
Moti Sari	Bhabhar	Banas Kantha
Khadosan	Bhabhar	Banas Kantha
Jasanwada	Bhabhar	Banas Kantha
Undai	Bhabhar	Banas Kantha
Kaprupur	Bhabhar	Banas Kantha
Beda	Bhabhar	Banas Kantha
Tanvad	Bhabhar	Banas Kantha
Jorvada	Bhabhar	Banas Kantha
Indarva Juna	Bhabhar	Banas Kantha
Indarva Nava	Bhabhar	Banas Kantha
Vadpag	Bhabhar	Banas Kantha
Vavdi	Bhabhar	Banas Kantha
Manpura Bhabhar	Bhabhar	Banas Kantha
Gangun	Bhabhar	Banas Kantha
Ujjanwada	Bhabhar	Banas Kantha
Buretha	Bhabhar	Banas Kantha
Chachasana	Bhabhar	Banas Kantha
Chichodara	Bhabhar	Banas Kantha
Dhenkwadi	Bhabhar	Banas Kantha
Gosan	Bhabhar	Banas Kantha
Roita	Bhabhar	Banas Kantha
Nanota	Kankrej	Banas Kantha
Khoda	Kankrej	Banas Kantha
Khodla	Kankrej	Banas Kantha
Arniwada	Kankrej	Banas Kantha
Bukoli	Kankrej	Banas Kantha
Samanva	Kankrej	Banas Kantha
Khimana(Palodar Na Vas)	Kankrej	Banas Kantha
Raviyana	Kankrej	Banas Kantha
Zalmor	Kankrej	Banas Kantha
Chimangadh	Kankrej	Banas Kantha
Ratangadh	Kankrej	Banas Kantha
Chekhala	Kankrej	Banas Kantha
Ucharpi	Kankrej	Banas Kantha
Jamana Padar	Kankrej	Banas Kantha
Raner	Kankrej	Banas Kantha
Umbri	Kankrej	Banas Kantha
Arduvada	Kankrej	Banas Kantha
Ranawada (Jagiri)	Kankrej	Banas Kantha
Ratanpura (Shihori)	Kankrej	Banas Kantha
Kunvarava	Kankrej	Banas Kantha
Padardi	Kankrej	Banas Kantha
Nekoi	Kankrej	Banas Kantha
Katediya	Kankrej	Banas Kantha
Gothada	Kankrej	Banas Kantha
Isarva	Kankrej	Banas Kantha
Tervada	Kankrej	Banas Kantha
Nasaratpura	Kankrej	Banas Kantha
Fatepura	Kankrej	Banas Kantha
Kashipura	Kankrej	Banas Kantha
Kudva	Kankrej	Banas Kantha
Nathpura	Kankrej	Banas Kantha
Kantheriya	Kankrej	Banas Kantha
Rajpur	Kankrej	Banas Kantha
Vibhanesda	Kankrej	Banas Kantha
Devdarbar	Kankrej	Banas Kantha
Chembla	Kankrej	Banas Kantha
Kakar	Kankrej	Banas Kantha
Khasa	Kankrej	Banas Kantha
Akoli Thakorvas	Kankrej	Banas Kantha
Akoli Maharajvas	Kankrej	Banas Kantha
Amblivas	Kankrej	Banas Kantha
Shihori	Kankrej	Banas Kantha
Kamboi	Kankrej	Banas Kantha
Manpur (Shihori)	Kankrej	Banas Kantha
Dugrasan	Kankrej	Banas Kantha
Indramana	Kankrej	Banas Kantha
Maidkol	Kankrej	Banas Kantha
Adhgam	Kankrej	Banas Kantha
Changa	Kankrej	Banas Kantha
Shirwada	Kankrej	Banas Kantha
Ruvel	Kankrej	Banas Kantha
Varasada	Kankrej	Banas Kantha
Mandala	Kankrej	Banas Kantha
Jakhel	Kankrej	Banas Kantha
Jotada	Kankrej	Banas Kantha
Nekariya	Kankrej	Banas Kantha
Ranakpur	Kankrej	Banas Kantha
Bhavnagar	Kankrej	Banas Kantha
Vada	Kankrej	Banas Kantha
Balochpura	Kankrej	Banas Kantha
Mangalpura Nagot	Kankrej	Banas Kantha
Nagot	Kankrej	Banas Kantha
Dudasan	Kankrej	Banas Kantha
Laxmipura	Kankrej	Banas Kantha
Jaliya	Kankrej	Banas Kantha
Fategadh	Kankrej	Banas Kantha
Kasalpura	Kankrej	Banas Kantha
Ruppura	Kankrej	Banas Kantha
Tana	Kankrej	Banas Kantha
Nana Jampur	Kankrej	Banas Kantha
Khariya	Kankrej	Banas Kantha
Runi	Kankrej	Banas Kantha
Bhalgam	Kankrej	Banas Kantha
Padar	Kankrej	Banas Kantha
Tatiyana	Kankrej	Banas Kantha
Savpura	Kankrej	Banas Kantha
Karsanpura	Kankrej	Banas Kantha
Khengarpura	Kankrej	Banas Kantha
Nava	Kankrej	Banas Kantha
Amblun	Kankrej	Banas Kantha
Thali	Kankrej	Banas Kantha
Anganwada	Kankrej	Banas Kantha
Amarnesda	Kankrej	Banas Kantha
Ranawada (Khalsa)	Kankrej	Banas Kantha
Mota Jampur	Kankrej	Banas Kantha
Anandpura	Kankrej	Banas Kantha
Shiya	Kankrej	Banas Kantha
Un	Kankrej	Banas Kantha
Ratanpura (Un)	Kankrej	Banas Kantha
Manpura (Un)	Kankrej	Banas Kantha
Valpura	Kankrej	Banas Kantha
Bhadrevadi	Kankrej	Banas Kantha
Odha	Kankrej	Banas Kantha
Kasara	Kankrej	Banas Kantha
Gunthawada(Dalpatpura)	Kankrej	Banas Kantha
Dhanera	Kankrej	Banas Kantha
Devpura	Kankrej	Banas Kantha
Vithlod	Kankrej	Banas Kantha
Totana	Kankrej	Banas Kantha
Sohanpura	Kankrej	Banas Kantha
Sudrosan	Kankrej	Banas Kantha
Eval	Santalpur	Patan
Charanka	Santalpur	Patan
Fangli	Santalpur	Patan
Zazam	Santalpur	Patan
Varanosari	Santalpur	Patan
Vavdi	Santalpur	Patan
Kilana	Santalpur	Patan
Kesargadh	Santalpur	Patan
Boruda	Santalpur	Patan
Charanda	Santalpur	Patan
Dhrandva	Santalpur	Patan
Ganjisar	Santalpur	Patan
Daisar	Santalpur	Patan
Lodra	Santalpur	Patan
Zandala	Santalpur	Patan
Gadha	Santalpur	Patan
Rampura	Santalpur	Patan
Korda	Santalpur	Patan
Jamvada	Santalpur	Patan
Patanka	Santalpur	Patan
Aluvas	Santalpur	Patan
Dhokavada	Santalpur	Patan
Jakhotra	Santalpur	Patan
Vauva	Santalpur	Patan
Barara	Santalpur	Patan
Bakutra	Santalpur	Patan
Bavarda	Santalpur	Patan
Babra	Santalpur	Patan
Sidhada	Santalpur	Patan
Daldi	Santalpur	Patan
Dabhi	Santalpur	Patan
Unrot	Santalpur	Patan
Jarusha	Santalpur	Patan
Zekada	Santalpur	Patan
Zanzansar	Santalpur	Patan
Koliwada	Santalpur	Patan
Joravargadh	Santalpur	Patan
Fulpura	Santalpur	Patan
Sherpura	Santalpur	Patan
Manpura	Santalpur	Patan
Bamroli	Santalpur	Patan
Daigamda	Santalpur	Patan
Par	Santalpur	Patan
Kalyanpura	Santalpur	Patan
Ranmalpura	Santalpur	Patan
Datrana	Santalpur	Patan
Madhutra	Santalpur	Patan
Rozu	Santalpur	Patan
Garambdi	Santalpur	Patan
Santalpur	Santalpur	Patan
Rajusara	Santalpur	Patan
Chhansara	Santalpur	Patan
Parsund	Santalpur	Patan
Vaghpura	Santalpur	Patan
Naliya	Santalpur	Patan
Kamalpura	Santalpur	Patan
Lakhapura	Santalpur	Patan
Varahi	Santalpur	Patan
Sadpura	Santalpur	Patan
Navagam	Santalpur	Patan
Vandhiya	Santalpur	Patan
Undargadha	Santalpur	Patan
Hamirpura	Santalpur	Patan
Limgamda	Santalpur	Patan
Gokhantar	Santalpur	Patan
Unadi	Santalpur	Patan
Lunichana	Santalpur	Patan
Antarnes	Santalpur	Patan
Piparala	Santalpur	Patan
Abiyana	Santalpur	Patan
Chadiyana	Santalpur	Patan
Gadsai	Santalpur	Patan
Amrapur	Santalpur	Patan
Lotiya	Radhanpur	Patan
Thikariya	Radhanpur	Patan
Panvi	Radhanpur	Patan
Chalwada	Radhanpur	Patan
Dev	Radhanpur	Patan
Sultanpura	Radhanpur	Patan
Subapura	Radhanpur	Patan
Arjansar	Radhanpur	Patan
Alhabad	Radhanpur	Patan
Bandhwad	Radhanpur	Patan
Surka	Radhanpur	Patan
Javantri	Radhanpur	Patan
Limbadka	Radhanpur	Patan
Santhli	Radhanpur	Patan
Rangapura	Radhanpur	Patan
Bhilot	Radhanpur	Patan
Memdavad	Radhanpur	Patan
Kolhapur	Radhanpur	Patan
Sherganj	Radhanpur	Patan
Porana	Radhanpur	Patan
Vijaynagar	Radhanpur	Patan
Vadnagar	Radhanpur	Patan
Jetalpura	Radhanpur	Patan
Bhadiya	Radhanpur	Patan
Sinad	Radhanpur	Patan
Sardarpura	Radhanpur	Patan
Radhanpur (Rural) (Premnagar)	Radhanpur	Patan
Kalyanpura	Radhanpur	Patan
Nayatwada	Radhanpur	Patan
Moti Pipli	Radhanpur	Patan
Nani Pipli	Radhanpur	Patan
Sarkarpura	Radhanpur	Patan
Satun	Radhanpur	Patan
Amirpura	Radhanpur	Patan
Shahpur	Radhanpur	Patan
Nanapura	Radhanpur	Patan
Dharavadi	Radhanpur	Patan
Kamalpur (Dharavadi)	Radhanpur	Patan
Badarpura	Radhanpur	Patan
Maghapura	Radhanpur	Patan
Masali	Radhanpur	Patan
Sabdalpura	Radhanpur	Patan
Shergadh	Radhanpur	Patan
Najupura	Radhanpur	Patan
Kamalpur (Satun)	Radhanpur	Patan
Delana	Radhanpur	Patan
Gulabpura	Radhanpur	Patan
Chhaniathal	Radhanpur	Patan
Gotarka	Radhanpur	Patan
Dehgam	Radhanpur	Patan
Agichana	Radhanpur	Patan
Joravarganj	Radhanpur	Patan
Karsangadh	Radhanpur	Patan
Bismillaganj	Radhanpur	Patan
Pedashpura	Radhanpur	Patan
Dholakda	Radhanpur	Patan
Dhumad	Sidhpur	Patan
Mudvada	Sidhpur	Patan
Methan	Sidhpur	Patan
Dindrol	Sidhpur	Patan
Mamvada	Sidhpur	Patan
Dungariyasan	Sidhpur	Patan
Jafaripura	Sidhpur	Patan
Sahesa	Sidhpur	Patan
Vaghrol	Sidhpur	Patan
Pachakvada	Sidhpur	Patan
Kaleda	Sidhpur	Patan
Dashavada	Sidhpur	Patan
Dhanavada	Sidhpur	Patan
Lavara	Sidhpur	Patan
Kunvara	Sidhpur	Patan
Metrana	Sidhpur	Patan
Rasulpur	Sidhpur	Patan
Khadiyasana	Sidhpur	Patan
Sedrana	Sidhpur	Patan
Lukhasan	Sidhpur	Patan
Meloj	Sidhpur	Patan
Kot	Sidhpur	Patan
Ankvi	Sidhpur	Patan
Sujanpur	Sidhpur	Patan
Ganglasan	Sidhpur	Patan
Umru	Sidhpur	Patan
Vadhana	Sidhpur	Patan
Varsila	Sidhpur	Patan
Kalyana	Sidhpur	Patan
Nindroda	Sidhpur	Patan
Sevalni	Sidhpur	Patan
Nandotri	Sidhpur	Patan
Thakrasan	Sidhpur	Patan
Tavadia	Sidhpur	Patan
Ganeshpura	Sidhpur	Patan
Mudana	Sidhpur	Patan
Sandesari	Sidhpur	Patan
Nagvasan	Sidhpur	Patan
Ganvada	Sidhpur	Patan
Samoda	Sidhpur	Patan
Chatavada	Sidhpur	Patan
Lalpur	Sidhpur	Patan
Dethli	Sidhpur	Patan
Chandansar	Sidhpur	Patan
Hisor	Sidhpur	Patan
Vanasan	Sidhpur	Patan
Punasan	Sidhpur	Patan
Karan	Sidhpur	Patan
Chandravati	Sidhpur	Patan
Nedra	Sidhpur	Patan
Kanesara	Sidhpur	Patan
Khali	Sidhpur	Patan
Biliya	Sidhpur	Patan
Ajuja	Patan	Patan
Muna	Patan	Patan
Khareda	Patan	Patan
Untvada	Patan	Patan
Amarpura	Patan	Patan
Vahana	Patan	Patan
Bhatsan	Patan	Patan
Koita	Patan	Patan
Raviyana	Patan	Patan
Khodana	Patan	Patan
Katrasamal	Patan	Patan
Mesar	Patan	Patan
Haidarpura	Patan	Patan
Delvada	Patan	Patan
Ganeshpura	Patan	Patan
Abalouva	Patan	Patan
Jangral	Patan	Patan
Vasni	Patan	Patan
Jakha	Patan	Patan
Lakshmipura	Patan	Patan
Endla	Patan	Patan
Kanosan	Patan	Patan
Melusan	Patan	Patan
Morpa	Patan	Patan
Vagdod	Patan	Patan
Vachhalva	Patan	Patan
Lakhdap	Patan	Patan
Bhilvan	Patan	Patan
Renchavi	Patan	Patan
Vadhi	Patan	Patan
Golivada	Patan	Patan
Volavi	Patan	Patan
Jamtha	Patan	Patan
Kansa	Patan	Patan
Bhutiya Vasna	Patan	Patan
Charup	Patan	Patan
Vadu	Patan	Patan
Siyol	Patan	Patan
Vamaiya	Patan	Patan
Deliyathara	Patan	Patan
Vayad	Patan	Patan
Ghacheli	Patan	Patan
Dharusan	Patan	Patan
Dhanasara	Patan	Patan
Rakhav	Patan	Patan
Kalodhi	Patan	Patan
Vadiya	Patan	Patan
Lodhi	Patan	Patan
Sotavad	Patan	Patan
Sampra	Patan	Patan
Undra	Patan	Patan
Sariyad	Patan	Patan
Veloda (Nana-Mota)	Patan	Patan
Nayta	Patan	Patan
Balva	Patan	Patan
Vaghasar	Patan	Patan
Bepadar	Patan	Patan
Khanpurda	Patan	Patan
Vareda	Patan	Patan
Odhva	Patan	Patan
Khalipur	Patan	Patan
Rughnathpura	Patan	Patan
Nava Bavahaji	Patan	Patan
Sujnipur	Patan	Patan
Tankvasna	Patan	Patan
Aghar	Patan	Patan
Kimbuva	Patan	Patan
Gulvasna	Patan	Patan
Kotavad	Patan	Patan
Sanodarda	Patan	Patan
Lodhpur	Patan	Patan
Kuntavada	Patan	Patan
Ajimana	Patan	Patan
Sagodiya	Patan	Patan
Jaleshvar Paldi	Patan	Patan
Samalpati	Patan	Patan
Matarvadi (Part)	Patan	Patan
Anavada	Patan	Patan
Hanumanpura	Patan	Patan
Dudharampura	Patan	Patan
Dharnoj	Patan	Patan
Bhadrada	Patan	Patan
Fulesana	Patan	Patan
Badipur	Patan	Patan
Vadli	Patan	Patan
Bakratpur	Patan	Patan
Gungdipati (Part)	Patan	Patan
Hansapur (Part)	Patan	Patan
Runi	Patan	Patan
Hajipur	Patan	Patan
Kamlivada	Patan	Patan
Diodarda	Patan	Patan
Der	Patan	Patan
Chadasana	Patan	Patan
Nana Ramanda	Patan	Patan
Mota Ramanda	Patan	Patan
Santi	Patan	Patan
Dharpur	Patan	Patan
Dighdi	Patan	Patan
Ambliyasan	Patan	Patan
Khanpur Kodi	Patan	Patan
Mandotri	Patan	Patan
Borsan	Patan	Patan
Golapur	Patan	Patan
Sandesarpati	Patan	Patan
Kharivavdi	Patan	Patan
Manpur	Patan	Patan
Khanpur Rajkuva	Patan	Patan
Chandrumana	Patan	Patan
Bhalgam	Patan	Patan
Kungher	Patan	Patan
Ilampur	Patan	Patan
Sabosan	Patan	Patan
Katpur	Patan	Patan
Rajpur	Patan	Patan
Gadosan	Patan	Patan
Gaja	Patan	Patan
Norta Talpad	Patan	Patan
Norta Vanta	Patan	Patan
Sarva	Patan	Patan
Kuder	Patan	Patan
Balisana	Patan	Patan
Derasana	Patan	Patan
Kani	Patan	Patan
Visal-Vasna	Patan	Patan
Babasana	Patan	Patan
Samoda	Patan	Patan
Hamidpur	Patan	Patan
Mahemadpur	Patan	Patan
Mithivavdi	Patan	Patan
Khimiyana	Patan	Patan
Sankhari	Patan	Patan
Sardarpur Norta (Ambapara)	Patan	Patan
Ranunj	Patan	Patan
Sander	Patan	Patan
Matpur	Patan	Patan
Ruvavi	Patan	Patan
Dabhdi	Patan	Patan
Manund	Patan	Patan
Khakhal	Harij	Patan
Jasvantpura	Harij	Patan
Rughnathpura	Harij	Patan
Roda	Harij	Patan
Masa	Harij	Patan
Dunavada	Harij	Patan
Sankra	Harij	Patan
Vansa	Harij	Patan
Vejavada	Harij	Patan
Katara	Harij	Patan
Kumbhana	Harij	Patan
Kathi	Harij	Patan
Nana	Harij	Patan
Sarer	Harij	Patan
Bhalana	Harij	Patan
Malsund	Harij	Patan
Piplana	Harij	Patan
Manka (Juna-Nava)	Harij	Patan
Tharod	Harij	Patan
Ekalva	Harij	Patan
Savasda	Harij	Patan
Chabkha	Harij	Patan
Sarval	Harij	Patan
Khakhdi	Harij	Patan
Boratvada	Harij	Patan
Ravindra	Harij	Patan
Kureja	Harij	Patan
Tornipur	Harij	Patan
Adiya	Harij	Patan
Piluvada	Harij	Patan
Kalana	Harij	Patan
Jamanpur	Harij	Patan
Dantarvada	Harij	Patan
Jaska	Harij	Patan
Jasomav	Harij	Patan
Sodhav	Harij	Patan
Govna	Harij	Patan
Tamboliya	Harij	Patan
Paloli	Harij	Patan
Dadar	Sami	Patan
Dhadhana	Sami	Patan
Sherpura	Sami	Patan
Ranavada	Sami	Patan
Kharchariya	Sami	Patan
Gochnad	Sami	Patan
Bismillabad	Sami	Patan
Babri	Sami	Patan
Chandarni	Sami	Patan
Rampura	Sami	Patan
Jakhel	Sami	Patan
Godhana	Sami	Patan
Daudpur	Sami	Patan
Mandvi	Sami	Patan
Bhamathal	Sami	Patan
Mubarakpura	Sami	Patan
Sajupura	Sami	Patan
Nana Joravarpura	Sami	Patan
Matrota	Sami	Patan
Mota Joravarpura	Sami	Patan
Varana	Sami	Patan
Mahmadpura	Sami	Patan
Baspa	Sami	Patan
Kanij	Sami	Patan
Dadka	Sami	Patan
Umedpura	Sami	Patan
Lalpur	Sami	Patan
Adgam	Sami	Patan
Vahedpur	Sami	Patan
Sukhpura	Sami	Patan
Ved	Sami	Patan
Rupnagar	Sami	Patan
Bhadrada	Sami	Patan
Gajdinpura	Sami	Patan
Samsherpura	Sami	Patan
Sonar	Sami	Patan
Vaval	Sami	Patan
Jalalabad	Sami	Patan
Gujarvada	Sami	Patan
Jhilvana	Sami	Patan
Kathivada	Sami	Patan
Tarora	Sami	Patan
Sami	Sami	Patan
Nayka	Sami	Patan
Kokta	Sami	Patan
Upaliyasara	Sami	Patan
Vaghpura	Sami	Patan
Rafu	Sami	Patan
Badarganj	Sami	Patan
Koddha	Sami	Patan
Anvarpura	Sami	Patan
Nani Chandur	Sami	Patan
Dudkha	Sami	Patan
Memna	Sami	Patan
Moti Chandur	Sami	Patan
Kathi	Sami	Patan
Ravad	Sami	Patan
Palipur	Sami	Patan
Kukrana	Sami	Patan
Vaghel	Sami	Patan
Aritha	Sami	Patan
Buda	Sami	Patan
Rasulpura	Sami	Patan
Vagosan	Sami	Patan
Orumana	Sami	Patan
Mujpur	Sami	Patan
Loteshvar	Sami	Patan
Islampura	Sami	Patan
Jesda	Sami	Patan
Khijadiyari	Sami	Patan
Lolada	Sami	Patan
Sipur	Sami	Patan
Kunvar	Sami	Patan
Subapura	Sami	Patan
Taranagar	Sami	Patan
Rajpura	Sami	Patan
Pirojpura	Sami	Patan
Fattehganj	Sami	Patan
Mardanganj	Sami	Patan
Kanchanpura	Sami	Patan
Khandiya	Sami	Patan
Shankheshvar	Sami	Patan
Runi	Sami	Patan
Ranod	Sami	Patan
Kuvarad	Sami	Patan
Manvarpura	Sami	Patan
Biliya	Sami	Patan
Tuvad	Sami	Patan
Fatehpura	Sami	Patan
Dhanora	Sami	Patan
Dantisana	Sami	Patan
Mankodiya	Sami	Patan
Padla	Sami	Patan
Ratanpura	Sami	Patan
Bolera	Sami	Patan
Jahurpura	Sami	Patan
Murtujanagar	Sami	Patan
Panchasar	Sami	Patan
Sevala	Chanasma	Patan
Galolivasna	Chanasma	Patan
Ruppur	Chanasma	Patan
Sardarpura	Chanasma	Patan
Jakhana	Chanasma	Patan
Sojitra	Chanasma	Patan
Islampura	Chanasma	Patan
Finchal	Chanasma	Patan
Vasai	Chanasma	Patan
Ganget	Chanasma	Patan
Jitoda	Chanasma	Patan
Sendha	Chanasma	Patan
Khari Dhariyal	Chanasma	Patan
Sendhal	Chanasma	Patan
Jasalpur	Chanasma	Patan
Dhanodharda	Chanasma	Patan
Kesni	Chanasma	Patan
Sarsav	Chanasma	Patan
Vasaipura	Chanasma	Patan
Selavi	Chanasma	Patan
Pindharpura	Chanasma	Patan
Dantkarodi	Chanasma	Patan
Pimpal	Chanasma	Patan
Jhiliya	Chanasma	Patan
Jhiliya Vasana	Chanasma	Patan
Mandlop	Chanasma	Patan
Dharmoda	Chanasma	Patan
Naranpura	Chanasma	Patan
Kamboi	Chanasma	Patan
Gokharva	Chanasma	Patan
Khorsam	Chanasma	Patan
Brahmanvada	Chanasma	Patan
Ranasan	Chanasma	Patan
Rampura	Chanasma	Patan
Khara Dharva	Chanasma	Patan
Lanva	Chanasma	Patan
Multhaniya	Chanasma	Patan
Palasar	Chanasma	Patan
Dhinoj	Chanasma	Patan
Danodarda	Chanasma	Patan
Mithadharva	Chanasma	Patan
Chaveli	Chanasma	Patan
Bhatvasana	Chanasma	Patan
Bhatsar	Chanasma	Patan
Itoda	Chanasma	Patan
Delmal	Chanasma	Patan
Maniyari	Chanasma	Patan
Mithi Dhariyal	Chanasma	Patan
Khokhla	Chanasma	Patan
Takodi	Chanasma	Patan
Mervada	Chanasma	Patan
Sunsar	Chanasma	Patan
Kamalpur	Chanasma	Patan
Karoda	Chanasma	Patan
Vadavli	Chanasma	Patan
Dharpuri	Chanasma	Patan
Panchasar	Chanasma	Patan
Mesra	Chanasma	Patan
Chhamichha	Chanasma	Patan
Chelana	Satlasana	Mahesana
Talegadh	Satlasana	Mahesana
Khari	Satlasana	Mahesana
Nedardi	Satlasana	Mahesana
Vajapur	Satlasana	Mahesana
Mumanvas	Satlasana	Mahesana
Bhanavas	Satlasana	Mahesana
Kubada	Satlasana	Mahesana
Vansada	Satlasana	Mahesana
Semor	Satlasana	Mahesana
Umari	Satlasana	Mahesana
Takhatpura	Satlasana	Mahesana
Jashpuriya	Satlasana	Mahesana
Ranpur	Satlasana	Mahesana
Vasai	Satlasana	Mahesana
Dulana	Satlasana	Mahesana
Sardarpur (Cheekna)	Satlasana	Mahesana
Sudasana	Satlasana	Mahesana
Bhalu Moti	Satlasana	Mahesana
Bhalu Nani	Satlasana	Mahesana
Bedasma	Satlasana	Mahesana
Samarapur	Satlasana	Mahesana
Rabarivas	Satlasana	Mahesana
Dhadhivas	Satlasana	Mahesana
Gamanpur	Satlasana	Mahesana
Santola	Satlasana	Mahesana
Gothda	Satlasana	Mahesana
Ajabapur(Jivak)	Satlasana	Mahesana
Kothasana Mota	Satlasana	Mahesana
Kothasana Nana	Satlasana	Mahesana
Sheshhapur	Satlasana	Mahesana
Bhalusana	Satlasana	Mahesana
Umrecha	Satlasana	Mahesana
Bhatvas	Satlasana	Mahesana
Rinchhada	Satlasana	Mahesana
Kesarpura	Satlasana	Mahesana
Nijhampur	Satlasana	Mahesana
Jaspur	Satlasana	Mahesana
Khilod	Satlasana	Mahesana
Isakpura	Satlasana	Mahesana
Ankaliyara	Satlasana	Mahesana
Himmatpura	Satlasana	Mahesana
Bhimpur	Satlasana	Mahesana
Navavas	Satlasana	Mahesana
Sartanpur (Gadh)	Satlasana	Mahesana
Satlasana	Satlasana	Mahesana
Vaghva-Mandva	Satlasana	Mahesana
Malana	Satlasana	Mahesana
Dharoi	Satlasana	Mahesana
Vav	Satlasana	Mahesana
Rajpur(Gadh)	Satlasana	Mahesana
Timba	Satlasana	Mahesana
Shahupura (Gadh)	Satlasana	Mahesana
Pirojpura	Satlasana	Mahesana
Vaghar	Satlasana	Mahesana
Anand Bhankhari	Satlasana	Mahesana
Sadrasan	Satlasana	Mahesana
Khodamali	Satlasana	Mahesana
Vavadi (Gadh)	Satlasana	Mahesana
Vadnal	Satlasana	Mahesana
Fatepura	Satlasana	Mahesana
Hadol	Satlasana	Mahesana
Radhupura	Satlasana	Mahesana
Galalpur	Satlasana	Mahesana
Kajipur	Satlasana	Mahesana
Otalpur	Satlasana	Mahesana
Rangpur (Gadh)	Satlasana	Mahesana
Kanediya	Satlasana	Mahesana
Dharavania	Satlasana	Mahesana
Gamanpura	Satlasana	Mahesana
Chhelpura	Satlasana	Mahesana
Kevdasan	Satlasana	Mahesana
Malapura	Satlasana	Mahesana
Chansol	Kheralu	Mahesana
Dabhad	Kheralu	Mahesana
Davol	Kheralu	Mahesana
Varetha	Kheralu	Mahesana
Dalisana	Kheralu	Mahesana
Mahiyal	Kheralu	Mahesana
Sakari	Kheralu	Mahesana
Fattepura(Khe)	Kheralu	Mahesana
Vithoda	Kheralu	Mahesana
Vavdi (khe)	Kheralu	Mahesana
Lunva	Kheralu	Mahesana
Mandali	Kheralu	Mahesana
Panchha	Kheralu	Mahesana
Balad	Kheralu	Mahesana
Shahpur (Santokpura)	Kheralu	Mahesana
Mandropur	Kheralu	Mahesana
Nandali (Miyasana)	Kheralu	Mahesana
Arathi	Kheralu	Mahesana
Mahekubpura	Kheralu	Mahesana
Dabhoda	Kheralu	Mahesana
Kuda	Kheralu	Mahesana
Nalu	Kheralu	Mahesana
Chotiya	Kheralu	Mahesana
Lalawada	Kheralu	Mahesana
Nanivada	Kheralu	Mahesana
Gajipur	Kheralu	Mahesana
Suvariya	Kheralu	Mahesana
Malekpur (Khe)	Kheralu	Mahesana
Nani Hirvani	Kheralu	Mahesana
Moti Hirvani	Kheralu	Mahesana
Machhava	Kheralu	Mahesana
Nortol	Kheralu	Mahesana
Chachariya	Kheralu	Mahesana
Thangana	Kheralu	Mahesana
Gathaman	Kheralu	Mahesana
Malarpura	Kheralu	Mahesana
Delvada	Kheralu	Mahesana
Rahemanpura	Kheralu	Mahesana
Sangathala	Kheralu	Mahesana
Chada	Kheralu	Mahesana
Dedasan	Kheralu	Mahesana
Amarpura	Kheralu	Mahesana
Vaghvadi	Kheralu	Mahesana
Gorisana	Kheralu	Mahesana
Ambavada	Kheralu	Mahesana
Samoja	Kheralu	Mahesana
Rasulpur	Kheralu	Mahesana
Sadikpur	Kheralu	Mahesana
Limbdi	Kheralu	Mahesana
Unad	Kheralu	Mahesana
Madhasana	Kheralu	Mahesana
Lindi	Unjha	Mahesana
Visol	Unjha	Mahesana
Varvada	Unjha	Mahesana
Brahmanvada	Unjha	Mahesana
Kamli	Unjha	Mahesana
Jagannathpura	Unjha	Mahesana
Kahoda	Unjha	Mahesana
Khatasana	Unjha	Mahesana
Maherwada	Unjha	Mahesana
Lihoda	Unjha	Mahesana
Bhunav	Unjha	Mahesana
Dasaj	Unjha	Mahesana
Maktupur	Unjha	Mahesana
Tundav	Unjha	Mahesana
Amudh	Unjha	Mahesana
Sunak	Unjha	Mahesana
Dabhi	Unjha	Mahesana
Shihi	Unjha	Mahesana
Bhankhar	Unjha	Mahesana
Ranchhodpura	Unjha	Mahesana
Upera	Unjha	Mahesana
Karanpur	Unjha	Mahesana
Karli	Unjha	Mahesana
Hajipur	Unjha	Mahesana
Vanagla	Unjha	Mahesana
Aithor	Unjha	Mahesana
Unava	Unjha	Mahesana
Surpura	Unjha	Mahesana
Pali	Unjha	Mahesana
Navapura	Unjha	Mahesana
Kanthravi	Unjha	Mahesana
Tarabh	Visnagar	Mahesana
Denap	Visnagar	Mahesana
Umta	Visnagar	Mahesana
Rangpur (Khe)	Visnagar	Mahesana
Kiyadar	Visnagar	Mahesana
Hasanpur	Visnagar	Mahesana
Paldi	Visnagar	Mahesana
Chhogala	Visnagar	Mahesana
Khadalpur	Visnagar	Mahesana
Mahamadpur	Visnagar	Mahesana
Kajialiyasana	Visnagar	Mahesana
Khandosan	Visnagar	Mahesana
Jetalvasana	Visnagar	Mahesana
Bokarvada	Visnagar	Mahesana
Bhandu	Visnagar	Mahesana
Vadu	Visnagar	Mahesana
Satusana	Visnagar	Mahesana
Valam	Visnagar	Mahesana
Iyasara	Visnagar	Mahesana
Rampura	Visnagar	Mahesana
Rajgadh	Visnagar	Mahesana
Thalota	Visnagar	Mahesana
Gunja	Visnagar	Mahesana
Ralisana	Visnagar	Mahesana
Sunshi	Visnagar	Mahesana
Kansa (Part)	Visnagar	Mahesana
Pudgam	Visnagar	Mahesana
Randala	Visnagar	Mahesana
Kansarakui	Visnagar	Mahesana
Ravalapura	Visnagar	Mahesana
Savala	Visnagar	Mahesana
Saduthala	Visnagar	Mahesana
Visnagar (Rural)	Visnagar	Mahesana
Ghaghret	Visnagar	Mahesana
Kuvasana	Visnagar	Mahesana
Bhalak	Visnagar	Mahesana
Laxmipura	Visnagar	Mahesana
Bakarpur	Visnagar	Mahesana
Rangakui	Visnagar	Mahesana
Gothva	Visnagar	Mahesana
Kamalpur (Gothva)	Visnagar	Mahesana
Kada	Visnagar	Mahesana
Kamana	Visnagar	Mahesana
Becharpura	Visnagar	Mahesana
Basana	Visnagar	Mahesana
Chitroda Mota	Visnagar	Mahesana
Chitrodipura	Visnagar	Mahesana
Magroda	Visnagar	Mahesana
Dadhiyal	Visnagar	Mahesana
Lachhadi	Visnagar	Mahesana
Kharvada	Visnagar	Mahesana
Thumthal	Visnagar	Mahesana
Megha Aliyasana	Visnagar	Mahesana
Gunjala	Visnagar	Mahesana
Ganpatpura	Visnagar	Mahesana
Kamalpur (Kharavada)	Visnagar	Mahesana
Udalpur	Visnagar	Mahesana
Dharusana	Visnagar	Mahesana
Dhamanva	Visnagar	Mahesana
Jaska	Vadnagar	Mahesana
Sundhiya	Vadnagar	Mahesana
Hajipur	Vadnagar	Mahesana
Shekhpur (Khe)	Vadnagar	Mahesana
Sipor	Vadnagar	Mahesana
Karshanpura	Vadnagar	Mahesana
Khatasana	Vadnagar	Mahesana
Dabu	Vadnagar	Mahesana
Aspa	Vadnagar	Mahesana
Vaktapur	Vadnagar	Mahesana
Ganeshpura	Vadnagar	Mahesana
Undani	Vadnagar	Mahesana
Khanpur	Vadnagar	Mahesana
Sarna	Vadnagar	Mahesana
Badarpur	Vadnagar	Mahesana
Molipur	Vadnagar	Mahesana
Sulipur	Vadnagar	Mahesana
Kesimpa	Vadnagar	Mahesana
Jagapura	Vadnagar	Mahesana
Bajpura	Vadnagar	Mahesana
Babipura	Vadnagar	Mahesana
Khatoda	Vadnagar	Mahesana
Champa	Vadnagar	Mahesana
Navapura	Vadnagar	Mahesana
Sultanpur	Vadnagar	Mahesana
Shahpur (Vad)	Vadnagar	Mahesana
Undhai	Vadnagar	Mahesana
Valasana	Vadnagar	Mahesana
Vaghdi (Juni)	Vadnagar	Mahesana
Vaghadi (Navi)	Vadnagar	Mahesana
Shobhasan	Vadnagar	Mahesana
Pipaldar	Vadnagar	Mahesana
Karbatiya	Vadnagar	Mahesana
Sabalpur	Vadnagar	Mahesana
Rajpur (Vad)	Vadnagar	Mahesana
Kamalpur	Vadnagar	Mahesana
Malekpur	Vadnagar	Mahesana
Chandpur	Vadnagar	Mahesana
Shekhpur (Vad)	Vadnagar	Mahesana
Kahipur	Vadnagar	Mahesana
Mirjhapur	Vadnagar	Mahesana
Chhabaliya	Vadnagar	Mahesana
Anandpura	Vadnagar	Mahesana
Transvad	Vadnagar	Mahesana
Deriya	Vijapur	Mahesana
Techava	Vijapur	Mahesana
Ransipur	Vijapur	Mahesana
Gundrasan	Vijapur	Mahesana
Bamanva	Vijapur	Mahesana
Malav	Vijapur	Mahesana
Abasana	Vijapur	Mahesana
Mandalikharod	Vijapur	Mahesana
Jantral	Vijapur	Mahesana
Kamalpur	Vijapur	Mahesana
Sardarpur	Vijapur	Mahesana
Kot	Vijapur	Mahesana
Rampur Kot	Vijapur	Mahesana
Fudeda	Vijapur	Mahesana
Pedhamali	Vijapur	Mahesana
Sundarpur	Vijapur	Mahesana
Changod	Vijapur	Mahesana
Kharod	Vijapur	Mahesana
Biliya	Vijapur	Mahesana
Morvad	Vijapur	Mahesana
Gunchhali	Vijapur	Mahesana
Tatosan	Vijapur	Mahesana
Abharampura	Vijapur	Mahesana
Ladol	Vijapur	Mahesana
Soja	Vijapur	Mahesana
Falu	Vijapur	Mahesana
Agalod	Vijapur	Mahesana
Jepur	Vijapur	Mahesana
Hathipura	Vijapur	Mahesana
Malosan	Vijapur	Mahesana
Pamol	Vijapur	Mahesana
Kelisana	Vijapur	Mahesana
Sayajinagar	Vijapur	Mahesana
Vadasan	Vijapur	Mahesana
Dagavadiya	Vijapur	Mahesana
Asoda	Vijapur	Mahesana
Manekpur Dabhala	Vijapur	Mahesana
Dabhala	Vijapur	Mahesana
Devda	Vijapur	Mahesana
Sokhada	Vijapur	Mahesana
Gerita	Vijapur	Mahesana
Ashnapur (Gerita)	Vijapur	Mahesana
Gavada	Vijapur	Mahesana
Vijapur(Rural) (Part)	Vijapur	Mahesana
Hirpura	Vijapur	Mahesana
Gadhada	Vijapur	Mahesana
Ganeshpura	Vijapur	Mahesana
Devpura	Vijapur	Mahesana
Kolavda	Vijapur	Mahesana
Ubkhal	Vijapur	Mahesana
Kukarvada	Vijapur	Mahesana
Vasai (Dabhla)	Vijapur	Mahesana
Tintodan	Vijapur	Mahesana
Motipura (Tintodan)	Vijapur	Mahesana
Pilvai	Vijapur	Mahesana
Khanusa	Vijapur	Mahesana
Kotadi	Vijapur	Mahesana
Ranchhodpura	Vijapur	Mahesana
Rampur Kuvayda	Vijapur	Mahesana
Dhanpura (Ghantu)	Vijapur	Mahesana
Bhimpur Valor	Vijapur	Mahesana
Sanghpur	Vijapur	Mahesana
Kanbha	Vijapur	Mahesana
Ranasan	Vijapur	Mahesana
Virta	Mahesana	Mahesana
Gorad	Mahesana	Mahesana
Kharsada	Mahesana	Mahesana
Davada	Mahesana	Mahesana
Rupal	Mahesana	Mahesana
Haripura	Mahesana	Mahesana
Buttapaldi	Mahesana	Mahesana
Motidau	Mahesana	Mahesana
Bamosana	Mahesana	Mahesana
Ghadha	Mahesana	Mahesana
Piludara	Mahesana	Mahesana
Nanidau	Mahesana	Mahesana
Palodar	Mahesana	Mahesana
Chhathiyarda	Mahesana	Mahesana
Aloda	Mahesana	Mahesana
Hardesan	Mahesana	Mahesana
Panchot	Mahesana	Mahesana
Ramosana	Mahesana	Mahesana
Taleti	Mahesana	Mahesana
Tavadiya	Mahesana	Mahesana
Chitrodipura	Mahesana	Mahesana
Dela	Mahesana	Mahesana
Ucharpi	Mahesana	Mahesana
Dediyasan (Part)	Mahesana	Mahesana
Gilosan	Mahesana	Mahesana
Bodla	Mahesana	Mahesana
Hinglajpura	Mahesana	Mahesana
Maguna	Mahesana	Mahesana
Nugar	Mahesana	Mahesana
Lakhavad	Mahesana	Mahesana
Devrasan	Mahesana	Mahesana
Rampura (Kukas)	Mahesana	Mahesana
Kukas	Mahesana	Mahesana
Heduva Hanumat	Mahesana	Mahesana
Palwasana (Part)	Mahesana	Mahesana
Heduva-Rajgar	Mahesana	Mahesana
Karshanpura	Mahesana	Mahesana
Devinapura	Mahesana	Mahesana
Deloli	Mahesana	Mahesana
Ijpura Barot	Mahesana	Mahesana
Palaj	Mahesana	Mahesana
Gamanpura	Mahesana	Mahesana
Mitha	Mahesana	Mahesana
Sametra	Mahesana	Mahesana
Mareda	Mahesana	Mahesana
Vadosan	Mahesana	Mahesana
Sakhpurda	Mahesana	Mahesana
Sobhasan	Mahesana	Mahesana
Hebuva	Mahesana	Mahesana
Kadvasan	Mahesana	Mahesana
Kherva	Mahesana	Mahesana
Punasan	Mahesana	Mahesana
Mevad	Mahesana	Mahesana
Boriavi	Mahesana	Mahesana
Khara	Mahesana	Mahesana
Laxmipura	Mahesana	Mahesana
Balol	Mahesana	Mahesana
Nadasa	Mahesana	Mahesana
Gokalpura	Mahesana	Mahesana
Martoli	Mahesana	Mahesana
Ajabpura	Mahesana	Mahesana
Kasalpura	Mahesana	Mahesana
Modipur	Mahesana	Mahesana
Manknaj	Mahesana	Mahesana
Bhesana	Mahesana	Mahesana
Jagudan	Mahesana	Mahesana
Sanganpur	Mahesana	Mahesana
Mulsan	Mahesana	Mahesana
Padhariya	Mahesana	Mahesana
Dhandhusan	Mahesana	Mahesana
Gojhariya	Mahesana	Mahesana
Badalpura	Mahesana	Mahesana
Meu	Mahesana	Mahesana
Balvantpura	Mahesana	Mahesana
Akhaj	Mahesana	Mahesana
Bhakadiya	Mahesana	Mahesana
Geratpur	Mahesana	Mahesana
Kochva	Mahesana	Mahesana
Ditasan	Mahesana	Mahesana
Linch	Mahesana	Mahesana
Ambasan	Mahesana	Mahesana
Ranipura	Mahesana	Mahesana
Jotana	Mahesana	Mahesana
Santhal	Mahesana	Mahesana
Katosan	Mahesana	Mahesana
Tejpura	Mahesana	Mahesana
Kanpura	Mahesana	Mahesana
Rampura (Katosan)	Mahesana	Mahesana
Virsoda	Mahesana	Mahesana
Dhanpura	Mahesana	Mahesana
Ijpura Jethaji	Mahesana	Mahesana
Memadpur	Mahesana	Mahesana
Jakasna	Mahesana	Mahesana
Sidosan	Mahesana	Mahesana
Khadalpur	Mahesana	Mahesana
Dholasan	Mahesana	Mahesana
Jetalpur	Mahesana	Mahesana
Chaluva	Mahesana	Mahesana
Langhnaj	Mahesana	Mahesana
Charadu	Mahesana	Mahesana
Saldi	Mahesana	Mahesana
Jamnapur	Mahesana	Mahesana
Jornang	Mahesana	Mahesana
Mandali	Mahesana	Mahesana
Bhasariya	Mahesana	Mahesana
Divanpura-Alias-Apapura	Mahesana	Mahesana
Harsundal	Mahesana	Mahesana
Mudarda	Mahesana	Mahesana
Tundali	Mahesana	Mahesana
Navi Sedhavi	Mahesana	Mahesana
Juni Sedhavi	Mahesana	Mahesana
Hadvi	Mahesana	Mahesana
Vadasma	Mahesana	Mahesana
Kakasna	Becharaji	Mahesana
Kanoda	Becharaji	Mahesana
Bhalgamda	Becharaji	Mahesana
Gambhu	Becharaji	Mahesana
Ajabpura	Becharaji	Mahesana
Khambhel	Becharaji	Mahesana
Ambala	Becharaji	Mahesana
Mandali	Becharaji	Mahesana
Chandroda	Becharaji	Mahesana
Surpura	Becharaji	Mahesana
Venpura	Becharaji	Mahesana
Adivada	Becharaji	Mahesana
Modhera	Becharaji	Mahesana
Vijapurda	Becharaji	Mahesana
Dedarda	Becharaji	Mahesana
Ranela	Becharaji	Mahesana
Motap	Becharaji	Mahesana
Saduthla	Becharaji	Mahesana
Udela	Becharaji	Mahesana
Jetpur	Becharaji	Mahesana
Ranchhodpura	Becharaji	Mahesana
Karansagar	Becharaji	Mahesana
Matrasan	Becharaji	Mahesana
Sujanpura	Becharaji	Mahesana
Poyda	Becharaji	Mahesana
Delvada Khant	Becharaji	Mahesana
Delpura Khant	Becharaji	Mahesana
Dodivada	Becharaji	Mahesana
Sanpavada	Becharaji	Mahesana
Suraj	Becharaji	Mahesana
Finchdi	Becharaji	Mahesana
Sankhalpur	Becharaji	Mahesana
Edala	Becharaji	Mahesana
Ganeshpura	Becharaji	Mahesana
Dharpura-Khant	Becharaji	Mahesana
Chhatasana	Becharaji	Mahesana
Dhanpura	Becharaji	Mahesana
Vanpur	Becharaji	Mahesana
Asjol	Becharaji	Mahesana
Indrap	Becharaji	Mahesana
Chadasna	Becharaji	Mahesana
Kalri	Becharaji	Mahesana
Pratapgadh	Becharaji	Mahesana
Devgadh	Becharaji	Mahesana
Ruppura Karanpura	Becharaji	Mahesana
Rantej	Becharaji	Mahesana
Dethli	Becharaji	Mahesana
Chandanki	Becharaji	Mahesana
Dedana	Becharaji	Mahesana
Bariyaf	Becharaji	Mahesana
Akba	Becharaji	Mahesana
Chalasan	Kadi	Mahesana
Dholasan	Kadi	Mahesana
Alampur	Kadi	Mahesana
Dhanali	Kadi	Mahesana
Ganeshpura	Kadi	Mahesana
Kaiyal	Kadi	Mahesana
Vadpura	Kadi	Mahesana
Tankiya	Kadi	Mahesana
Karjisan	Kadi	Mahesana
Dangarva	Kadi	Mahesana
Anandpura	Kadi	Mahesana
Nandasan	Kadi	Mahesana
Mathasur	Kadi	Mahesana
Bhatasan	Kadi	Mahesana
Suraj	Kadi	Mahesana
Moyan	Kadi	Mahesana
Dhandhalpur	Kadi	Mahesana
Chhalesra	Kadi	Mahesana
Digdi	Kadi	Mahesana
Mokasan	Kadi	Mahesana
Jasalpur	Kadi	Mahesana
Kherpur	Kadi	Mahesana
Lakshmipura (Nandasan)	Kadi	Mahesana
Chandarda	Kadi	Mahesana
Vadu	Kadi	Mahesana
Narola	Kadi	Mahesana
Ghumasan	Kadi	Mahesana
Rajpur	Kadi	Mahesana
Sarsav	Kadi	Mahesana
Aldesan	Kadi	Mahesana
Visalpur	Kadi	Mahesana
Nagarasan	Kadi	Mahesana
Deusana	Kadi	Mahesana
Jadavpura	Kadi	Mahesana
Alusna	Kadi	Mahesana
Sadra	Kadi	Mahesana
Dhoriya	Kadi	Mahesana
Haripura	Kadi	Mahesana
Naranpura	Kadi	Mahesana
Charol	Kadi	Mahesana
Babajipura	Kadi	Mahesana
Balasar	Kadi	Mahesana
Adudra	Kadi	Mahesana
Lakshmipura (Andudra)	Kadi	Mahesana
Untva	Kadi	Mahesana
Kundal (Part)	Kadi	Mahesana
Irana	Kadi	Mahesana
Jhulasan	Kadi	Mahesana
Ambavpura	Kadi	Mahesana
Chadasna	Kadi	Mahesana
Indrad	Kadi	Mahesana
Budasan	Kadi	Mahesana
Nani Kadi (Part)	Kadi	Mahesana
Narsihpura	Kadi	Mahesana
Sujatpura	Kadi	Mahesana
Thadod	Kadi	Mahesana
Visatpura	Kadi	Mahesana
Galodra	Kadi	Mahesana
Korda	Kadi	Mahesana
Sendrana	Kadi	Mahesana
Khandmorva	Kadi	Mahesana
Kasva	Kadi	Mahesana
Vidaj	Kadi	Mahesana
Dudhai	Kadi	Mahesana
Shiyapura	Kadi	Mahesana
Rangpurda	Kadi	Mahesana
Pirojpur	Kadi	Mahesana
Karannagar	Kadi	Mahesana
Ankhol	Kadi	Mahesana
Achrasan	Kadi	Mahesana
Lunasan	Kadi	Mahesana
Vansol	Kadi	Mahesana
Vamaj	Kadi	Mahesana
Fuletra	Kadi	Mahesana
Borisana	Kadi	Mahesana
Jetpura	Kadi	Mahesana
Rozapuri	Kadi	Mahesana
Daran Morva	Kadi	Mahesana
Sedardi	Kadi	Mahesana
Ghughla	Kadi	Mahesana
Maharajpura	Kadi	Mahesana
Vaghroda	Kadi	Mahesana
Bhalthi (Dharampur)	Kadi	Mahesana
Khavad	Kadi	Mahesana
Daran	Kadi	Mahesana
Lhor	Kadi	Mahesana
Manipur	Kadi	Mahesana
Karsanpura	Kadi	Mahesana
Merda	Kadi	Mahesana
Adraj	Kadi	Mahesana
Vadavi	Kadi	Mahesana
Ambliyara	Kadi	Mahesana
Lakshmanpura	Kadi	Mahesana
Kolad	Kadi	Mahesana
Nanpurasonvad	Kadi	Mahesana
Nadoliya	Kadi	Mahesana
Vekra	Kadi	Mahesana
Varkhadia	Kadi	Mahesana
Fattehpura	Kadi	Mahesana
Jamiyatpura	Kadi	Mahesana
Vinayakpura	Kadi	Mahesana
Bavlu	Kadi	Mahesana
Jhaloda	Kadi	Mahesana
Sedfa	Kadi	Mahesana
Thol	Kadi	Mahesana
Kanjari	Kadi	Mahesana
Medha	Kadi	Mahesana
Agol	Kadi	Mahesana
Jesangpura	Kadi	Mahesana
Ishvarpura	Kadi	Mahesana
Palli	Kadi	Mahesana
Kalyanpura	Kadi	Mahesana
Valavdi	Kadi	Mahesana
Della	Kadi	Mahesana
Panthoda	Kadi	Mahesana
Nadan	Kadi	Mahesana
Khanderavpura	Kadi	Mahesana
Govindpura	Kadi	Mahesana
Chandrasan	Kadi	Mahesana
Yashvantpura	Kadi	Mahesana
Mamana Pipla	Khedbrahma	Sabar Kantha
Chhatrang	Khedbrahma	Sabar Kantha
Paliyabiya	Khedbrahma	Sabar Kantha
Kalikankar	Khedbrahma	Sabar Kantha
Anjani	Khedbrahma	Sabar Kantha
Kalchhavad	Khedbrahma	Sabar Kantha
Zinznat	Khedbrahma	Sabar Kantha
Ajavas	Khedbrahma	Sabar Kantha
Bedi	Khedbrahma	Sabar Kantha
Bahara	Khedbrahma	Sabar Kantha
Chandrana	Khedbrahma	Sabar Kantha
Salera	Khedbrahma	Sabar Kantha
Valsadi	Khedbrahma	Sabar Kantha
Kathiya	Khedbrahma	Sabar Kantha
Kotda	Khedbrahma	Sabar Kantha
Gandhisan	Khedbrahma	Sabar Kantha
Sembaliya (Poshina)	Khedbrahma	Sabar Kantha
Umbarva	Khedbrahma	Sabar Kantha
Ambasar	Khedbrahma	Sabar Kantha
Dantiya	Khedbrahma	Sabar Kantha
Gundikhan	Khedbrahma	Sabar Kantha
Pipaliya	Khedbrahma	Sabar Kantha
Poshina (Ratanpur)	Khedbrahma	Sabar Kantha
Koland	Khedbrahma	Sabar Kantha
Koland Talav	Khedbrahma	Sabar Kantha
Peta Chhapra (Poshina)	Khedbrahma	Sabar Kantha
Songadh	Khedbrahma	Sabar Kantha
Lakhiya	Khedbrahma	Sabar Kantha
Amba Mahuda	Khedbrahma	Sabar Kantha
Kajavas	Khedbrahma	Sabar Kantha
Ganchhali	Khedbrahma	Sabar Kantha
Khandhora	Khedbrahma	Sabar Kantha
Chhochhar	Khedbrahma	Sabar Kantha
Delvada (Chhochhar)	Khedbrahma	Sabar Kantha
Gunbhankhari	Khedbrahma	Sabar Kantha
Kukdi	Khedbrahma	Sabar Kantha
Jotasan	Khedbrahma	Sabar Kantha
Tadhivedi	Khedbrahma	Sabar Kantha
Kalakhetara	Khedbrahma	Sabar Kantha
Mathasara	Khedbrahma	Sabar Kantha
Vinchhi	Khedbrahma	Sabar Kantha
Matarvada	Khedbrahma	Sabar Kantha
Ganer	Khedbrahma	Sabar Kantha
Ganva	Khedbrahma	Sabar Kantha
Dantral	Khedbrahma	Sabar Kantha
Padapat	Khedbrahma	Sabar Kantha
Dotad	Khedbrahma	Sabar Kantha
Golvada	Khedbrahma	Sabar Kantha
Choliya	Khedbrahma	Sabar Kantha
Demti	Khedbrahma	Sabar Kantha
Movatpura	Khedbrahma	Sabar Kantha
Malvas	Khedbrahma	Sabar Kantha
Mithi Vedi	Khedbrahma	Sabar Kantha
Lambadiya	Khedbrahma	Sabar Kantha
Kharaniya	Khedbrahma	Sabar Kantha
Tembdi	Khedbrahma	Sabar Kantha
Tembada	Khedbrahma	Sabar Kantha
Polapan	Khedbrahma	Sabar Kantha
Nada	Khedbrahma	Sabar Kantha
Dedka	Khedbrahma	Sabar Kantha
Umbora	Khedbrahma	Sabar Kantha
Mahudi	Khedbrahma	Sabar Kantha
Nava Mota	Khedbrahma	Sabar Kantha
Bubadiyana chhapran	Khedbrahma	Sabar Kantha
Kheroj	Khedbrahma	Sabar Kantha
Changod	Khedbrahma	Sabar Kantha
Mota Baval	Khedbrahma	Sabar Kantha
Mithi Bili	Khedbrahma	Sabar Kantha
Nana Baval	Khedbrahma	Sabar Kantha
Ratanpur	Khedbrahma	Sabar Kantha
Dan Mahudi	Khedbrahma	Sabar Kantha
Baval Kathiya	Khedbrahma	Sabar Kantha
Bharamiya	Khedbrahma	Sabar Kantha
Sembaliya	Khedbrahma	Sabar Kantha
Bandiyana Talav	Khedbrahma	Sabar Kantha
Pathora	Khedbrahma	Sabar Kantha
Patadiya	Khedbrahma	Sabar Kantha
Hingatiya (Khalsa)	Khedbrahma	Sabar Kantha
Digthali	Khedbrahma	Sabar Kantha
Dharoi	Khedbrahma	Sabar Kantha
Khedva	Khedbrahma	Sabar Kantha
Bordi	Khedbrahma	Sabar Kantha
Padhara	Khedbrahma	Sabar Kantha
Valran	Khedbrahma	Sabar Kantha
Basol	Khedbrahma	Sabar Kantha
Bahediya	Khedbrahma	Sabar Kantha
Zanzava Panai	Khedbrahma	Sabar Kantha
Hingatiya (Jagiri)	Khedbrahma	Sabar Kantha
Panthal	Khedbrahma	Sabar Kantha
Gadha	Khedbrahma	Sabar Kantha
Kalleka	Khedbrahma	Sabar Kantha
Panch Mahuda	Khedbrahma	Sabar Kantha
Matoda	Khedbrahma	Sabar Kantha
Pipodara Dodivada	Khedbrahma	Sabar Kantha
Bhutiya	Khedbrahma	Sabar Kantha
Nava Nana	Khedbrahma	Sabar Kantha
Jadi Sembal	Khedbrahma	Sabar Kantha
Didhiya	Khedbrahma	Sabar Kantha
Paroya	Khedbrahma	Sabar Kantha
Sitol	Khedbrahma	Sabar Kantha
Vartol	Khedbrahma	Sabar Kantha
Chikhla	Khedbrahma	Sabar Kantha
Agiya	Khedbrahma	Sabar Kantha
Unchi Dhanal	Khedbrahma	Sabar Kantha
Tuver	Khedbrahma	Sabar Kantha
Vikhran	Khedbrahma	Sabar Kantha
Dholi	Khedbrahma	Sabar Kantha
Gadhada	Khedbrahma	Sabar Kantha
Gundel	Khedbrahma	Sabar Kantha
Radhivad	Khedbrahma	Sabar Kantha
Padardi	Khedbrahma	Sabar Kantha
Jagmer	Khedbrahma	Sabar Kantha
Jagannathpura	Khedbrahma	Sabar Kantha
Rodhara	Khedbrahma	Sabar Kantha
Dholivav	Khedbrahma	Sabar Kantha
Khergadh	Khedbrahma	Sabar Kantha
Kherivav	Khedbrahma	Sabar Kantha
Vagheshvari	Khedbrahma	Sabar Kantha
Kalol	Khedbrahma	Sabar Kantha
Silvad	Khedbrahma	Sabar Kantha
Derol (Va)	Khedbrahma	Sabar Kantha
Galodiya	Khedbrahma	Sabar Kantha
Vasna	Khedbrahma	Sabar Kantha
Rudramala	Khedbrahma	Sabar Kantha
Metral	Khedbrahma	Sabar Kantha
Champalpur	Khedbrahma	Sabar Kantha
Delvada	Khedbrahma	Sabar Kantha
Nichi Dhanal	Khedbrahma	Sabar Kantha
Gadu	Khedbrahma	Sabar Kantha
Lakshmipura	Khedbrahma	Sabar Kantha
Karunda	Khedbrahma	Sabar Kantha
Tandaliya	Khedbrahma	Sabar Kantha
Damavas	Khedbrahma	Sabar Kantha
Lank	Khedbrahma	Sabar Kantha
Dhebdi	Khedbrahma	Sabar Kantha
Tokra	Khedbrahma	Sabar Kantha
Kharibedi	Vijaynagar	Sabar Kantha
Khokhra	Vijaynagar	Sabar Kantha
Kelava	Vijaynagar	Sabar Kantha
Kanthariya	Vijaynagar	Sabar Kantha
Sarsav	Vijaynagar	Sabar Kantha
Navakhola	Vijaynagar	Sabar Kantha
Navabhaga	Vijaynagar	Sabar Kantha
Parosda	Vijaynagar	Sabar Kantha
Jamaniya	Vijaynagar	Sabar Kantha
Rajpur	Vijaynagar	Sabar Kantha
Nalseri	Vijaynagar	Sabar Kantha
Chandvasa	Vijaynagar	Sabar Kantha
Dagla	Vijaynagar	Sabar Kantha
Nelau	Vijaynagar	Sabar Kantha
Padela	Vijaynagar	Sabar Kantha
Vasai	Vijaynagar	Sabar Kantha
Kharol	Vijaynagar	Sabar Kantha
Titaran	Vijaynagar	Sabar Kantha
Navaghara Umbariya	Vijaynagar	Sabar Kantha
Godhawada	Vijaynagar	Sabar Kantha
Vandhol	Vijaynagar	Sabar Kantha
Bandhana	Vijaynagar	Sabar Kantha
Matali	Vijaynagar	Sabar Kantha
Virpur	Vijaynagar	Sabar Kantha
Antarsumba	Vijaynagar	Sabar Kantha
Kelava (Parosada)	Vijaynagar	Sabar Kantha
Ukhla Dungri	Vijaynagar	Sabar Kantha
Antari	Vijaynagar	Sabar Kantha
Ladivada	Vijaynagar	Sabar Kantha
Khedasan	Vijaynagar	Sabar Kantha
Bhupatgadh	Vijaynagar	Sabar Kantha
Dholivav	Vijaynagar	Sabar Kantha
Abhapur	Vijaynagar	Sabar Kantha
Saroli	Vijaynagar	Sabar Kantha
Navagam (Dhanela)	Vijaynagar	Sabar Kantha
Gadi	Vijaynagar	Sabar Kantha
Vankda	Vijaynagar	Sabar Kantha
Baleta	Vijaynagar	Sabar Kantha
Bhatela	Vijaynagar	Sabar Kantha
Garada	Vijaynagar	Sabar Kantha
Chikno	Vijaynagar	Sabar Kantha
Vanaj	Vijaynagar	Sabar Kantha
Ajepur	Vijaynagar	Sabar Kantha
Vajepur	Vijaynagar	Sabar Kantha
Androkha	Vijaynagar	Sabar Kantha
Kundala	Vijaynagar	Sabar Kantha
Kathvavdi	Vijaynagar	Sabar Kantha
Bhambhudi	Vijaynagar	Sabar Kantha
Adepur	Vijaynagar	Sabar Kantha
Mondhri	Vijaynagar	Sabar Kantha
Joravarnagar	Vijaynagar	Sabar Kantha
Tol Dungari	Vijaynagar	Sabar Kantha
Golvada	Vijaynagar	Sabar Kantha
Khervada	Vijaynagar	Sabar Kantha
Badarkhan	Vijaynagar	Sabar Kantha
Jaleti	Vijaynagar	Sabar Kantha
Piploti	Vijaynagar	Sabar Kantha
Lakshmanpura	Vijaynagar	Sabar Kantha
Kodiyavada	Vijaynagar	Sabar Kantha
Chitariya	Vijaynagar	Sabar Kantha
Pal	Vijaynagar	Sabar Kantha
Dadhvav	Vijaynagar	Sabar Kantha
Samaiya	Vijaynagar	Sabar Kantha
Limda	Vijaynagar	Sabar Kantha
Chamthan	Vijaynagar	Sabar Kantha
Vireshwar	Vijaynagar	Sabar Kantha
Dholwani	Vijaynagar	Sabar Kantha
Kalvan	Vijaynagar	Sabar Kantha
Pruthvipura	Vijaynagar	Sabar Kantha
Kathroti	Vijaynagar	Sabar Kantha
Bhankhra	Vijaynagar	Sabar Kantha
Zer	Vijaynagar	Sabar Kantha
Itavadi	Vijaynagar	Sabar Kantha
Bogapada	Vijaynagar	Sabar Kantha
Bhagorapada	Vijaynagar	Sabar Kantha
Chitrodi	Vijaynagar	Sabar Kantha
Biladiya	Vijaynagar	Sabar Kantha
Dantod	Vijaynagar	Sabar Kantha
Jusavada	Vijaynagar	Sabar Kantha
Movatpura	Vijaynagar	Sabar Kantha
Amodara	Vijaynagar	Sabar Kantha
Masota	Vijaynagar	Sabar Kantha
Parvath	Vijaynagar	Sabar Kantha
Chithoda	Vijaynagar	Sabar Kantha
Kanadar	Vijaynagar	Sabar Kantha
Nadri	Vadali	Sabar Kantha
Gota	Vadali	Sabar Kantha
Vadgamda	Vadali	Sabar Kantha
Medh	Vadali	Sabar Kantha
Dharod	Vadali	Sabar Kantha
Thuravas	Vadali	Sabar Kantha
Vivav	Vadali	Sabar Kantha
Vadoth	Vadali	Sabar Kantha
Dhamdi	Vadali	Sabar Kantha
Morad	Vadali	Sabar Kantha
Dharol	Vadali	Sabar Kantha
Dobhada	Vadali	Sabar Kantha
Kambosani	Vadali	Sabar Kantha
Babsar	Vadali	Sabar Kantha
Ambavada	Vadali	Sabar Kantha
Mahor	Vadali	Sabar Kantha
Fudeda	Vadali	Sabar Kantha
Rampur (Fudeda)	Vadali	Sabar Kantha
Gajipur	Vadali	Sabar Kantha
Veda	Vadali	Sabar Kantha
Vartol	Vadali	Sabar Kantha
Vasan	Vadali	Sabar Kantha
Hathoj	Vadali	Sabar Kantha
Kanjeli	Vadali	Sabar Kantha
Malpur	Vadali	Sabar Kantha
Hatharva	Vadali	Sabar Kantha
Gamadi	Vadali	Sabar Kantha
Therasana	Vadali	Sabar Kantha
Nava Chamu	Vadali	Sabar Kantha
Juna Chamu	Vadali	Sabar Kantha
Kothan	Vadali	Sabar Kantha
Vaghpur	Vadali	Sabar Kantha
Chorivad	Vadali	Sabar Kantha
Savasla	Vadali	Sabar Kantha
Chulla	Vadali	Sabar Kantha
Rampur (Vasna)	Vadali	Sabar Kantha
Kesarganj	Vadali	Sabar Kantha
Vasna (Asai)	Vadali	Sabar Kantha
Kodareli	Vadali	Sabar Kantha
Bhandval	Vadali	Sabar Kantha
Dantroli	Vadali	Sabar Kantha
Dhirakamboya	Vadali	Sabar Kantha
Raheda	Vadali	Sabar Kantha
Arsamda	Vadali	Sabar Kantha
Badol	Vadali	Sabar Kantha
Narayanpur	Vadali	Sabar Kantha
Math Bhojayat	Vadali	Sabar Kantha
Bhavangadh	Vadali	Sabar Kantha
Himatpur (Narajina Chhapra)	Vadali	Sabar Kantha
Jamrela	Vadali	Sabar Kantha
Pahadiyol	Vadali	Sabar Kantha
Asai	Vadali	Sabar Kantha
Jetpur	Vadali	Sabar Kantha
Ventla	Vadali	Sabar Kantha
Jalodara	Vadali	Sabar Kantha
Bhajpura	Vadali	Sabar Kantha
Chandap	Idar	Sabar Kantha
Golvada	Idar	Sabar Kantha
Verabar	Idar	Sabar Kantha
Fagol	Idar	Sabar Kantha
Mahivada	Idar	Sabar Kantha
Kava	Idar	Sabar Kantha
Sabalvad	Idar	Sabar Kantha
Limbhoi	Idar	Sabar Kantha
Paj	Idar	Sabar Kantha
Gujarva	Idar	Sabar Kantha
Mathasur	Idar	Sabar Kantha
Bakarpura	Idar	Sabar Kantha
Panol	Idar	Sabar Kantha
Bhutiya	Idar	Sabar Kantha
Kadiyadara	Idar	Sabar Kantha
Chotasan	Idar	Sabar Kantha
Ranodara	Idar	Sabar Kantha
Dhinchaniya	Idar	Sabar Kantha
Mudeti	Idar	Sabar Kantha
Panchgamda	Idar	Sabar Kantha
Siyasan	Idar	Sabar Kantha
Voravav	Idar	Sabar Kantha
Gorol	Idar	Sabar Kantha
Abdasan	Idar	Sabar Kantha
Vadiyavir	Idar	Sabar Kantha
Detroli	Idar	Sabar Kantha
Diyoli	Idar	Sabar Kantha
Mastupur	Idar	Sabar Kantha
Kuski	Idar	Sabar Kantha
Sarangpur	Idar	Sabar Kantha
Umedpura	Idar	Sabar Kantha
Ranasan	Idar	Sabar Kantha
Pratappura	Idar	Sabar Kantha
Acharal	Idar	Sabar Kantha
Gulabpura	Idar	Sabar Kantha
Movatpura	Idar	Sabar Kantha
Kalyanpura	Idar	Sabar Kantha
Ravol	Idar	Sabar Kantha
Kamalpur	Idar	Sabar Kantha
Pataliya	Idar	Sabar Kantha
Falasan	Idar	Sabar Kantha
Khodam	Idar	Sabar Kantha
Finchod	Idar	Sabar Kantha
Oda	Idar	Sabar Kantha
Badarpura	Idar	Sabar Kantha
Lei	Idar	Sabar Kantha
Khaski	Idar	Sabar Kantha
Haripura (Khaski)	Idar	Sabar Kantha
Ratanpur	Idar	Sabar Kantha
Barvav	Idar	Sabar Kantha
Surpur	Idar	Sabar Kantha
Lalpur (Badoli)	Idar	Sabar Kantha
Badoli	Idar	Sabar Kantha
Bhanpur (Vadiyavir)	Idar	Sabar Kantha
Kanpur	Idar	Sabar Kantha
Lakshmanpura	Idar	Sabar Kantha
Zinzava	Idar	Sabar Kantha
Nava	Idar	Sabar Kantha
Vasai	Idar	Sabar Kantha
Revas	Idar	Sabar Kantha
Tasiya	Idar	Sabar Kantha
Budhiya	Idar	Sabar Kantha
Savgadh	Idar	Sabar Kantha
Sapavada	Idar	Sabar Kantha
Maniyor	Idar	Sabar Kantha
Masal	Idar	Sabar Kantha
Budheli	Idar	Sabar Kantha
Samlapur	Idar	Sabar Kantha
Sahebpura	Idar	Sabar Kantha
Jaliya	Idar	Sabar Kantha
Sardarpur	Idar	Sabar Kantha
Sudrasana	Idar	Sabar Kantha
Madhva	Idar	Sabar Kantha
Sundarpur	Idar	Sabar Kantha
Chhapi	Idar	Sabar Kantha
Jashvantgadh	Idar	Sabar Kantha
Umedgadh	Idar	Sabar Kantha
Virpur	Idar	Sabar Kantha
Nana Kotda	Idar	Sabar Kantha
Netramli	Idar	Sabar Kantha
Ganeshpura	Idar	Sabar Kantha
Sherpur	Idar	Sabar Kantha
Kukadiya	Idar	Sabar Kantha
Vansdol	Idar	Sabar Kantha
Narsinhpura	Idar	Sabar Kantha
Ganthiyol	Idar	Sabar Kantha
Kuvava	Idar	Sabar Kantha
Mesan	Idar	Sabar Kantha
Rampur (Brahmpuri)	Idar	Sabar Kantha
Hathol	Idar	Sabar Kantha
Itadi	Idar	Sabar Kantha
Chitroda	Idar	Sabar Kantha
Ankala	Idar	Sabar Kantha
Bhadresar	Idar	Sabar Kantha
Daramli	Idar	Sabar Kantha
Bhuvel	Idar	Sabar Kantha
Ruderdi	Idar	Sabar Kantha
Jethipura	Idar	Sabar Kantha
Bolundra (Songadh)	Idar	Sabar Kantha
Kesharpura	Idar	Sabar Kantha
Kamboya	Idar	Sabar Kantha
Manpura	Idar	Sabar Kantha
Kabso	Idar	Sabar Kantha
Gadha	Idar	Sabar Kantha
Bhavnagar	Idar	Sabar Kantha
Eklara	Idar	Sabar Kantha
Chitrodi	Idar	Sabar Kantha
Santol	Idar	Sabar Kantha
Aroda	Idar	Sabar Kantha
Jadar	Idar	Sabar Kantha
Chadasana	Idar	Sabar Kantha
Dungari	Idar	Sabar Kantha
Punjpur	Idar	Sabar Kantha
Ruvech	Idar	Sabar Kantha
Bolundra (Ruvech)	Idar	Sabar Kantha
Poshina	Idar	Sabar Kantha
Vantda	Idar	Sabar Kantha
Champa	Idar	Sabar Kantha
Pratapgadh	Idar	Sabar Kantha
Isarvada	Idar	Sabar Kantha
Hinglaj	Idar	Sabar Kantha
Nani Vadol	Idar	Sabar Kantha
Mangadh	Idar	Sabar Kantha
Lalpur (Davad)	Idar	Sabar Kantha
Haripura (Aroda)	Idar	Sabar Kantha
Kishorgadh	Idar	Sabar Kantha
Singha	Idar	Sabar Kantha
Arsodiya	Idar	Sabar Kantha
Davad	Idar	Sabar Kantha
Vasna (Davad)	Idar	Sabar Kantha
Moti Vadol	Idar	Sabar Kantha
Himatpur	Idar	Sabar Kantha
Bhetali	Idar	Sabar Kantha
Kapoda	Idar	Sabar Kantha
Dharapur	Idar	Sabar Kantha
Mota Kotda	Idar	Sabar Kantha
Vagheshvari	Bhiloda	Sabar Kantha
Virpur	Bhiloda	Sabar Kantha
Chorimala	Bhiloda	Sabar Kantha
Raisingpur	Bhiloda	Sabar Kantha
Kundol (Pal)	Bhiloda	Sabar Kantha
Bavaliya (Pal)	Bhiloda	Sabar Kantha
Dhansor	Bhiloda	Sabar Kantha
Jhejhudi	Bhiloda	Sabar Kantha
Torda (Jetpur)	Bhiloda	Sabar Kantha
Jayala	Bhiloda	Sabar Kantha
Andhariya	Bhiloda	Sabar Kantha
Kalyanpur	Bhiloda	Sabar Kantha
Bavaliya (Torda)	Bhiloda	Sabar Kantha
Indrapura	Bhiloda	Sabar Kantha
Kishangadh	Bhiloda	Sabar Kantha
Bedasan	Bhiloda	Sabar Kantha
Malasa	Bhiloda	Sabar Kantha
Malekpur	Bhiloda	Sabar Kantha
Ubsal	Bhiloda	Sabar Kantha
Bolundra	Bhiloda	Sabar Kantha
Vajapur	Bhiloda	Sabar Kantha
Siladri	Bhiloda	Sabar Kantha
Bhanmer	Bhiloda	Sabar Kantha
Rampuri	Bhiloda	Sabar Kantha
Ambabar	Bhiloda	Sabar Kantha
Pahada	Bhiloda	Sabar Kantha
Takatuka	Bhiloda	Sabar Kantha
Math Bolundra	Bhiloda	Sabar Kantha
Vansli	Bhiloda	Sabar Kantha
Vejpur	Bhiloda	Sabar Kantha
Ghanti	Bhiloda	Sabar Kantha
Jumsar (Chhapra)	Bhiloda	Sabar Kantha
Jumsar	Bhiloda	Sabar Kantha
Munai	Bhiloda	Sabar Kantha
Khalvad	Bhiloda	Sabar Kantha
Lilchha	Bhiloda	Sabar Kantha
Mankroda	Bhiloda	Sabar Kantha
Dholvani	Bhiloda	Sabar Kantha
Silasan	Bhiloda	Sabar Kantha
Budheli	Bhiloda	Sabar Kantha
Dharasan	Bhiloda	Sabar Kantha
Patiyakuva	Bhiloda	Sabar Kantha
Vasaya	Bhiloda	Sabar Kantha
Jambudi	Bhiloda	Sabar Kantha
Panch Mahudi	Bhiloda	Sabar Kantha
Ode	Bhiloda	Sabar Kantha
Bornala	Bhiloda	Sabar Kantha
Budharasan	Bhiloda	Sabar Kantha
Ajitpura	Bhiloda	Sabar Kantha
Abhapur	Bhiloda	Sabar Kantha
Meru (Bhetali)	Bhiloda	Sabar Kantha
Bhutavad	Bhiloda	Sabar Kantha
Naranpur	Bhiloda	Sabar Kantha
Mau (Navalpur)	Bhiloda	Sabar Kantha
Sunsar	Bhiloda	Sabar Kantha
Nankhi	Bhiloda	Sabar Kantha
Khapreta	Bhiloda	Sabar Kantha
Desan	Bhiloda	Sabar Kantha
Narsoli	Bhiloda	Sabar Kantha
Khumapur	Bhiloda	Sabar Kantha
Vankaner	Bhiloda	Sabar Kantha
Rintoda	Bhiloda	Sabar Kantha
Nava Bhetali	Bhiloda	Sabar Kantha
Jasvantpura	Bhiloda	Sabar Kantha
Hathiya	Bhiloda	Sabar Kantha
Dodisara Nana	Bhiloda	Sabar Kantha
Dodisara Mota	Bhiloda	Sabar Kantha
Chitariya	Bhiloda	Sabar Kantha
Sonasan	Bhiloda	Sabar Kantha
Kadvath	Bhiloda	Sabar Kantha
Ansol	Bhiloda	Sabar Kantha
Pahadiya	Bhiloda	Sabar Kantha
Odha Pada	Bhiloda	Sabar Kantha
Rangpur	Bhiloda	Sabar Kantha
Nava Venpur	Bhiloda	Sabar Kantha
Dhandhasan	Bhiloda	Sabar Kantha
Raypur	Bhiloda	Sabar Kantha
Jesingpur	Bhiloda	Sabar Kantha
Bhetali	Bhiloda	Sabar Kantha
Vasai	Bhiloda	Sabar Kantha
Bhatera	Bhiloda	Sabar Kantha
Chiboda	Bhiloda	Sabar Kantha
Thuravas	Bhiloda	Sabar Kantha
Akodiya	Bhiloda	Sabar Kantha
Lokhan	Bhiloda	Sabar Kantha
Fatepur	Bhiloda	Sabar Kantha
Medi Timba	Bhiloda	Sabar Kantha
Naroda	Bhiloda	Sabar Kantha
Mankdi	Bhiloda	Sabar Kantha
Shangal	Bhiloda	Sabar Kantha
Rampur	Bhiloda	Sabar Kantha
kheroj	Bhiloda	Sabar Kantha
Kaleka	Bhiloda	Sabar Kantha
Mandhari	Bhiloda	Sabar Kantha
Nandoj	Bhiloda	Sabar Kantha
Karanpur	Bhiloda	Sabar Kantha
Hardaspur	Bhiloda	Sabar Kantha
Dhamboliya	Bhiloda	Sabar Kantha
Palla	Bhiloda	Sabar Kantha
Dhuleta (Palla)	Bhiloda	Sabar Kantha
Venpur	Bhiloda	Sabar Kantha
Vaktapur	Bhiloda	Sabar Kantha
Karchha	Bhiloda	Sabar Kantha
Mota Samera	Bhiloda	Sabar Kantha
Dahgamda	Bhiloda	Sabar Kantha
Ravtavada	Bhiloda	Sabar Kantha
Mota Kanthariya	Bhiloda	Sabar Kantha
Ramera	Bhiloda	Sabar Kantha
Lusadiya	Bhiloda	Sabar Kantha
Nana Kanthariya	Bhiloda	Sabar Kantha
Nana Samera	Bhiloda	Sabar Kantha
Padardi	Bhiloda	Sabar Kantha
Shamalaji	Bhiloda	Sabar Kantha
Rudardi	Bhiloda	Sabar Kantha
Meravada	Bhiloda	Sabar Kantha
Gadhiya	Bhiloda	Sabar Kantha
Rudral	Bhiloda	Sabar Kantha
Kheradi	Bhiloda	Sabar Kantha
Vanzar	Bhiloda	Sabar Kantha
Chibhadiyata	Bhiloda	Sabar Kantha
Bamna	Bhiloda	Sabar Kantha
Siholi	Bhiloda	Sabar Kantha
Punasan	Bhiloda	Sabar Kantha
Dhuleta	Bhiloda	Sabar Kantha
Vantdi	Bhiloda	Sabar Kantha
Hathrol	Bhiloda	Sabar Kantha
Janali	Bhiloda	Sabar Kantha
Moti Bebar	Bhiloda	Sabar Kantha
Napda (Khalsa)	Bhiloda	Sabar Kantha
Vajapur (Kherancha)	Bhiloda	Sabar Kantha
Khari	Bhiloda	Sabar Kantha
Shamalpur	Bhiloda	Sabar Kantha
Bahecharpura	Bhiloda	Sabar Kantha
Dolatpur	Bhiloda	Sabar Kantha
Rampur (Moti)	Bhiloda	Sabar Kantha
Samran	Bhiloda	Sabar Kantha
Sarkilimdi	Bhiloda	Sabar Kantha
Lakshmanpura	Bhiloda	Sabar Kantha
Gali Semro	Bhiloda	Sabar Kantha
Vanka Timba	Bhiloda	Sabar Kantha
Kagda Mahuda	Bhiloda	Sabar Kantha
Vaghpur	Bhiloda	Sabar Kantha
Devni Mori	Bhiloda	Sabar Kantha
Bhavanpur	Bhiloda	Sabar Kantha
Kherancha	Bhiloda	Sabar Kantha
Sodpur	Bhiloda	Sabar Kantha
Napda (Jagiri)	Bhiloda	Sabar Kantha
Khiloda	Bhiloda	Sabar Kantha
Shobhayada (Jagiri)	Bhiloda	Sabar Kantha
Nani Bebar	Bhiloda	Sabar Kantha
Rajendranagar	Bhiloda	Sabar Kantha
Vansera	Bhiloda	Sabar Kantha
Gadadar	Bhiloda	Sabar Kantha
Asal	Bhiloda	Sabar Kantha
Khodamba	Bhiloda	Sabar Kantha
Kuski	Bhiloda	Sabar Kantha
Himatpur	Bhiloda	Sabar Kantha
Kundol (Dahgamda)	Bhiloda	Sabar Kantha
Godh (Kuski)	Bhiloda	Sabar Kantha
Adhera	Bhiloda	Sabar Kantha
Lalpur	Bhiloda	Sabar Kantha
Brahmpuri	Bhiloda	Sabar Kantha
Vandiyol	Bhiloda	Sabar Kantha
Sunokh	Bhiloda	Sabar Kantha
Vagodar	Bhiloda	Sabar Kantha
Chhapara Kuski	Bhiloda	Sabar Kantha
Jaliya	Bhiloda	Sabar Kantha
Kantalu	Meghraj	Sabar Kantha
Rakhapur	Meghraj	Sabar Kantha
Vanka Timba	Meghraj	Sabar Kantha
Jalampur	Meghraj	Sabar Kantha
Rajpur (Isari)	Meghraj	Sabar Kantha
Isari	Meghraj	Sabar Kantha
Patelna Chhapra	Meghraj	Sabar Kantha
Navagam (Isari)	Meghraj	Sabar Kantha
Chhitadara	Meghraj	Sabar Kantha
Jamgadh	Meghraj	Sabar Kantha
Dhenkva	Meghraj	Sabar Kantha
Manda	Meghraj	Sabar Kantha
Moti Panduli	Meghraj	Sabar Kantha
Vaghpur	Meghraj	Sabar Kantha
Vaidi	Meghraj	Sabar Kantha
Gopavada	Meghraj	Sabar Kantha
Odha (Kasana)	Meghraj	Sabar Kantha
Navagam (Kasana)	Meghraj	Sabar Kantha
Kadvadi	Meghraj	Sabar Kantha
Intva	Meghraj	Sabar Kantha
Badartralna (Chhapra)	Meghraj	Sabar Kantha
Ged	Meghraj	Sabar Kantha
Khakhariya	Meghraj	Sabar Kantha
Mota Math	Meghraj	Sabar Kantha
Punjapur	Meghraj	Sabar Kantha
Panibar	Meghraj	Sabar Kantha
Naranpur	Meghraj	Sabar Kantha
Dharola	Meghraj	Sabar Kantha
Ghorvada	Meghraj	Sabar Kantha
Antoli	Meghraj	Sabar Kantha
Odha (Panibar)	Meghraj	Sabar Kantha
Tarakvada	Meghraj	Sabar Kantha
Zeriyawada	Meghraj	Sabar Kantha
Rellavada	Meghraj	Sabar Kantha
Dhundhera	Meghraj	Sabar Kantha
Lakhipur	Meghraj	Sabar Kantha
Kadvada	Meghraj	Sabar Kantha
Godhavada	Meghraj	Sabar Kantha
Futa	Meghraj	Sabar Kantha
Chhikari	Meghraj	Sabar Kantha
Nani Panduli	Meghraj	Sabar Kantha
Moti Mori	Meghraj	Sabar Kantha
Palla Kasana	Meghraj	Sabar Kantha
Godha	Meghraj	Sabar Kantha
Kasana	Meghraj	Sabar Kantha
Panchal	Meghraj	Sabar Kantha
Kunol	Meghraj	Sabar Kantha
Kolundra	Meghraj	Sabar Kantha
Mahudi	Meghraj	Sabar Kantha
Sangal	Meghraj	Sabar Kantha
Gokchuvan	Meghraj	Sabar Kantha
Vaniyavada	Meghraj	Sabar Kantha
Bhatkota	Meghraj	Sabar Kantha
Dhandhiya	Meghraj	Sabar Kantha
Zarda	Meghraj	Sabar Kantha
Pahadiya (Panchal)	Meghraj	Sabar Kantha
Ukardi	Meghraj	Sabar Kantha
Jitpur	Meghraj	Sabar Kantha
Dhemda	Meghraj	Sabar Kantha
Nani Moydi	Meghraj	Sabar Kantha
Adepur	Meghraj	Sabar Kantha
Jivanpur	Meghraj	Sabar Kantha
Sisodara (Adepur)	Meghraj	Sabar Kantha
Khokhariya	Meghraj	Sabar Kantha
Varthali	Meghraj	Sabar Kantha
Munshivada	Meghraj	Sabar Kantha
Vank	Meghraj	Sabar Kantha
Lalpur	Meghraj	Sabar Kantha
Brahman Kotda	Meghraj	Sabar Kantha
Rola	Meghraj	Sabar Kantha
Gay Vachhda	Meghraj	Sabar Kantha
Valuna	Meghraj	Sabar Kantha
Ranjedi	Meghraj	Sabar Kantha
Tarakvadia	Meghraj	Sabar Kantha
Vaiya	Meghraj	Sabar Kantha
Behdaj	Meghraj	Sabar Kantha
Relyo	Meghraj	Sabar Kantha
Bhuval	Meghraj	Sabar Kantha
Palla (Bhemapur)	Meghraj	Sabar Kantha
Satipura	Meghraj	Sabar Kantha
Limbhoi	Meghraj	Sabar Kantha
Moti Moydi	Meghraj	Sabar Kantha
Adhodiya	Meghraj	Sabar Kantha
Undva	Meghraj	Sabar Kantha
Limbodara(Dhundha)	Meghraj	Sabar Kantha
Patelna Dhundha	Meghraj	Sabar Kantha
Damorna Dhundha	Meghraj	Sabar Kantha
Dhanivada	Meghraj	Sabar Kantha
Pahadiya (Meghraj)	Meghraj	Sabar Kantha
Karanpur	Meghraj	Sabar Kantha
Kumbhera	Meghraj	Sabar Kantha
Khandivav	Meghraj	Sabar Kantha
Jashvantpura	Meghraj	Sabar Kantha
Pruthvipura	Meghraj	Sabar Kantha
Vasna	Meghraj	Sabar Kantha
Banthivada Lalakumpa	Meghraj	Sabar Kantha
Banthivada (Ajuhirola)	Meghraj	Sabar Kantha
Bhemapur	Meghraj	Sabar Kantha
Kherai	Meghraj	Sabar Kantha
Sendaryo	Meghraj	Sabar Kantha
Vasai	Meghraj	Sabar Kantha
Royaniya	Meghraj	Sabar Kantha
Kaliya Kuva	Meghraj	Sabar Kantha
Lakhapur	Meghraj	Sabar Kantha
Surdevi	Meghraj	Sabar Kantha
Banthivada Jemana	Meghraj	Sabar Kantha
Sisodara (Megharaj)	Meghraj	Sabar Kantha
Kamroda	Meghraj	Sabar Kantha
Iploda	Meghraj	Sabar Kantha
Pisal	Meghraj	Sabar Kantha
Hiratimba	Meghraj	Sabar Kantha
Rajpur (Ramgadhi)	Meghraj	Sabar Kantha
Bhutiya	Meghraj	Sabar Kantha
Ramgadhi	Meghraj	Sabar Kantha
Rayavada	Meghraj	Sabar Kantha
Tumbaliya	Meghraj	Sabar Kantha
Vagora	Meghraj	Sabar Kantha
Mudshi	Meghraj	Sabar Kantha
Baskadanti	Meghraj	Sabar Kantha
Sarangpur	Meghraj	Sabar Kantha
Dachka	Meghraj	Sabar Kantha
Belyo	Meghraj	Sabar Kantha
Dungragod	Meghraj	Sabar Kantha
Bhunjri	Meghraj	Sabar Kantha
Lalodiya	Meghraj	Sabar Kantha
Nesda	Meghraj	Sabar Kantha
Limbodara (Ramgadhi)	Meghraj	Sabar Kantha
Krushnapur	Meghraj	Sabar Kantha
Bhadardi	Himatnagar	Sabar Kantha
Surpur (Likhi)	Himatnagar	Sabar Kantha
Chhapara (Likhi)	Himatnagar	Sabar Kantha
Dolpur	Himatnagar	Sabar Kantha
Kadodari	Himatnagar	Sabar Kantha
Motipura (Chandrni)	Himatnagar	Sabar Kantha
Vasna (Chandarni)	Himatnagar	Sabar Kantha
Hamirgadh (khed)	Himatnagar	Sabar Kantha
Khandhol	Himatnagar	Sabar Kantha
Khanusa	Himatnagar	Sabar Kantha
Likhi	Himatnagar	Sabar Kantha
Kathavadiya	Himatnagar	Sabar Kantha
Nurpur	Himatnagar	Sabar Kantha
Mahadevpura (Khedavada)	Himatnagar	Sabar Kantha
Gadha	Himatnagar	Sabar Kantha
Sachodar	Himatnagar	Sabar Kantha
Pipodar	Himatnagar	Sabar Kantha
Prempur	Himatnagar	Sabar Kantha
Jivapur	Himatnagar	Sabar Kantha
Pethapur	Himatnagar	Sabar Kantha
Kadoli	Himatnagar	Sabar Kantha
Munpur (Rangpur)	Himatnagar	Sabar Kantha
Rangpur	Himatnagar	Sabar Kantha
Kanada	Himatnagar	Sabar Kantha
Kanai	Himatnagar	Sabar Kantha
Vaktapur	Himatnagar	Sabar Kantha
Lolasan	Himatnagar	Sabar Kantha
Jamla	Himatnagar	Sabar Kantha
Tandol	Himatnagar	Sabar Kantha
Kesharpura	Himatnagar	Sabar Kantha
Kaniyol	Himatnagar	Sabar Kantha
Vasana (Ghorvada)	Himatnagar	Sabar Kantha
Arjanpura	Himatnagar	Sabar Kantha
Raisingpura	Himatnagar	Sabar Kantha
Khed	Himatnagar	Sabar Kantha
Chandarni	Himatnagar	Sabar Kantha
Hunj	Himatnagar	Sabar Kantha
Himatpur	Himatnagar	Sabar Kantha
Champalnar	Himatnagar	Sabar Kantha
Mordungra	Himatnagar	Sabar Kantha
Ambavada	Himatnagar	Sabar Kantha
Jambudi	Himatnagar	Sabar Kantha
Rampur (Ghorvada)	Himatnagar	Sabar Kantha
Kenpur	Himatnagar	Sabar Kantha
Demai Nani	Himatnagar	Sabar Kantha
Ghorvada	Himatnagar	Sabar Kantha
Dhabal	Himatnagar	Sabar Kantha
Rajpur (Nava)	Himatnagar	Sabar Kantha
Hansalpur	Himatnagar	Sabar Kantha
Virpur	Himatnagar	Sabar Kantha
Ilol	Himatnagar	Sabar Kantha
Khedavada	Himatnagar	Sabar Kantha
Mahadevpura (Lolasan)	Himatnagar	Sabar Kantha
Jorapur	Himatnagar	Sabar Kantha
Maherpura	Himatnagar	Sabar Kantha
Lalpur (Savgadh)	Himatnagar	Sabar Kantha
Dhandha	Himatnagar	Sabar Kantha
Nava	Himatnagar	Sabar Kantha
Amarapur	Himatnagar	Sabar Kantha
Balochpur	Himatnagar	Sabar Kantha
Demai Moti	Himatnagar	Sabar Kantha
Pratappura	Himatnagar	Sabar Kantha
Surpur (Hamirgadh)	Himatnagar	Sabar Kantha
Kump	Himatnagar	Sabar Kantha
Vasani	Himatnagar	Sabar Kantha
Lalpur (Vavdi)	Himatnagar	Sabar Kantha
Vavdi	Himatnagar	Sabar Kantha
Manpur (Bankhor)	Himatnagar	Sabar Kantha
Bankhor	Himatnagar	Sabar Kantha
Raygadh	Himatnagar	Sabar Kantha
Javanpura	Himatnagar	Sabar Kantha
Navalpur (Bhatoda)	Himatnagar	Sabar Kantha
Javangadh	Himatnagar	Sabar Kantha
Mathasuliya	Himatnagar	Sabar Kantha
Shravana	Himatnagar	Sabar Kantha
Surajpura	Himatnagar	Sabar Kantha
Vantda	Himatnagar	Sabar Kantha
Hamirgadh (Vantda)	Himatnagar	Sabar Kantha
Viravada	Himatnagar	Sabar Kantha
Berna	Himatnagar	Sabar Kantha
Balvantpura	Himatnagar	Sabar Kantha
Katwad	Himatnagar	Sabar Kantha
Dedhrota	Himatnagar	Sabar Kantha
Derol	Himatnagar	Sabar Kantha
Navanagar	Himatnagar	Sabar Kantha
Navalpur	Himatnagar	Sabar Kantha
Polajpur	Himatnagar	Sabar Kantha
Hapa	Himatnagar	Sabar Kantha
Motipur	Himatnagar	Sabar Kantha
Kanknol	Himatnagar	Sabar Kantha
Gamdi	Himatnagar	Sabar Kantha
Vamoj	Himatnagar	Sabar Kantha
Dhundhar	Himatnagar	Sabar Kantha
Karanpur	Himatnagar	Sabar Kantha
Gambhoi	Himatnagar	Sabar Kantha
Rajpur (Gambhoi)	Himatnagar	Sabar Kantha
Mahadevpura (Sadha)	Himatnagar	Sabar Kantha
Sadha	Himatnagar	Sabar Kantha
Vagdi	Himatnagar	Sabar Kantha
Raipur	Himatnagar	Sabar Kantha
Bilpan	Himatnagar	Sabar Kantha
Adpodra	Himatnagar	Sabar Kantha
Nadri	Himatnagar	Sabar Kantha
Bhavpur	Himatnagar	Sabar Kantha
Vejarap No Math	Himatnagar	Sabar Kantha
Manorpur	Himatnagar	Sabar Kantha
Agiyol	Himatnagar	Sabar Kantha
Thumra	Himatnagar	Sabar Kantha
Hadiyol	Himatnagar	Sabar Kantha
Piplodi	Himatnagar	Sabar Kantha
Boriya Khurad	Himatnagar	Sabar Kantha
Jitod	Himatnagar	Sabar Kantha
Tajpuri	Himatnagar	Sabar Kantha
Sayebapur	Himatnagar	Sabar Kantha
Saroli	Himatnagar	Sabar Kantha
Mahadevpura (Kundol)	Himatnagar	Sabar Kantha
Kundol	Himatnagar	Sabar Kantha
Nadri Pethapur	Himatnagar	Sabar Kantha
Hajipur	Himatnagar	Sabar Kantha
Gadhoda	Himatnagar	Sabar Kantha
Akodra	Himatnagar	Sabar Kantha
Pural	Himatnagar	Sabar Kantha
Sakrodiya	Himatnagar	Sabar Kantha
Desasan	Himatnagar	Sabar Kantha
Rupal	Himatnagar	Sabar Kantha
Rampur (Rupal)	Himatnagar	Sabar Kantha
Pedhmala	Himatnagar	Sabar Kantha
Mali	Himatnagar	Sabar Kantha
Pipaliya	Himatnagar	Sabar Kantha
Bavsar	Himatnagar	Sabar Kantha
Nikoda	Himatnagar	Sabar Kantha
Vajapur	Himatnagar	Sabar Kantha
Hathrol	Himatnagar	Sabar Kantha
Adapur	Himatnagar	Sabar Kantha
Ged	Prantij	Sabar Kantha
Morvad	Prantij	Sabar Kantha
Katwad	Prantij	Sabar Kantha
Dalpur	Prantij	Sabar Kantha
Nananpur	Prantij	Sabar Kantha
Asroda	Prantij	Sabar Kantha
Chhadarda	Prantij	Sabar Kantha
Nikodiya	Prantij	Sabar Kantha
Takhatgadh	Prantij	Sabar Kantha
Fatepur	Prantij	Sabar Kantha
Mauchha	Prantij	Sabar Kantha
Amodra	Prantij	Sabar Kantha
Sonasan	Prantij	Sabar Kantha
Rasulpur	Prantij	Sabar Kantha
Salal	Prantij	Sabar Kantha
Moyad	Prantij	Sabar Kantha
Sanpad	Prantij	Sabar Kantha
Vaghpur	Prantij	Sabar Kantha
Piludra	Prantij	Sabar Kantha
Poglu	Prantij	Sabar Kantha
Zinzva	Prantij	Sabar Kantha
Vaghrota	Prantij	Sabar Kantha
Ambavada	Prantij	Sabar Kantha
Hadmatiya	Prantij	Sabar Kantha
Vajapur	Prantij	Sabar Kantha
Mahadevpura (Ghadi)	Prantij	Sabar Kantha
Ghadi	Prantij	Sabar Kantha
Memadpur	Prantij	Sabar Kantha
Pallachar	Prantij	Sabar Kantha
Aminpur	Prantij	Sabar Kantha
Kamalpur	Prantij	Sabar Kantha
Sadoliya	Prantij	Sabar Kantha
Galesara	Prantij	Sabar Kantha
Oran	Prantij	Sabar Kantha
Katpur	Prantij	Sabar Kantha
Mamroli	Prantij	Sabar Kantha
Bakarpur	Prantij	Sabar Kantha
Vadrad	Prantij	Sabar Kantha
Lalpur (Jenpur)	Prantij	Sabar Kantha
Kalipura	Prantij	Sabar Kantha
Jenpur	Prantij	Sabar Kantha
Amrapur	Prantij	Sabar Kantha
Raslod	Prantij	Sabar Kantha
Unchha	Prantij	Sabar Kantha
Limla	Prantij	Sabar Kantha
Vadvasa	Prantij	Sabar Kantha
Sitvada	Prantij	Sabar Kantha
Poyada	Prantij	Sabar Kantha
Indrajpur	Prantij	Sabar Kantha
Bobha	Prantij	Sabar Kantha
Majra	Prantij	Sabar Kantha
Tajpur (Oran)	Prantij	Sabar Kantha
Karol	Prantij	Sabar Kantha
Balisana	Prantij	Sabar Kantha
Baini Muvadi	Prantij	Sabar Kantha
Mavani Muvadi	Prantij	Sabar Kantha
Zalani Muvadi	Prantij	Sabar Kantha
Kesharpur	Prantij	Sabar Kantha
Dalani Muvadi	Prantij	Sabar Kantha
Punadra	Prantij	Sabar Kantha
Sadani Muvadi	Prantij	Sabar Kantha
Ghadkan	Prantij	Sabar Kantha
Sukhad	Prantij	Sabar Kantha
Padhayda	Prantij	Sabar Kantha
Kabodra	Talod	Sabar Kantha
Kabodri	Talod	Sabar Kantha
Charanvata	Talod	Sabar Kantha
Malvan	Talod	Sabar Kantha
Lalpur (Ranasan)	Talod	Sabar Kantha
Navalpur	Talod	Sabar Kantha
Fojivada	Talod	Sabar Kantha
Bhimpada	Talod	Sabar Kantha
Ranasan	Talod	Sabar Kantha
Nava	Talod	Sabar Kantha
Kathwada	Talod	Sabar Kantha
Mohanpur	Talod	Sabar Kantha
Varvada	Talod	Sabar Kantha
Morali	Talod	Sabar Kantha
Ahmedpura	Talod	Sabar Kantha
Motesari	Talod	Sabar Kantha
Dadarda	Talod	Sabar Kantha
Antrolivas Punjaji	Talod	Sabar Kantha
Mota Chekhla	Talod	Sabar Kantha
Gundiya	Talod	Sabar Kantha
Gulabpura	Talod	Sabar Kantha
Punsri	Talod	Sabar Kantha
Modhuka	Talod	Sabar Kantha
Nana Chekhla	Talod	Sabar Kantha
Antrolivas Dolji	Talod	Sabar Kantha
Harsol	Talod	Sabar Kantha
Mahelav	Talod	Sabar Kantha
Chhatrisa	Talod	Sabar Kantha
Anjana	Talod	Sabar Kantha
Badarni Muvadi	Talod	Sabar Kantha
Chandpur	Talod	Sabar Kantha
Rupal	Talod	Sabar Kantha
Gora	Talod	Sabar Kantha
Gambhirpura	Talod	Sabar Kantha
Tajpur Camp	Talod	Sabar Kantha
Deviya	Talod	Sabar Kantha
Rojhad	Talod	Sabar Kantha
Vav	Talod	Sabar Kantha
Umed Ni Muvadi	Talod	Sabar Kantha
Madhavgadh	Talod	Sabar Kantha
Dhadh Vasna	Talod	Sabar Kantha
Tantarda	Talod	Sabar Kantha
Dolatabad	Talod	Sabar Kantha
Mahiyal	Talod	Sabar Kantha
Mahadevpura (Mahiyal)	Talod	Sabar Kantha
Salatpur	Talod	Sabar Kantha
Gulab Ni Muvadi	Talod	Sabar Kantha
Sultanpur	Talod	Sabar Kantha
Padusan	Talod	Sabar Kantha
Sagpur	Talod	Sabar Kantha
Ranipura	Talod	Sabar Kantha
Balisana	Talod	Sabar Kantha
Aniod	Talod	Sabar Kantha
Javanpur	Talod	Sabar Kantha
Nani Shiholi	Talod	Sabar Kantha
Rayaniya	Talod	Sabar Kantha
Valiyampura	Talod	Sabar Kantha
Bhatiya	Talod	Sabar Kantha
Mudhasana	Talod	Sabar Kantha
Mokamni Muvadi	Talod	Sabar Kantha
Kherol	Talod	Sabar Kantha
Ujediya	Talod	Sabar Kantha
Navavas	Talod	Sabar Kantha
Semaliya	Talod	Sabar Kantha
Badodara	Talod	Sabar Kantha
Ankhol	Talod	Sabar Kantha
Gobarjini Muvadi	Talod	Sabar Kantha
Gadhavad	Talod	Sabar Kantha
Lalani Muvadi	Talod	Sabar Kantha
Jorajini Muvadi	Talod	Sabar Kantha
Karmipura	Talod	Sabar Kantha
Boriya Becharaji	Talod	Sabar Kantha
Mahekal	Talod	Sabar Kantha
Gadhada	Modasa	Sabar Kantha
Davli	Modasa	Sabar Kantha
Vantada (Bolundra)	Modasa	Sabar Kantha
Padar	Modasa	Sabar Kantha
Bamanvad	Modasa	Sabar Kantha
Nandisan	Modasa	Sabar Kantha
Tintoi	Modasa	Sabar Kantha
Kudol	Modasa	Sabar Kantha
Umedpur (Dadhaliya)	Modasa	Sabar Kantha
Jitpur (Dadhaliya)	Modasa	Sabar Kantha
Math	Modasa	Sabar Kantha
Jivanpur	Modasa	Sabar Kantha
Futa	Modasa	Sabar Kantha
Umedpur (Bolundra)	Modasa	Sabar Kantha
Bolundra	Modasa	Sabar Kantha
Sardoi	Modasa	Sabar Kantha
Lalpur (Sardoi)	Modasa	Sabar Kantha
Rampur (Gadhada)	Modasa	Sabar Kantha
Vanta	Modasa	Sabar Kantha
Shampur	Modasa	Sabar Kantha
Tintisar	Modasa	Sabar Kantha
Bhatkota	Modasa	Sabar Kantha
Madhupur	Modasa	Sabar Kantha
Rajli	Modasa	Sabar Kantha
Bhilkuva	Modasa	Sabar Kantha
Jambusar	Modasa	Sabar Kantha
Hathipura	Modasa	Sabar Kantha
Dadhaliya	Modasa	Sabar Kantha
Motipur	Modasa	Sabar Kantha
Surpur	Modasa	Sabar Kantha
Isrol (Moti)	Modasa	Sabar Kantha
Isrol (Nani)	Modasa	Sabar Kantha
Gokharva	Modasa	Sabar Kantha
Sajapur	Modasa	Sabar Kantha
Salampur	Modasa	Sabar Kantha
Khambhisar	Modasa	Sabar Kantha
Paliyapur	Modasa	Sabar Kantha
Bodi	Modasa	Sabar Kantha
Madasana	Modasa	Sabar Kantha
Medhasan	Modasa	Sabar Kantha
Mahadevgram	Modasa	Sabar Kantha
Malvan (Keshapur)	Modasa	Sabar Kantha
Vaghediya	Modasa	Sabar Kantha
Jitpur (Mahadevgram)	Modasa	Sabar Kantha
Charanvada	Modasa	Sabar Kantha
Varthu	Modasa	Sabar Kantha
Vaniyad	Modasa	Sabar Kantha
Modarsumba	Modasa	Sabar Kantha
Dholvani	Modasa	Sabar Kantha
Muloj	Modasa	Sabar Kantha
Rampur (Sinavad)	Modasa	Sabar Kantha
Kokapur	Modasa	Sabar Kantha
Mora	Modasa	Sabar Kantha
Sayra	Modasa	Sabar Kantha
Gajan	Modasa	Sabar Kantha
Rakhiyal	Modasa	Sabar Kantha
Bhachadiya	Modasa	Sabar Kantha
Khumapur	Modasa	Sabar Kantha
Vantada (Medhasan)	Modasa	Sabar Kantha
Dholiya (Nana - Mota)	Modasa	Sabar Kantha
Lachchhai	Modasa	Sabar Kantha
Gadha	Modasa	Sabar Kantha
Moti Chichano	Modasa	Sabar Kantha
Nani Chichano	Modasa	Sabar Kantha
Limbhoi	Modasa	Sabar Kantha
Palanpur	Modasa	Sabar Kantha
Ganeshpur	Modasa	Sabar Kantha
Bajkot	Modasa	Sabar Kantha
Hafsabad	Modasa	Sabar Kantha
Munshivada	Modasa	Sabar Kantha
Sinavad	Modasa	Sabar Kantha
Vallavanta	Modasa	Sabar Kantha
Badodara	Modasa	Sabar Kantha
Sarurpur	Modasa	Sabar Kantha
Dolpur (Sinavad)	Modasa	Sabar Kantha
Dariyapur	Modasa	Sabar Kantha
Volva	Modasa	Sabar Kantha
Khalikpur	Modasa	Sabar Kantha
Sabalpur	Modasa	Sabar Kantha
Rasulpur	Modasa	Sabar Kantha
Galsundra	Modasa	Sabar Kantha
Itadi	Modasa	Sabar Kantha
Jamana Chhapra	Modasa	Sabar Kantha
Nava Vadvasa	Modasa	Sabar Kantha
Juna Vadvasa	Modasa	Sabar Kantha
Dhankhrol	Modasa	Sabar Kantha
Kishorpura	Modasa	Sabar Kantha
Bayal	Modasa	Sabar Kantha
Khadoda	Modasa	Sabar Kantha
Dhunavada	Modasa	Sabar Kantha
Pahadpur	Modasa	Sabar Kantha
Sitpur	Modasa	Sabar Kantha
Dungarvada	Modasa	Sabar Kantha
Sakariya	Modasa	Sabar Kantha
Zhalodar	Modasa	Sabar Kantha
Fareri	Modasa	Sabar Kantha
Mathasuliya	Modasa	Sabar Kantha
Andapur	Modasa	Sabar Kantha
Bordi	Modasa	Sabar Kantha
Bherunda	Modasa	Sabar Kantha
Kolikhad	Modasa	Sabar Kantha
Garudi	Modasa	Sabar Kantha
Alampur	Modasa	Sabar Kantha
Kau	Modasa	Sabar Kantha
Amlai	Modasa	Sabar Kantha
Ramos	Dhansura	Sabar Kantha
Amodara	Dhansura	Sabar Kantha
Jashvantpura	Dhansura	Sabar Kantha
Shinol	Dhansura	Sabar Kantha
Rahiyol	Dhansura	Sabar Kantha
Kolavada	Dhansura	Sabar Kantha
Rupan	Dhansura	Sabar Kantha
Ramana	Dhansura	Sabar Kantha
Malekpur	Dhansura	Sabar Kantha
Shika	Dhansura	Sabar Kantha
Antisara	Dhansura	Sabar Kantha
Bhensavada	Dhansura	Sabar Kantha
Dolpur (Vadagam)	Dhansura	Sabar Kantha
Kanjodiya	Dhansura	Sabar Kantha
Lalpur (Shinol)	Dhansura	Sabar Kantha
Kidi	Dhansura	Sabar Kantha
Kashipura	Dhansura	Sabar Kantha
Ambasar	Dhansura	Sabar Kantha
Rampur (Vadagam)	Dhansura	Sabar Kantha
Kanal	Dhansura	Sabar Kantha
Jalampur	Dhansura	Sabar Kantha
Jamtha	Dhansura	Sabar Kantha
Butal	Dhansura	Sabar Kantha
Dhansura	Dhansura	Sabar Kantha
Bhotudev-no-Math	Dhansura	Sabar Kantha
Gadhada Kot	Dhansura	Sabar Kantha
Vantda Suka	Dhansura	Sabar Kantha
Karanpur	Dhansura	Sabar Kantha
Barnoli	Dhansura	Sabar Kantha
Sardi Sarkhandi	Dhansura	Sabar Kantha
Bilvaniya	Dhansura	Sabar Kantha
Dhamaniya	Dhansura	Sabar Kantha
Panchkuhada	Dhansura	Sabar Kantha
Borvai	Dhansura	Sabar Kantha
Nani Vav	Dhansura	Sabar Kantha
Vadagam	Dhansura	Sabar Kantha
Vakhatpur	Dhansura	Sabar Kantha
Lalino Math	Dhansura	Sabar Kantha
Navalpur	Dhansura	Sabar Kantha
Khilodiya	Dhansura	Sabar Kantha
Jitpur (Vadgam)	Dhansura	Sabar Kantha
Rajpur (Vadagam)	Dhansura	Sabar Kantha
Moti Vav	Dhansura	Sabar Kantha
Hirapur	Dhansura	Sabar Kantha
Karoli	Dhansura	Sabar Kantha
Chogamda	Dhansura	Sabar Kantha
Jashvantpura	Dhansura	Sabar Kantha
Kesharpura (Bilvaniya)	Dhansura	Sabar Kantha
Khadol	Dhansura	Sabar Kantha
Sengiyani Rayan	Dhansura	Sabar Kantha
Motipura	Dhansura	Sabar Kantha
Simli	Dhansura	Sabar Kantha
Kheda	Dhansura	Sabar Kantha
Hirapur Kampo	Dhansura	Sabar Kantha
Akrund	Dhansura	Sabar Kantha
Galalni Muvadi	Dhansura	Sabar Kantha
Alva	Dhansura	Sabar Kantha
Nana	Dhansura	Sabar Kantha
Lalu	Dhansura	Sabar Kantha
Poyda	Dhansura	Sabar Kantha
Kamli	Dhansura	Sabar Kantha
Chhevadiya	Dhansura	Sabar Kantha
Gopalpura	Dhansura	Sabar Kantha
Rampura Kampo	Dhansura	Sabar Kantha
Haripura Kampo	Dhansura	Sabar Kantha
Khanpurni Muvadi	Dhansura	Sabar Kantha
Jalampura (Ambaliyara)	Dhansura	Sabar Kantha
Kesharpura Kampo	Dhansura	Sabar Kantha
Udepur	Dhansura	Sabar Kantha
Patyo	Dhansura	Sabar Kantha
Amarpura	Dhansura	Sabar Kantha
Rampura	Dhansura	Sabar Kantha
Dholeshvar	Malpur	Sabar Kantha
Nathavas	Malpur	Sabar Kantha
Velaniya	Malpur	Sabar Kantha
Godh	Malpur	Sabar Kantha
Dodiya	Malpur	Sabar Kantha
Rampur	Malpur	Sabar Kantha
Mevda	Malpur	Sabar Kantha
Jalampur	Malpur	Sabar Kantha
Manvav	Malpur	Sabar Kantha
Rinchhvad	Malpur	Sabar Kantha
Gajan	Malpur	Sabar Kantha
Odha	Malpur	Sabar Kantha
Agatiya	Malpur	Sabar Kantha
Bhuka Kutari	Malpur	Sabar Kantha
Kanela	Malpur	Sabar Kantha
Kasvada	Malpur	Sabar Kantha
Parsoda	Malpur	Sabar Kantha
Hamirpur	Malpur	Sabar Kantha
Nava Takhatpur	Malpur	Sabar Kantha
Chumfari	Malpur	Sabar Kantha
Tiski	Malpur	Sabar Kantha
Mathvas	Malpur	Sabar Kantha
Jesvadi	Malpur	Sabar Kantha
Gopalpur	Malpur	Sabar Kantha
Fagodiya	Malpur	Sabar Kantha
Nanavada	Malpur	Sabar Kantha
Navagam	Malpur	Sabar Kantha
Vavdibara	Malpur	Sabar Kantha
Piprana	Malpur	Sabar Kantha
Sonikpur	Malpur	Sabar Kantha
Medi Timba	Malpur	Sabar Kantha
Sompur	Malpur	Sabar Kantha
Mahiyapur	Malpur	Sabar Kantha
Surajpur	Malpur	Sabar Kantha
Satarda	Malpur	Sabar Kantha
Rasapur	Malpur	Sabar Kantha
Laljina Pahadiya	Malpur	Sabar Kantha
Vavdi	Malpur	Sabar Kantha
Juna Takhatpur	Malpur	Sabar Kantha
Bhempur	Malpur	Sabar Kantha
Maljina Pahadiya	Malpur	Sabar Kantha
Govindpur	Malpur	Sabar Kantha
Nava	Malpur	Sabar Kantha
Goriya	Malpur	Sabar Kantha
Dhirakhantna Muvada	Malpur	Sabar Kantha
Galiya Danti	Malpur	Sabar Kantha
Mangalpur	Malpur	Sabar Kantha
Sonariya	Malpur	Sabar Kantha
Jesingpur	Malpur	Sabar Kantha
Trikampur	Malpur	Sabar Kantha
Surana Pahadiya	Malpur	Sabar Kantha
Damorna Muvada	Malpur	Sabar Kantha
Molli	Malpur	Sabar Kantha
Parpotiya	Malpur	Sabar Kantha
Kothi	Malpur	Sabar Kantha
Aniyor	Malpur	Sabar Kantha
Kothiya	Malpur	Sabar Kantha
Valinathna Muvada	Malpur	Sabar Kantha
Viraniya	Malpur	Sabar Kantha
Koyaliya	Malpur	Sabar Kantha
Ambava	Malpur	Sabar Kantha
Rugnathpur	Malpur	Sabar Kantha
Panavada	Malpur	Sabar Kantha
Devdanti	Malpur	Sabar Kantha
Jitpur	Malpur	Sabar Kantha
Andhari Vadi	Malpur	Sabar Kantha
Masadara	Malpur	Sabar Kantha
Bamni	Malpur	Sabar Kantha
Ambaliya	Malpur	Sabar Kantha
Choriwad	Malpur	Sabar Kantha
Sardarkhantni Muvadi	Malpur	Sabar Kantha
Punjarani Muvadi	Malpur	Sabar Kantha
Kidiad	Malpur	Sabar Kantha
Boradiya	Malpur	Sabar Kantha
Harbaina Pahadiya	Malpur	Sabar Kantha
Lodhiyana Pahadiya	Malpur	Sabar Kantha
Pahadiya	Malpur	Sabar Kantha
Suvarchar	Malpur	Sabar Kantha
Vankaneda	Malpur	Sabar Kantha
Khalikpur	Malpur	Sabar Kantha
Hathikhantna Muvada	Malpur	Sabar Kantha
Pateliyana Muvada	Malpur	Sabar Kantha
Ubhran	Malpur	Sabar Kantha
Kaveriya	Malpur	Sabar Kantha
Tunadar	Malpur	Sabar Kantha
Sakhwaniya	Malpur	Sabar Kantha
Jalamkhantna Muvada	Malpur	Sabar Kantha
Bhempoda	Malpur	Sabar Kantha
Bhutan	Malpur	Sabar Kantha
Magodi	Malpur	Sabar Kantha
Fansarel	Malpur	Sabar Kantha
Butiya	Malpur	Sabar Kantha
Khetavada	Malpur	Sabar Kantha
Rambhoda	Malpur	Sabar Kantha
Lalpur	Malpur	Sabar Kantha
Dabaran	Malpur	Sabar Kantha
Ankaliya	Malpur	Sabar Kantha
Helodar	Malpur	Sabar Kantha
Katkuva	Malpur	Sabar Kantha
Limb	Bayad	Sabar Kantha
Mathasuliya	Bayad	Sabar Kantha
Chandarej	Bayad	Sabar Kantha
Vajepura Gam	Bayad	Sabar Kantha
Alana	Bayad	Sabar Kantha
Akodiya	Bayad	Sabar Kantha
Vatrakgadh	Bayad	Sabar Kantha
Ratanpur	Bayad	Sabar Kantha
Fatepur	Bayad	Sabar Kantha
Alva	Bayad	Sabar Kantha
Jitpur (Akodiya)	Bayad	Sabar Kantha
Bibipura	Bayad	Sabar Kantha
Dahegamda	Bayad	Sabar Kantha
Ranechi	Bayad	Sabar Kantha
Simlaj	Bayad	Sabar Kantha
Lalpur (Mota)	Bayad	Sabar Kantha
Hematral	Bayad	Sabar Kantha
Dolpur (Gabat)	Bayad	Sabar Kantha
Jumatral	Bayad	Sabar Kantha
Nabhela	Bayad	Sabar Kantha
Prantvel	Bayad	Sabar Kantha
Gotapur	Bayad	Sabar Kantha
Gabat	Bayad	Sabar Kantha
Sarsoli	Bayad	Sabar Kantha
Radodara	Bayad	Sabar Kantha
Vantda Bayad	Bayad	Sabar Kantha
Takhatpura	Bayad	Sabar Kantha
Hamirpur	Bayad	Sabar Kantha
Chamarpur	Bayad	Sabar Kantha
Bhukhel	Bayad	Sabar Kantha
Rugnathpur (Bhukhel)	Bayad	Sabar Kantha
Narmiyani Muvadi	Bayad	Sabar Kantha
Ramas	Bayad	Sabar Kantha
Ghodnal	Bayad	Sabar Kantha
Vajepura Kampo	Bayad	Sabar Kantha
Vasni	Bayad	Sabar Kantha
Untarda	Bayad	Sabar Kantha
Tenpur	Bayad	Sabar Kantha
Ambliyara	Bayad	Sabar Kantha
Jitpur	Bayad	Sabar Kantha
Jantral	Bayad	Sabar Kantha
Fatepur (Dabha)	Bayad	Sabar Kantha
Amargadh	Bayad	Sabar Kantha
Vanta	Bayad	Sabar Kantha
Choila	Bayad	Sabar Kantha
Amrapur	Bayad	Sabar Kantha
Kotda	Bayad	Sabar Kantha
Ambagam	Bayad	Sabar Kantha
Kadavia	Bayad	Sabar Kantha
Vasadara	Bayad	Sabar Kantha
Netrodiya	Bayad	Sabar Kantha
Badarpura	Bayad	Sabar Kantha
Rupnagar	Bayad	Sabar Kantha
Dharamadi Vanta	Bayad	Sabar Kantha
Semaliya	Bayad	Sabar Kantha
Jitpur (Ramsi)	Bayad	Sabar Kantha
Dalpatpura	Bayad	Sabar Kantha
Ahmadpura	Bayad	Sabar Kantha
Totu	Bayad	Sabar Kantha
Odha	Bayad	Sabar Kantha
Pipodara	Bayad	Sabar Kantha
Dakhaneshvar	Bayad	Sabar Kantha
Madhav Kampo	Bayad	Sabar Kantha
Varena Bor Timba	Bayad	Sabar Kantha
Gulabpura	Bayad	Sabar Kantha
Dolpur (Ramas)	Bayad	Sabar Kantha
Lalpur	Bayad	Sabar Kantha
Rugnathpura	Bayad	Sabar Kantha
Junavada	Bayad	Sabar Kantha
Bhundasan	Bayad	Sabar Kantha
Deriya	Bayad	Sabar Kantha
Ganeshpura (Ambaliyara)	Bayad	Sabar Kantha
Vankaneda	Bayad	Sabar Kantha
Sultanpur	Bayad	Sabar Kantha
Paldi	Bayad	Sabar Kantha
Amiyapur	Bayad	Sabar Kantha
Jodhpur	Bayad	Sabar Kantha
Dabha	Bayad	Sabar Kantha
Bhajpur	Bayad	Sabar Kantha
Manpur	Bayad	Sabar Kantha
Bibinivav	Bayad	Sabar Kantha
Vasnirel	Bayad	Sabar Kantha
Sangal	Bayad	Sabar Kantha
Bormath	Bayad	Sabar Kantha
Mahadevpura	Bayad	Sabar Kantha
Savela	Bayad	Sabar Kantha
Kojan	Bayad	Sabar Kantha
Ganeshpura (Sathamba)	Bayad	Sabar Kantha
Ajabpura	Bayad	Sabar Kantha
Kalajina Muvada	Bayad	Sabar Kantha
Dolpur (Sathamba)	Bayad	Sabar Kantha
Takhatpura (Sathamba)	Bayad	Sabar Kantha
Pagiyana Muvada	Bayad	Sabar Kantha
Dhom	Bayad	Sabar Kantha
Jalampura (Sathamba)	Bayad	Sabar Kantha
Champlavat	Bayad	Sabar Kantha
Patel-Na-Muvada	Bayad	Sabar Kantha
Vijayganj	Bayad	Sabar Kantha
Talod	Bayad	Sabar Kantha
Nagano Math	Bayad	Sabar Kantha
Lank	Bayad	Sabar Kantha
Demai	Bayad	Sabar Kantha
Vasna Mota	Bayad	Sabar Kantha
Chhabhau	Bayad	Sabar Kantha
Vantda-Kavath	Bayad	Sabar Kantha
Borol	Bayad	Sabar Kantha
Fata Dhirpura	Bayad	Sabar Kantha
Motipura (Savela)	Bayad	Sabar Kantha
Bordi	Bayad	Sabar Kantha
Mudiya	Bayad	Sabar Kantha
Kashiyavat	Bayad	Sabar Kantha
Vajavat	Bayad	Sabar Kantha
Hathipura	Bayad	Sabar Kantha
Narsela	Bayad	Sabar Kantha
Khari	Bayad	Sabar Kantha
Indran	Bayad	Sabar Kantha
Amodara	Bayad	Sabar Kantha
Desaipura Kampo	Bayad	Sabar Kantha
Deroli	Bayad	Sabar Kantha
Munjina Muvada	Bayad	Sabar Kantha
Zankhariya	Bayad	Sabar Kantha
Veda	Kalol	Gandhinagar
Himmatpura	Kalol	Gandhinagar
Jamla	Kalol	Gandhinagar
Vagosana	Kalol	Gandhinagar
Dhendhu	Kalol	Gandhinagar
Sobhasan	Kalol	Gandhinagar
Itla	Kalol	Gandhinagar
Limbodara	Kalol	Gandhinagar
Aluva	Kalol	Gandhinagar
Mubarakpura	Kalol	Gandhinagar
Balva	Kalol	Gandhinagar
(2) Rampura	Kalol	Gandhinagar
(1) Pratappura	Kalol	Gandhinagar
Chandisana	Kalol	Gandhinagar
Amaja	Kalol	Gandhinagar
Nadri	Kalol	Gandhinagar
Soja	Kalol	Gandhinagar
Paliyad	Kalol	Gandhinagar
Khorajdabhi	Kalol	Gandhinagar
Bhavpura	Kalol	Gandhinagar
Kantha	Kalol	Gandhinagar
Nava	Kalol	Gandhinagar
Golthara	Kalol	Gandhinagar
Nardipur	Kalol	Gandhinagar
Mokhasan	Kalol	Gandhinagar
Dingucha	Kalol	Gandhinagar
Pansar	Kalol	Gandhinagar
Bhadol	Kalol	Gandhinagar
Isand	Kalol	Gandhinagar
Vadavsvami	Kalol	Gandhinagar
Bileshvarpura	Kalol	Gandhinagar
Pratappura	Kalol	Gandhinagar
Piyaj	Kalol	Gandhinagar
Dhanaj	Kalol	Gandhinagar
Palsana	Kalol	Gandhinagar
Sherisa	Kalol	Gandhinagar
Ramnagar	Kalol	Gandhinagar
Vansajada	Kalol	Gandhinagar
Bhoyan Moti	Kalol	Gandhinagar
Sabaspur	Kalol	Gandhinagar
Usmanabad	Kalol	Gandhinagar
Ganpatpura	Kalol	Gandhinagar
Jaspur	Kalol	Gandhinagar
Dantali	Kalol	Gandhinagar
Vadsar	Kalol	Gandhinagar
Karoli	Kalol	Gandhinagar
Hajipur	Kalol	Gandhinagar
Bhimasan	Kalol	Gandhinagar
Jethlaj	Kalol	Gandhinagar
Khatraj	Kalol	Gandhinagar
Sanavad	Kalol	Gandhinagar
Santej	Kalol	Gandhinagar
Rakanpur	Kalol	Gandhinagar
Ranchhodpura	Kalol	Gandhinagar
Nasmed	Kalol	Gandhinagar
Adhana	Kalol	Gandhinagar
Mulasana	Kalol	Gandhinagar
Vayana	Kalol	Gandhinagar
Vansajada Dhedia	Kalol	Gandhinagar
Unali	Kalol	Gandhinagar
Rancharada	Kalol	Gandhinagar
Nandoli	Kalol	Gandhinagar
Dhamasna	Kalol	Gandhinagar
Palodiya	Kalol	Gandhinagar
Mandali (Vihar)	Mansa	Gandhinagar
Vihar	Mansa	Gandhinagar
Chadasana	Mansa	Gandhinagar
Paldi Vyas	Mansa	Gandhinagar
Veda (Motopura)	Mansa	Gandhinagar
Khadat	Mansa	Gandhinagar
Pundhara	Mansa	Gandhinagar
Ajol	Mansa	Gandhinagar
Delvada	Mansa	Gandhinagar
Paldi Rathod	Mansa	Gandhinagar
Bilodra	Mansa	Gandhinagar
Harnahoda	Mansa	Gandhinagar
Samou	Mansa	Gandhinagar
Padusma	Mansa	Gandhinagar
Charada	Mansa	Gandhinagar
Patanpura	Mansa	Gandhinagar
Mahudi	Mansa	Gandhinagar
Anodiya	Mansa	Gandhinagar
Lakroda	Mansa	Gandhinagar
Rangpur	Mansa	Gandhinagar
Kuvadara	Mansa	Gandhinagar
Lodra	Mansa	Gandhinagar
Ridrol	Mansa	Gandhinagar
Dhameda	Mansa	Gandhinagar
Bapupura	Mansa	Gandhinagar
Solaiya	Mansa	Gandhinagar
Amarpura	Mansa	Gandhinagar
Kharna	Mansa	Gandhinagar
Parsa	Mansa	Gandhinagar
Khata Amba	Mansa	Gandhinagar
Boru	Mansa	Gandhinagar
Itadara	Mansa	Gandhinagar
Fatehpura	Mansa	Gandhinagar
Galthara	Mansa	Gandhinagar
Badpura	Mansa	Gandhinagar
Varsoda	Mansa	Gandhinagar
Gunma	Mansa	Gandhinagar
Ambod	Mansa	Gandhinagar
Manekpur Makakhad	Mansa	Gandhinagar
Rampura (M)	Mansa	Gandhinagar
Gulabpura	Mansa	Gandhinagar
Indrapura	Mansa	Gandhinagar
Parbatpura	Mansa	Gandhinagar
Bhimpura	Mansa	Gandhinagar
Dholakuva	Mansa	Gandhinagar
Rajpura	Mansa	Gandhinagar
Delvad	Mansa	Gandhinagar
Amarapur	Mansa	Gandhinagar
Rupal	Gandhinagar	Gandhinagar
Vasan	Gandhinagar	Gandhinagar
Unava	Gandhinagar	Gandhinagar
Pindharada	Gandhinagar	Gandhinagar
Rajpur	Gandhinagar	Gandhinagar
Sadra	Gandhinagar	Gandhinagar
Madhavgadh	Gandhinagar	Gandhinagar
Chandrala	Gandhinagar	Gandhinagar
Chhala	Gandhinagar	Gandhinagar
Jakhora	Gandhinagar	Gandhinagar
Chekhalarani	Gandhinagar	Gandhinagar
Piplaj	Gandhinagar	Gandhinagar
Randheja	Gandhinagar	Gandhinagar
Sonipur	Gandhinagar	Gandhinagar
Sardhav	Gandhinagar	Gandhinagar
Jalund	Gandhinagar	Gandhinagar
Adraj Moti	Gandhinagar	Gandhinagar
Nava Dharmpur	Gandhinagar	Gandhinagar
Dolarana Vasana	Gandhinagar	Gandhinagar
Giyod	Gandhinagar	Gandhinagar
Dhanap	Gandhinagar	Gandhinagar
Dashela	Gandhinagar	Gandhinagar
Lekawada	Gandhinagar	Gandhinagar
Pundarasan	Gandhinagar	Gandhinagar
Titoda	Gandhinagar	Gandhinagar
Bhoyan Rathod	Gandhinagar	Gandhinagar
Alampur	Gandhinagar	Gandhinagar
Shiholi Moti	Gandhinagar	Gandhinagar
Mahudara	Gandhinagar	Gandhinagar
Isanpur Mota	Gandhinagar	Gandhinagar
Chiloda (Dabhoda)	Gandhinagar	Gandhinagar
Dantali	Gandhinagar	Gandhinagar
Prantiya	Gandhinagar	Gandhinagar
Magodi	Gandhinagar	Gandhinagar
Vadodara	Gandhinagar	Gandhinagar
Dabhoda	Gandhinagar	Gandhinagar
Lavarpur	Gandhinagar	Gandhinagar
Shahpur	Gandhinagar	Gandhinagar
Khoraj	Gandhinagar	Gandhinagar
Ratanpur	Gandhinagar	Gandhinagar
Pirojpur	Gandhinagar	Gandhinagar
Vankanerda	Gandhinagar	Gandhinagar
Galudan	Gandhinagar	Gandhinagar
Sonarda	Gandhinagar	Gandhinagar
Vira Talavdi	Gandhinagar	Gandhinagar
Valad	Gandhinagar	Gandhinagar
Limbadia	Gandhinagar	Gandhinagar
Medra	Gandhinagar	Gandhinagar
Ottampur	Dehgam	Gandhinagar
Chekhlapagi	Dehgam	Gandhinagar
Babra	Dehgam	Gandhinagar
Udan	Dehgam	Gandhinagar
Patna Kuva	Dehgam	Gandhinagar
Kantharpur	Dehgam	Gandhinagar
Vasana Chaudhary	Dehgam	Gandhinagar
Halisa	Dehgam	Gandhinagar
Bilamana	Dehgam	Gandhinagar
Nana Jalundra	Dehgam	Gandhinagar
Navanagar	Dehgam	Gandhinagar
Bhadroda	Dehgam	Gandhinagar
Dod	Dehgam	Gandhinagar
Vadod	Dehgam	Gandhinagar
Machhang Nani	Dehgam	Gandhinagar
Machhang Moti	Dehgam	Gandhinagar
Mirjapur	Dehgam	Gandhinagar
Rakhiyal	Dehgam	Gandhinagar
Badpur	Dehgam	Gandhinagar
Dharisana	Dehgam	Gandhinagar
Vadvasa	Dehgam	Gandhinagar
Sanoda	Dehgam	Gandhinagar
Salki	Dehgam	Gandhinagar
Vardhana Muvada	Dehgam	Gandhinagar
Anguthala	Dehgam	Gandhinagar
Jaliyano Math	Dehgam	Gandhinagar
Sagdalpur	Dehgam	Gandhinagar
Sametri	Dehgam	Gandhinagar
Sahebji Na Muvada	Dehgam	Gandhinagar
Piplaj	Dehgam	Gandhinagar
Meghraj Na Muvada	Dehgam	Gandhinagar
Jindva	Dehgam	Gandhinagar
Kalyanji Na Muvada	Dehgam	Gandhinagar
Khanpur	Dehgam	Gandhinagar
Sampa	Dehgam	Gandhinagar
Ahamadpur	Dehgam	Gandhinagar
Nandol	Dehgam	Gandhinagar
Palaiya	Dehgam	Gandhinagar
Mosampur	Dehgam	Gandhinagar
Sujana Muvada	Dehgam	Gandhinagar
Velpura	Dehgam	Gandhinagar
Pahadiya	Dehgam	Gandhinagar
Lihoda	Dehgam	Gandhinagar
Antoli	Dehgam	Gandhinagar
Dumecha	Dehgam	Gandhinagar
Thadakuva	Dehgam	Gandhinagar
Khadiya	Dehgam	Gandhinagar
Mithana Muvada	Dehgam	Gandhinagar
Antroli	Dehgam	Gandhinagar
Lavad	Dehgam	Gandhinagar
Harakhjina Muvada	Dehgam	Gandhinagar
Shiyavada	Dehgam	Gandhinagar
Kadjodra	Dehgam	Gandhinagar
Najupura	Dehgam	Gandhinagar
Moti Pavthi	Dehgam	Gandhinagar
Sambela	Dehgam	Gandhinagar
Motipura	Dehgam	Gandhinagar
Mahudiya	Dehgam	Gandhinagar
Devkaran Na Muvada	Dehgam	Gandhinagar
Arajanjina Muvada	Dehgam	Gandhinagar
Vasna Sogthi	Dehgam	Gandhinagar
Chiskari	Dehgam	Gandhinagar
Palundra	Dehgam	Gandhinagar
Vasna Rathod	Dehgam	Gandhinagar
Jalundra Mota	Dehgam	Gandhinagar
Zak	Dehgam	Gandhinagar
Kadadara	Dehgam	Gandhinagar
Harsoli	Dehgam	Gandhinagar
Jivajini Muvadi	Dehgam	Gandhinagar
Vatva	Dehgam	Gandhinagar
Bardoli (Kothi)	Dehgam	Gandhinagar
Amrajina Muvada	Dehgam	Gandhinagar
Hathijan	Dehgam	Gandhinagar
Isanpur Dodiya	Dehgam	Gandhinagar
Bariya	Dehgam	Gandhinagar
Bardoli (Bariya)	Dehgam	Gandhinagar
Bahiyel	Dehgam	Gandhinagar
Krishnanagar	Dehgam	Gandhinagar
Ramnagar	Dehgam	Gandhinagar
Karoli	Dehgam	Gandhinagar
Kodrali	Dehgam	Gandhinagar
Ghamij	Dehgam	Gandhinagar
Kamalbandh Vasna	Dehgam	Gandhinagar
Hilol Vasna	Dehgam	Gandhinagar
Kanipur	Dehgam	Gandhinagar
Mirapur	Dehgam	Gandhinagar
Pallano Math	Dehgam	Gandhinagar
Pasuniya	Dehgam	Gandhinagar
Shiyapur	Dehgam	Gandhinagar
Hilol	Dehgam	Gandhinagar
Demaliya	Dehgam	Gandhinagar
Chamla	Dehgam	Gandhinagar
Hansalpur Becharaji	Mandal	Ahmadabad
Sitapur	Mandal	Ahmadabad
Kachrol	Mandal	Ahmadabad
Zanzarava	Mandal	Ahmadabad
Sinaj	Mandal	Ahmadabad
Kanpura (Sinaj)	Mandal	Ahmadabad
Anandpura	Mandal	Ahmadabad
Dadhana	Mandal	Ahmadabad
Vinchhan	Mandal	Ahmadabad
Jalisana	Mandal	Ahmadabad
Nayakpur	Mandal	Ahmadabad
Varmor	Mandal	Ahmadabad
Vinzuvada	Mandal	Ahmadabad
Vanpardi	Mandal	Ahmadabad
Dalod	Mandal	Ahmadabad
Kunpur	Mandal	Ahmadabad
Vasna Kunpur	Mandal	Ahmadabad
Vitthapur	Mandal	Ahmadabad
Ughroj	Mandal	Ahmadabad
Ughrojpura	Mandal	Ahmadabad
Ukardi	Mandal	Ahmadabad
Manpura	Mandal	Ahmadabad
Solgam	Mandal	Ahmadabad
Sadra	Mandal	Ahmadabad
Sher	Mandal	Ahmadabad
Mithapur	Mandal	Ahmadabad
Mandal	Mandal	Ahmadabad
Kadvasan	Mandal	Ahmadabad
Navagam	Mandal	Ahmadabad
Rakhiyana	Mandal	Ahmadabad
Dhedhasana	Mandal	Ahmadabad
Ribdi	Mandal	Ahmadabad
Karshanpura	Mandal	Ahmadabad
Endla	Mandal	Ahmadabad
Nana Ubhada	Mandal	Ahmadabad
Odaki	Mandal	Ahmadabad
Trent	Mandal	Ahmadabad
Gunjala	Detroj-Rampura	Ahmadabad
Dabhsar	Detroj-Rampura	Ahmadabad
Rudatal	Detroj-Rampura	Ahmadabad
Bantai	Detroj-Rampura	Ahmadabad
Moti Rantai	Detroj-Rampura	Ahmadabad
Amarpura	Detroj-Rampura	Ahmadabad
Sunvala	Detroj-Rampura	Ahmadabad
Sujpura	Detroj-Rampura	Ahmadabad
Bhatariya	Detroj-Rampura	Ahmadabad
Telavi	Detroj-Rampura	Ahmadabad
Balsasan	Detroj-Rampura	Ahmadabad
Rajpura	Detroj-Rampura	Ahmadabad
Fatepura	Detroj-Rampura	Ahmadabad
Nani Rantai	Detroj-Rampura	Ahmadabad
Jethipura	Detroj-Rampura	Ahmadabad
Odhav	Detroj-Rampura	Ahmadabad
Odhav paru	Detroj-Rampura	Ahmadabad
Gamanpura	Detroj-Rampura	Ahmadabad
Nadishala	Detroj-Rampura	Ahmadabad
Abasna	Detroj-Rampura	Ahmadabad
Madrisana	Detroj-Rampura	Ahmadabad
Dangarva	Detroj-Rampura	Ahmadabad
Bamroli	Detroj-Rampura	Ahmadabad
Shobhasan	Detroj-Rampura	Ahmadabad
Bhonyni	Detroj-Rampura	Ahmadabad
Ghelda	Detroj-Rampura	Ahmadabad
Indrapura	Detroj-Rampura	Ahmadabad
Jaspura	Detroj-Rampura	Ahmadabad
Umedpura	Detroj-Rampura	Ahmadabad
Dekavada	Detroj-Rampura	Ahmadabad
Marusana	Detroj-Rampura	Ahmadabad
Ratanpura	Detroj-Rampura	Ahmadabad
Nathpura	Detroj-Rampura	Ahmadabad
Kukvav	Detroj-Rampura	Ahmadabad
Bhonynipura	Detroj-Rampura	Ahmadabad
Damodaripura	Detroj-Rampura	Ahmadabad
Hathipura	Detroj-Rampura	Ahmadabad
Sangpara	Detroj-Rampura	Ahmadabad
Detroj	Detroj-Rampura	Ahmadabad
Mota Karanpura	Detroj-Rampura	Ahmadabad
Nana Karanpura	Detroj-Rampura	Ahmadabad
Sadatpura	Detroj-Rampura	Ahmadabad
Bhagapura	Detroj-Rampura	Ahmadabad
Shihor	Detroj-Rampura	Ahmadabad
Chhaniyar	Detroj-Rampura	Ahmadabad
Kanz	Detroj-Rampura	Ahmadabad
Ghatisana	Detroj-Rampura	Ahmadabad
Kantrodi	Detroj-Rampura	Ahmadabad
Rampura	Detroj-Rampura	Ahmadabad
Bhankoda	Detroj-Rampura	Ahmadabad
Vasna (Chhaniyar)	Detroj-Rampura	Ahmadabad
Aghar (Ashoknagar)	Detroj-Rampura	Ahmadabad
Boska	Detroj-Rampura	Ahmadabad
Kointiya	Detroj-Rampura	Ahmadabad
Panar	Detroj-Rampura	Ahmadabad
Dalsana	Viramgam	Ahmadabad
Kanpura (Dalsana)	Viramgam	Ahmadabad
Sabalpura	Viramgam	Ahmadabad
Chuninapura	Viramgam	Ahmadabad
Shivpura	Viramgam	Ahmadabad
Devpura	Viramgam	Ahmadabad
Bhavda	Viramgam	Ahmadabad
Kariyana	Viramgam	Ahmadabad
Chanothiya	Viramgam	Ahmadabad
Bhadana	Viramgam	Ahmadabad
Ukhalod	Viramgam	Ahmadabad
Dhakdi	Viramgam	Ahmadabad
Dediyasan	Viramgam	Ahmadabad
Kaliyana	Viramgam	Ahmadabad
Bhojva	Viramgam	Ahmadabad
Juna Padar	Viramgam	Ahmadabad
Jaksi	Viramgam	Ahmadabad
Nadiyana	Viramgam	Ahmadabad
Khudad	Viramgam	Ahmadabad
Kadipur	Viramgam	Ahmadabad
Melaj	Viramgam	Ahmadabad
Sarsavadi	Viramgam	Ahmadabad
Kokta	Viramgam	Ahmadabad
Nilki	Viramgam	Ahmadabad
Dumana	Viramgam	Ahmadabad
Goraiya	Viramgam	Ahmadabad
Vadgas	Viramgam	Ahmadabad
Thori Vadgas	Viramgam	Ahmadabad
Kankaravadi	Viramgam	Ahmadabad
Vani	Viramgam	Ahmadabad
Viramgam (Rural)	Viramgam	Ahmadabad
Valana	Viramgam	Ahmadabad
Moti Kumad	Viramgam	Ahmadabad
Memadpura	Viramgam	Ahmadabad
Rangpur	Viramgam	Ahmadabad
Nani Kumad	Viramgam	Ahmadabad
Sokali	Viramgam	Ahmadabad
Hansalpur Sereshvar	Viramgam	Ahmadabad
Rahemalpur	Viramgam	Ahmadabad
Thori Mubarak	Viramgam	Ahmadabad
Karakathal	Viramgam	Ahmadabad
Jakhwada	Viramgam	Ahmadabad
Sachana	Viramgam	Ahmadabad
Kalyanpur (Shiyal)	Viramgam	Ahmadabad
Ogan	Viramgam	Ahmadabad
Liya	Viramgam	Ahmadabad
Vasveliya	Viramgam	Ahmadabad
Thori Thambha	Viramgam	Ahmadabad
Khengariya	Viramgam	Ahmadabad
Limbad	Viramgam	Ahmadabad
Vanthal	Viramgam	Ahmadabad
Jalampura	Viramgam	Ahmadabad
Varsava	Viramgam	Ahmadabad
Vasan	Viramgam	Ahmadabad
Thuleta	Viramgam	Ahmadabad
Ghoda	Viramgam	Ahmadabad
Kamijla	Viramgam	Ahmadabad
Kumarkhan	Viramgam	Ahmadabad
Zezara	Viramgam	Ahmadabad
Asalgam	Viramgam	Ahmadabad
Jetapur	Viramgam	Ahmadabad
Nani Kishol	Viramgam	Ahmadabad
Karangadh	Viramgam	Ahmadabad
Rupavati	Viramgam	Ahmadabad
Shahpur	Viramgam	Ahmadabad
Kayla	Viramgam	Ahmadabad
Moti Kishol	Viramgam	Ahmadabad
Vekariya	Viramgam	Ahmadabad
Virochannagar	Sanand	Ahmadabad
Dodar	Sanand	Ahmadabad
Naranpura	Sanand	Ahmadabad
Iyava	Sanand	Ahmadabad
Rampura	Sanand	Ahmadabad
Anadej	Sanand	Ahmadabad
Bhavanpur	Sanand	Ahmadabad
Chekhla	Sanand	Ahmadabad
Garodiya	Sanand	Ahmadabad
Vasna Iyava	Sanand	Ahmadabad
Khoda	Sanand	Ahmadabad
Chharodi	Sanand	Ahmadabad
Khoraj	Sanand	Ahmadabad
Zolapur	Sanand	Ahmadabad
Shiyawada	Sanand	Ahmadabad
Kalana	Sanand	Ahmadabad
Bol	Sanand	Ahmadabad
Rupavati	Sanand	Ahmadabad
Vasodara	Sanand	Ahmadabad
Goraj	Sanand	Ahmadabad
Kunvar	Sanand	Ahmadabad
Hirapur	Sanand	Ahmadabad
Charal	Sanand	Ahmadabad
Bakrana	Sanand	Ahmadabad
Daduka	Sanand	Ahmadabad
Melasana	Sanand	Ahmadabad
Makhiyav	Sanand	Ahmadabad
Vinchhiya	Sanand	Ahmadabad
Kodaliya	Sanand	Ahmadabad
Fangdi	Sanand	Ahmadabad
Lekhamba	Sanand	Ahmadabad
Soyla	Sanand	Ahmadabad
Kolat	Sanand	Ahmadabad
Moti Devti	Sanand	Ahmadabad
Pipan	Sanand	Ahmadabad
Nani Devti	Sanand	Ahmadabad
Khicha	Sanand	Ahmadabad
Modasar	Sanand	Ahmadabad
Juda	Sanand	Ahmadabad
Mankol	Sanand	Ahmadabad
Kundal	Sanand	Ahmadabad
Rethal	Sanand	Ahmadabad
Govinda	Sanand	Ahmadabad
Upardal	Sanand	Ahmadabad
Vanaliya	Sanand	Ahmadabad
Aniyali	Sanand	Ahmadabad
Zamp	Sanand	Ahmadabad
Juwal	Sanand	Ahmadabad
Daran	Sanand	Ahmadabad
Lodariyal	Sanand	Ahmadabad
Palwada	Sanand	Ahmadabad
Tajpur	Sanand	Ahmadabad
Lapkaman	Daskroi	Ahmadabad
Lilapur	Daskroi	Ahmadabad
Khodiyar	Daskroi	Ahmadabad
Muthiya	Daskroi	Ahmadabad
Pardhol	Daskroi	Ahmadabad
Vahelal	Daskroi	Ahmadabad
Huka	Daskroi	Ahmadabad
Navarangpura	Daskroi	Ahmadabad
Zanu	Daskroi	Ahmadabad
Lalpur	Daskroi	Ahmadabad
Bharkunda	Daskroi	Ahmadabad
Pasunj	Daskroi	Ahmadabad
Kubadthal	Daskroi	Ahmadabad
Bhuvaldi	Daskroi	Ahmadabad
Kuha	Daskroi	Ahmadabad
Chandial	Daskroi	Ahmadabad
Kaniyel	Daskroi	Ahmadabad
Vadod	Daskroi	Ahmadabad
Bhavda	Daskroi	Ahmadabad
Bakrol Bujrang	Daskroi	Ahmadabad
Gatrad	Daskroi	Ahmadabad
Memadpur	Daskroi	Ahmadabad
Bibipur	Daskroi	Ahmadabad
Geratnagar	Daskroi	Ahmadabad
Vanch	Daskroi	Ahmadabad
Dhamatvan	Daskroi	Ahmadabad
Harnivav	Daskroi	Ahmadabad
Undrel	Daskroi	Ahmadabad
Ranodara	Daskroi	Ahmadabad
Govindada	Daskroi	Ahmadabad
Chavlaj	Daskroi	Ahmadabad
Bhuval	Daskroi	Ahmadabad
Hirapur	Daskroi	Ahmadabad
Badodara	Daskroi	Ahmadabad
Geratpur	Daskroi	Ahmadabad
Ropda	Daskroi	Ahmadabad
Hathijan	Daskroi	Ahmadabad
Aslali	Daskroi	Ahmadabad
Visalpur	Daskroi	Ahmadabad
Paldi Kankaj	Daskroi	Ahmadabad
Ode	Daskroi	Ahmadabad
Gamdi	Daskroi	Ahmadabad
Devdi	Daskroi	Ahmadabad
Istolabad	Daskroi	Ahmadabad
Barejadi	Daskroi	Ahmadabad
Chosar	Daskroi	Ahmadabad
Jetalpur	Daskroi	Ahmadabad
Giramtha	Daskroi	Ahmadabad
Miroli	Daskroi	Ahmadabad
Kasindra	Daskroi	Ahmadabad
Bhat	Daskroi	Ahmadabad
Navapura	Daskroi	Ahmadabad
Timba	Daskroi	Ahmadabad
Mahijda	Daskroi	Ahmadabad
Vasai	Daskroi	Ahmadabad
Naz	Daskroi	Ahmadabad
Badarkha	Dholka	Ahmadabad
Saroda	Dholka	Ahmadabad
Chandisar	Dholka	Ahmadabad
Vasna Keliya	Dholka	Ahmadabad
Chaloda	Dholka	Ahmadabad
Shekhdi	Dholka	Ahmadabad
Sindhraj	Dholka	Ahmadabad
Ranoda	Dholka	Ahmadabad
Jalalpur Vazifa	Dholka	Ahmadabad
Rajpur	Dholka	Ahmadabad
Ambaliyara	Dholka	Ahmadabad
Sathal	Dholka	Ahmadabad
Lana	Dholka	Ahmadabad
Shiyawada	Dholka	Ahmadabad
Kalyanpur	Dholka	Ahmadabad
Valthera	Dholka	Ahmadabad
Jalalpur Godhaneshvar	Dholka	Ahmadabad
Khanpur	Dholka	Ahmadabad
Mujpur	Dholka	Ahmadabad
Dholka (Rural)	Dholka	Ahmadabad
Rampur	Dholka	Ahmadabad
Khatripur	Dholka	Ahmadabad
Sahij	Dholka	Ahmadabad
Ambethi	Dholka	Ahmadabad
Transad	Dholka	Ahmadabad
Bhetawada	Dholka	Ahmadabad
Nesda	Dholka	Ahmadabad
Dadusar	Dholka	Ahmadabad
Sarandi	Dholka	Ahmadabad
Begva	Dholka	Ahmadabad
Kariyana	Dholka	Ahmadabad
Kadipur	Dholka	Ahmadabad
Ambareli	Dholka	Ahmadabad
Paldi	Dholka	Ahmadabad
Pisawada	Dholka	Ahmadabad
Andhari	Dholka	Ahmadabad
Virpur	Dholka	Ahmadabad
Vautha	Dholka	Ahmadabad
Girand	Dholka	Ahmadabad
Virdi	Dholka	Ahmadabad
Ingoli	Dholka	Ahmadabad
Kauka	Dholka	Ahmadabad
Kaliyapura	Dholka	Ahmadabad
Kharanti	Dholka	Ahmadabad
Koth	Dholka	Ahmadabad
Rupgadh	Dholka	Ahmadabad
Simej	Dholka	Ahmadabad
Ganesar	Dholka	Ahmadabad
Ganol	Dholka	Ahmadabad
Raypur	Dholka	Ahmadabad
Dholi	Dholka	Ahmadabad
Kesargadh	Dholka	Ahmadabad
Arnej	Dholka	Ahmadabad
Bhurkhi	Dholka	Ahmadabad
Gundi	Dholka	Ahmadabad
Javaraj	Dholka	Ahmadabad
Vejalka	Dholka	Ahmadabad
Bhumli	Dholka	Ahmadabad
Vataman	Dholka	Ahmadabad
Rampura	Dholka	Ahmadabad
Anandpura	Dholka	Ahmadabad
Varna	Dholka	Ahmadabad
Jakhda	Dholka	Ahmadabad
Nani Boru	Dholka	Ahmadabad
Saragvala	Dholka	Ahmadabad
Uteliya	Dholka	Ahmadabad
Loliya	Dholka	Ahmadabad
Samani	Dholka	Ahmadabad
Bholad	Dholka	Ahmadabad
Moti Boru	Dholka	Ahmadabad
Vasna Nanodara	Bavla	Ahmadabad
Nanodara	Bavla	Ahmadabad
Kavla	Bavla	Ahmadabad
Sankod	Bavla	Ahmadabad
Vasna Dhedhal	Bavla	Ahmadabad
Dhedhal	Bavla	Ahmadabad
Kavitha	Bavla	Ahmadabad
Adroda	Bavla	Ahmadabad
Hasannagar	Bavla	Ahmadabad
Chhabasar	Bavla	Ahmadabad
Baldana	Bavla	Ahmadabad
Metal	Bavla	Ahmadabad
Devdholera	Bavla	Ahmadabad
Devadthal	Bavla	Ahmadabad
Durgi	Bavla	Ahmadabad
Meni	Bavla	Ahmadabad
Dumali	Bavla	Ahmadabad
Kesaradi	Bavla	Ahmadabad
Lagdana	Bavla	Ahmadabad
Dahegamda	Bavla	Ahmadabad
Ranesar	Bavla	Ahmadabad
Amipura	Bavla	Ahmadabad
Kochariya	Bavla	Ahmadabad
Rupal	Bavla	Ahmadabad
Saljada	Bavla	Ahmadabad
Juval Rupavati	Bavla	Ahmadabad
Zekda	Bavla	Ahmadabad
Kerala	Bavla	Ahmadabad
Chiyada	Bavla	Ahmadabad
Sakodara	Bavla	Ahmadabad
Dhanwada	Bavla	Ahmadabad
Bhayla	Bavla	Ahmadabad
Kalyangadh	Bavla	Ahmadabad
Bhamsara	Bavla	Ahmadabad
Kanotar	Bavla	Ahmadabad
Shiyal	Bavla	Ahmadabad
Sarala	Bavla	Ahmadabad
Gangad	Bavla	Ahmadabad
Rohika	Bavla	Ahmadabad
Bagodara	Bavla	Ahmadabad
Kaliveji	Bavla	Ahmadabad
Mithapur	Bavla	Ahmadabad
Gundanapara	Bavla	Ahmadabad
Memar	Bavla	Ahmadabad
Dhingda	Bavla	Ahmadabad
Dharpipla	Ranpur	Ahmadabad
Keriya	Ranpur	Ahmadabad
Aniyali Kasbati	Ranpur	Ahmadabad
Devaliya	Ranpur	Ahmadabad
Patna	Ranpur	Ahmadabad
Baraniya	Ranpur	Ahmadabad
Bodiya	Ranpur	Ahmadabad
Kinara	Ranpur	Ahmadabad
Sanganpur	Ranpur	Ahmadabad
Gadhiya	Ranpur	Ahmadabad
Derdi	Ranpur	Ahmadabad
Umrala	Ranpur	Ahmadabad
Alampur	Ranpur	Ahmadabad
Rajpara	Ranpur	Ahmadabad
Khokharnesh	Ranpur	Ahmadabad
Hadmatala	Ranpur	Ahmadabad
Malanpur	Ranpur	Ahmadabad
Devgana	Ranpur	Ahmadabad
Sundariyana	Ranpur	Ahmadabad
Moti Vavdi	Ranpur	Ahmadabad
Nani Vavdi	Ranpur	Ahmadabad
Bubavav	Ranpur	Ahmadabad
Panvi	Ranpur	Ahmadabad
Kundli	Ranpur	Ahmadabad
Aniyali Kathi	Ranpur	Ahmadabad
Alau	Ranpur	Ahmadabad
Khas	Ranpur	Ahmadabad
Bagad	Ranpur	Ahmadabad
Jalila	Ranpur	Ahmadabad
Vejalka	Ranpur	Ahmadabad
Charanki	Ranpur	Ahmadabad
Godhawata	Ranpur	Ahmadabad
Gunda	Ranpur	Ahmadabad
Khadsaliya	Barwala	Ahmadabad
Jharvaliya	Barwala	Ahmadabad
Polarpur	Barwala	Ahmadabad
Chokdi	Barwala	Ahmadabad
Nabhoi	Barwala	Ahmadabad
Sodhi	Barwala	Ahmadabad
Pipariya	Barwala	Ahmadabad
Ankevaliya	Barwala	Ahmadabad
Shahpur	Barwala	Ahmadabad
Rojid	Barwala	Ahmadabad
Ranpari	Barwala	Ahmadabad
Vahiya	Barwala	Ahmadabad
Chachariya	Barwala	Ahmadabad
Refda	Barwala	Ahmadabad
Salangpur	Barwala	Ahmadabad
Khambhada	Barwala	Ahmadabad
Bela	Barwala	Ahmadabad
Timbla	Barwala	Ahmadabad
Kundal	Barwala	Ahmadabad
Rampura	Barwala	Ahmadabad
Khamidana	Barwala	Ahmadabad
Kapadiyali	Barwala	Ahmadabad
Dhadhodar	Barwala	Ahmadabad
Vadhela	Barwala	Ahmadabad
Navda	Barwala	Ahmadabad
Sangasar	Barwala	Ahmadabad
Hebatpur	Barwala	Ahmadabad
Mota Tradiya	Dhandhuka	Ahmadabad
Nana Tradiya	Dhandhuka	Ahmadabad
Bajarda	Dhandhuka	Ahmadabad
Zanzarka	Dhandhuka	Ahmadabad
Sarwal	Dhandhuka	Ahmadabad
Adval	Dhandhuka	Ahmadabad
Fedra	Dhandhuka	Ahmadabad
Dhanala	Dhandhuka	Ahmadabad
Kamiyala	Dhandhuka	Ahmadabad
Anandpur	Dhandhuka	Ahmadabad
Buranpur	Dhandhuka	Ahmadabad
Navagam	Dhandhuka	Ahmadabad
Pipli	Dhandhuka	Ahmadabad
Pachchham	Dhandhuka	Ahmadabad
Ratanpur	Dhandhuka	Ahmadabad
Fattepur	Dhandhuka	Ahmadabad
Khadol	Dhandhuka	Ahmadabad
Haripura	Dhandhuka	Ahmadabad
Rayka	Dhandhuka	Ahmadabad
Jaliya	Dhandhuka	Ahmadabad
Chharodiya	Dhandhuka	Ahmadabad
Vasana	Dhandhuka	Ahmadabad
Chhasiyana	Dhandhuka	Ahmadabad
Galsana	Dhandhuka	Ahmadabad
Vagad	Dhandhuka	Ahmadabad
Morasiya	Dhandhuka	Ahmadabad
Gunjar	Dhandhuka	Ahmadabad
Kotda	Dhandhuka	Ahmadabad
Khasta	Dhandhuka	Ahmadabad
Gamph	Dhandhuka	Ahmadabad
Valinda	Dhandhuka	Ahmadabad
Kamatalav	Dhandhuka	Ahmadabad
Ambli	Dhandhuka	Ahmadabad
Shela	Dhandhuka	Ahmadabad
Kasindra	Dhandhuka	Ahmadabad
Umargadh	Dhandhuka	Ahmadabad
Rojka	Dhandhuka	Ahmadabad
Kothadiya	Dhandhuka	Ahmadabad
Padana	Dhandhuka	Ahmadabad
Jaska	Dhandhuka	Ahmadabad
Aniyali Bhimji	Dhandhuka	Ahmadabad
Salasar	Dhandhuka	Ahmadabad
Chandarva	Dhandhuka	Ahmadabad
Unchdi	Dhandhuka	Ahmadabad
Pipal	Dhandhuka	Ahmadabad
Tagadi	Dhandhuka	Ahmadabad
Parabdi	Dhandhuka	Ahmadabad
Bhalgamda	Dhandhuka	Ahmadabad
Zinzar	Dhandhuka	Ahmadabad
Akru	Dhandhuka	Ahmadabad
Kharad	Dhandhuka	Ahmadabad
Cher	Dhandhuka	Ahmadabad
Gorasu	Dhandhuka	Ahmadabad
Bhadiyad	Dhandhuka	Ahmadabad
Kadipur	Dhandhuka	Ahmadabad
Gogla	Dhandhuka	Ahmadabad
Khun	Dhandhuka	Ahmadabad
Bhimtalav	Dhandhuka	Ahmadabad
Dholera	Dhandhuka	Ahmadabad
Otariya	Dhandhuka	Ahmadabad
Sandhida	Dhandhuka	Ahmadabad
Mundi	Dhandhuka	Ahmadabad
Rahtalav	Dhandhuka	Ahmadabad
Mahadevpura	Dhandhuka	Ahmadabad
Panchi	Dhandhuka	Ahmadabad
Bhangadh	Dhandhuka	Ahmadabad
Mingalpur	Dhandhuka	Ahmadabad
Zankhi	Dhandhuka	Ahmadabad
Bavliyari	Dhandhuka	Ahmadabad
Nava Ghatila	Halvad	Surendranagar
Tikar	Halvad	Surendranagar
Mangadh	Halvad	Surendranagar
Ajitgadh	Halvad	Surendranagar
Khod	Halvad	Surendranagar
Jogad	Halvad	Surendranagar
Enjar	Halvad	Surendranagar
Malaniyad	Halvad	Surendranagar
Kidi	Halvad	Surendranagar
Ingorala	Halvad	Surendranagar
Mayapur	Halvad	Surendranagar
Miyani	Halvad	Surendranagar
Chadadhra	Halvad	Surendranagar
Dhulkot	Halvad	Surendranagar
Survadar	Halvad	Surendranagar
Pratapagadh	Halvad	Surendranagar
Mayurnagar	Halvad	Surendranagar
Raysangpar	Halvad	Surendranagar
Nava Ghanshyamgadh	Halvad	Surendranagar
Juna Amrapar	Halvad	Surendranagar
Nava Amrapar	Halvad	Surendranagar
Isanpur	Halvad	Surendranagar
Ghanad	Halvad	Surendranagar
Ranmalpur	Halvad	Surendranagar
Mangalpur	Halvad	Surendranagar
Butvada	Halvad	Surendranagar
Vegadvav	Halvad	Surendranagar
Ranjitgadh	Halvad	Surendranagar
Kedariya	Halvad	Surendranagar
Dhanala	Halvad	Surendranagar
Juna Devaliya	Halvad	Surendranagar
Nava Devaliya	Halvad	Surendranagar
Susvav	Halvad	Surendranagar
Shiroi	Halvad	Surendranagar
Mansar	Halvad	Surendranagar
Ranekpar	Halvad	Surendranagar
Sukhpar	Halvad	Surendranagar
Chandragadh	Halvad	Surendranagar
Kavadiya	Halvad	Surendranagar
Koyba	Halvad	Surendranagar
Ghanshyampur	Halvad	Surendranagar
Merupar	Halvad	Surendranagar
Sundargadh	Halvad	Surendranagar
Kadiyana	Halvad	Surendranagar
Devipur	Halvad	Surendranagar
Charadva	Halvad	Surendranagar
Samli	Halvad	Surendranagar
Raydhra	Halvad	Surendranagar
Ranchhodgadh	Halvad	Surendranagar
Sarambhada	Halvad	Surendranagar
Pandatirath	Halvad	Surendranagar
Golasan	Halvad	Surendranagar
Bhalgamda	Halvad	Surendranagar
Dhavana	Halvad	Surendranagar
Sapkada	Halvad	Surendranagar
Dighadiya	Halvad	Surendranagar
Palasan	Halvad	Surendranagar
Sundari	Halvad	Surendranagar
Mathak	Halvad	Surendranagar
Vankiya	Halvad	Surendranagar
Ratabhe	Halvad	Surendranagar
Dungarpur	Halvad	Surendranagar
Shivpur	Halvad	Surendranagar
Manekwada	Halvad	Surendranagar
Chumpani	Halvad	Surendranagar
Khetardi	Halvad	Surendranagar
Chitrodi	Halvad	Surendranagar
Koparani	Dhrangadhra	Surendranagar
Kuda	Dhrangadhra	Surendranagar
Nimaknagar	Dhrangadhra	Surendranagar
Narali	Dhrangadhra	Surendranagar
Jesada	Dhrangadhra	Surendranagar
Thala	Dhrangadhra	Surendranagar
Sultanpur	Dhrangadhra	Surendranagar
Bharada	Dhrangadhra	Surendranagar
Malvan	Dhrangadhra	Surendranagar
Sajjanpur	Dhrangadhra	Surendranagar
Virendragadh	Dhrangadhra	Surendranagar
Satapar	Dhrangadhra	Surendranagar
Juna Ghanshyamgadh	Dhrangadhra	Surendranagar
Jasmatpur	Dhrangadhra	Surendranagar
Vaghgadh	Dhrangadhra	Surendranagar
Kankavati	Dhrangadhra	Surendranagar
Gopalgadh	Dhrangadhra	Surendranagar
Pipala	Dhrangadhra	Surendranagar
Baisabgadh	Dhrangadhra	Surendranagar
Rajpar	Dhrangadhra	Surendranagar
Isadra	Dhrangadhra	Surendranagar
Vavdi	Dhrangadhra	Surendranagar
Vasadva	Dhrangadhra	Surendranagar
Dhrumath	Dhrangadhra	Surendranagar
Manpur	Dhrangadhra	Surendranagar
Dudapur	Dhrangadhra	Surendranagar
Gala	Dhrangadhra	Surendranagar
Rajgadh	Dhrangadhra	Surendranagar
Haripur	Dhrangadhra	Surendranagar
Soladi	Dhrangadhra	Surendranagar
Chuli	Dhrangadhra	Surendranagar
Jiva	Dhrangadhra	Surendranagar
Bavali	Dhrangadhra	Surendranagar
Jasapar	Dhrangadhra	Surendranagar
Vrajpar	Dhrangadhra	Surendranagar
Jegadva	Dhrangadhra	Surendranagar
Ramgadh	Dhrangadhra	Surendranagar
Hirapur	Dhrangadhra	Surendranagar
Methan	Dhrangadhra	Surendranagar
Sarval	Dhrangadhra	Surendranagar
Sokhada	Dhrangadhra	Surendranagar
Rajcharadi	Dhrangadhra	Surendranagar
Hampar	Dhrangadhra	Surendranagar
Navalgadh	Dhrangadhra	Surendranagar
Bhechada	Dhrangadhra	Surendranagar
Gajanvav	Dhrangadhra	Surendranagar
Kondh	Dhrangadhra	Surendranagar
Ratanpar	Dhrangadhra	Surendranagar
Rampara	Dhrangadhra	Surendranagar
Raygadh	Dhrangadhra	Surendranagar
Ravaliyavadar	Dhrangadhra	Surendranagar
Narichana	Dhrangadhra	Surendranagar
Mota Ankevaliya	Dhrangadhra	Surendranagar
Dholi	Dhrangadhra	Surendranagar
Khambhda	Dhrangadhra	Surendranagar
Bharad	Dhrangadhra	Surendranagar
Ganjela	Dhrangadhra	Surendranagar
Dumana	Dhrangadhra	Surendranagar
Pratappur	Dhrangadhra	Surendranagar
Rajsitapur	Dhrangadhra	Surendranagar
Prathugadh	Dhrangadhra	Surendranagar
Gujarvadi	Dhrangadhra	Surendranagar
Devcharadi	Dhrangadhra	Surendranagar
Visnagar	Dasada	Surendranagar
Surel	Dasada	Surendranagar
Rozva	Dasada	Surendranagar
Navapura	Dasada	Surendranagar
Padiwada	Dasada	Surendranagar
Sali	Dasada	Surendranagar
Zadiyana	Dasada	Surendranagar
Chhatrot	Dasada	Surendranagar
Sushiya	Dasada	Surendranagar
Gosana	Dasada	Surendranagar
Manavada	Dasada	Surendranagar
Mera	Dasada	Surendranagar
Naviyani	Dasada	Surendranagar
Valevada	Dasada	Surendranagar
Vanod	Dasada	Surendranagar
Erwada	Dasada	Surendranagar
Adariyana	Dasada	Surendranagar
Fatepur	Dasada	Surendranagar
Vachharajpura	Dasada	Surendranagar
Zinzuwada	Dasada	Surendranagar
Dhama	Dasada	Surendranagar
Bhalgam	Dasada	Surendranagar
Panva	Dasada	Surendranagar
Bubvana	Dasada	Surendranagar
Echhvada	Dasada	Surendranagar
Alampura	Dasada	Surendranagar
Gavana	Dasada	Surendranagar
Vadgam	Dasada	Surendranagar
Zezra	Dasada	Surendranagar
Visavadi	Dasada	Surendranagar
Nagvada	Dasada	Surendranagar
Mithagodha	Dasada	Surendranagar
Mulada	Dasada	Surendranagar
Jainabad	Dasada	Surendranagar
Rasulabad	Dasada	Surendranagar
Rustamgadh	Dasada	Surendranagar
Dasada	Dasada	Surendranagar
Jagdishan	Dasada	Surendranagar
Ambala	Dasada	Surendranagar
Metasar	Dasada	Surendranagar
Kathada	Dasada	Surendranagar
Ahmedgadh	Dasada	Surendranagar
Chikasar	Dasada	Surendranagar
Odu	Dasada	Surendranagar
Savda	Dasada	Surendranagar
Goriyavad	Dasada	Surendranagar
Kochada	Dasada	Surendranagar
Malanpur	Dasada	Surendranagar
Mota Ubhada	Dasada	Surendranagar
Amnagar	Dasada	Surendranagar
Vaghada	Dasada	Surendranagar
Hathipura	Dasada	Surendranagar
Haripura	Dasada	Surendranagar
Bamanva	Dasada	Surendranagar
Degam	Dasada	Surendranagar
Bajana	Dasada	Surendranagar
Savlas	Dasada	Surendranagar
Nava Sadla	Dasada	Surendranagar
Surajpura	Dasada	Surendranagar
Jarvala	Dasada	Surendranagar
Navrangpura	Dasada	Surendranagar
Ghaspur	Dasada	Surendranagar
Upariyala	Dasada	Surendranagar
Joravarpura	Dasada	Surendranagar
Porda	Dasada	Surendranagar
Jivangadh	Dasada	Surendranagar
Kamalpur	Dasada	Surendranagar
Nani Majethi	Dasada	Surendranagar
Nana Goraiya	Dasada	Surendranagar
Malvan	Dasada	Surendranagar
Pipli	Dasada	Surendranagar
Akhiyana	Dasada	Surendranagar
Sedla	Dasada	Surendranagar
Sidhsar	Dasada	Surendranagar
Kacholiya	Dasada	Surendranagar
Moti Majethi	Dasada	Surendranagar
Rajpar	Dasada	Surendranagar
Bhadena	Dasada	Surendranagar
Hebatpur	Dasada	Surendranagar
Chhabali	Dasada	Surendranagar
Kamalpur	Dasada	Surendranagar
Ramgari	Dasada	Surendranagar
Gediya	Dasada	Surendranagar
Kherva	Dasada	Surendranagar
Zezri	Dasada	Surendranagar
Nagadka	Dasada	Surendranagar
Limbad	Dasada	Surendranagar
Pedhda	Lakhtar	Surendranagar
Nana Ankewaliya	Lakhtar	Surendranagar
Modhwana	Lakhtar	Surendranagar
Savlana	Lakhtar	Surendranagar
Ingrodi	Lakhtar	Surendranagar
Karela	Lakhtar	Surendranagar
Bhaskarpara	Lakhtar	Surendranagar
Jyotipura	Lakhtar	Surendranagar
Babajipara	Lakhtar	Surendranagar
Vitthalpara	Lakhtar	Surendranagar
Vitthalgadh	Lakhtar	Surendranagar
Kalyanpara	Lakhtar	Surendranagar
Gangad	Lakhtar	Surendranagar
Chharad	Lakhtar	Surendranagar
Dhanki	Lakhtar	Surendranagar
Lilapur	Lakhtar	Surendranagar
Kesariya	Lakhtar	Surendranagar
Sadad	Lakhtar	Surendranagar
Ghanad	Lakhtar	Surendranagar
Vana	Lakhtar	Surendranagar
Larkhadiya	Lakhtar	Surendranagar
Adalsar	Lakhtar	Surendranagar
Kadu	Lakhtar	Surendranagar
Olak	Lakhtar	Surendranagar
Vadla	Lakhtar	Surendranagar
Malika	Lakhtar	Surendranagar
Sakar	Lakhtar	Surendranagar
Dervala	Lakhtar	Surendranagar
Kalam	Lakhtar	Surendranagar
Lakhtar	Lakhtar	Surendranagar
Bajrangpura	Lakhtar	Surendranagar
Zamar	Lakhtar	Surendranagar
Talvani	Lakhtar	Surendranagar
Tanmaniya	Lakhtar	Surendranagar
Bhalala	Lakhtar	Surendranagar
Vadekhan	Lakhtar	Surendranagar
Talsana	Lakhtar	Surendranagar
Aniyali	Lakhtar	Surendranagar
Bhathariya	Lakhtar	Surendranagar
Bhadwana	Lakhtar	Surendranagar
Devaliya	Lakhtar	Surendranagar
Varsani	Lakhtar	Surendranagar
Tavi	Lakhtar	Surendranagar
Rupavati	Wadhwan	Surendranagar
Velavadar	Wadhwan	Surendranagar
Khodu	Wadhwan	Surendranagar
Nagara	Wadhwan	Surendranagar
Prangadh	Wadhwan	Surendranagar
Katuda	Wadhwan	Surendranagar
Latuda	Wadhwan	Surendranagar
Bhadreshi	Wadhwan	Surendranagar
Anindra	Wadhwan	Surendranagar
Bala	Wadhwan	Surendranagar
karangadh	Wadhwan	Surendranagar
Bakarthali	Wadhwan	Surendranagar
Adheli	Wadhwan	Surendranagar
Chamaraj	Wadhwan	Surendranagar
Mulchand	Wadhwan	Surendranagar
Rajpar	Wadhwan	Surendranagar
Kothariya	Wadhwan	Surendranagar
Dedadara	Wadhwan	Surendranagar
Zampodad	Wadhwan	Surendranagar
Vadala	Wadhwan	Surendranagar
Khamisana	Wadhwan	Surendranagar
Kherali	Wadhwan	Surendranagar
Memka	Wadhwan	Surendranagar
Khajeli	Wadhwan	Surendranagar
Bhadiyad	Wadhwan	Surendranagar
Sankali	Wadhwan	Surendranagar
Nana Kerala	Wadhwan	Surendranagar
Vaghela	Wadhwan	Surendranagar
Malod	Wadhwan	Surendranagar
Munjpur (Parmar)	Wadhwan	Surendranagar
Kholadiad	Wadhwan	Surendranagar
Timba	Wadhwan	Surendranagar
Kharva	Wadhwan	Surendranagar
Rai	Wadhwan	Surendranagar
Gomta	Wadhwan	Surendranagar
Kariyani	Wadhwan	Surendranagar
Gundiyala	Wadhwan	Surendranagar
Rampara	Wadhwan	Surendranagar
Fulgram	Wadhwan	Surendranagar
Tuva	Wadhwan	Surendranagar
Vadod	Wadhwan	Surendranagar
Baldana	Wadhwan	Surendranagar
Madhad (Muli)	Wadhwan	Surendranagar
Madhad (Wadhwan)	Wadhwan	Surendranagar
Vastadi	Wadhwan	Surendranagar
Karsangadh	Muli	Surendranagar
Ambardi	Muli	Surendranagar
Rampar	Muli	Surendranagar
Naldhari	Muli	Surendranagar
Sara	Muli	Surendranagar
Mahadevgadh	Muli	Surendranagar
Liya	Muli	Surendranagar
Kuntalpur	Muli	Surendranagar
Kalmad	Muli	Surendranagar
Pandavara	Muli	Surendranagar
Danawada	Muli	Surendranagar
Shekhpar	Muli	Surendranagar
Godavari	Muli	Surendranagar
Digsar	Muli	Surendranagar
Sujangadh	Muli	Surendranagar
Sarla	Muli	Surendranagar
Gadhada	Muli	Surendranagar
Vadadhra	Muli	Surendranagar
Velala (Dhrangadhra)	Muli	Surendranagar
Virpar	Muli	Surendranagar
Dadholiya	Muli	Surendranagar
Bhet	Muli	Surendranagar
Sangadhra	Muli	Surendranagar
Jepar	Muli	Surendranagar
Raysangpar	Muli	Surendranagar
Khampaliya	Muli	Surendranagar
Dudhai	Muli	Surendranagar
Tikar	Muli	Surendranagar
Gautamgadh	Muli	Surendranagar
Limli	Muli	Surendranagar
Kukda	Muli	Surendranagar
Muli	Muli	Surendranagar
Khatdi	Muli	Surendranagar
Dholiya	Muli	Surendranagar
Asundrali	Muli	Surendranagar
Bhavanigadh	Muli	Surendranagar
Ranipat	Muli	Surendranagar
Khakharathal	Muli	Surendranagar
Nalkhambha	Muli	Surendranagar
Manpar	Muli	Surendranagar
Khakhrala	Muli	Surendranagar
Palasa	Muli	Surendranagar
Ramparda	Muli	Surendranagar
Gadhad	Muli	Surendranagar
jasapar	Muli	Surendranagar
Chanpar	Muli	Surendranagar
Naliya	Muli	Surendranagar
Hematpar	Muli	Surendranagar
Tidana	Muli	Surendranagar
Umarda	Muli	Surendranagar
Vagadiya	Muli	Surendranagar
Devpara	Muli	Surendranagar
Velala (Sayla)	Muli	Surendranagar
Chandreliya	Muli	Surendranagar
Dharmendragadh	Muli	Surendranagar
Somasar	Muli	Surendranagar
Sidhsar	Muli	Surendranagar
Navaniya	Muli	Surendranagar
Undvi	Chotila	Surendranagar
Vijaliya	Chotila	Surendranagar
Varmadhar	Chotila	Surendranagar
Tarnetar	Chotila	Surendranagar
Manadasar	Chotila	Surendranagar
Morthala	Chotila	Surendranagar
Sarsana	Chotila	Surendranagar
Navagam (Than)	Chotila	Surendranagar
Amarapar	Chotila	Surendranagar
Kanpar	Chotila	Surendranagar
Songadh	Chotila	Surendranagar
Abhepar	Chotila	Surendranagar
Devpara	Chotila	Surendranagar
Anandpur (Than)	Chotila	Surendranagar
Hirana	Chotila	Surendranagar
Ravrani	Chotila	Surendranagar
Khakharavali	Chotila	Surendranagar
Devaliya	Chotila	Surendranagar
Lakhamachi	Chotila	Surendranagar
Rampara (Sarodi)	Chotila	Surendranagar
Sarodi	Chotila	Surendranagar
Rupavati(Sarodi)	Chotila	Surendranagar
Jamvali	Chotila	Surendranagar
Gugaliyana	Chotila	Surendranagar
Vavdi	Chotila	Surendranagar
Devsar	Chotila	Surendranagar
Rampara (Rajavad)	Chotila	Surendranagar
Naliyeri	Chotila	Surendranagar
Pajvali	Chotila	Surendranagar
Rupavati (Rajavad)	Chotila	Surendranagar
Nava	Chotila	Surendranagar
Rajavad	Chotila	Surendranagar
Magharikhada	Chotila	Surendranagar
Nana Kandhasar	Chotila	Surendranagar
Kumbhara	Chotila	Surendranagar
Navagam (Chotila)	Chotila	Surendranagar
Janivadla	Chotila	Surendranagar
Gundala	Chotila	Surendranagar
Jivapar (Bamanbore)	Chotila	Surendranagar
Bamanbore	Chotila	Surendranagar
Navagam (Bamanbore)	Chotila	Surendranagar
Moti Moldi	Chotila	Surendranagar
Nani Moldi	Chotila	Surendranagar
Chanpa	Chotila	Surendranagar
Sangani	Chotila	Surendranagar
Mota Kandhasar	Chotila	Surendranagar
Jasapar	Chotila	Surendranagar
Nani Morsal	Chotila	Surendranagar
Nana Paliyad	Chotila	Surendranagar
Dudheli	Chotila	Surendranagar
Bhimgadh	Chotila	Surendranagar
Kherdi	Chotila	Surendranagar
Zinzuda	Chotila	Surendranagar
Garida	Chotila	Surendranagar
Doshalighuna	Chotila	Surendranagar
Loma Kotadi	Chotila	Surendranagar
Mevasa (Bamanbore)	Chotila	Surendranagar
Pipaliya (Bamanbore)	Chotila	Surendranagar
Chiroda (Rajpara)	Chotila	Surendranagar
Kalasar	Chotila	Surendranagar
Lakhachokiya	Chotila	Surendranagar
Kundhada	Chotila	Surendranagar
Hirasar	Chotila	Surendranagar
Habiyasar	Chotila	Surendranagar
Piprali	Chotila	Surendranagar
Akala	Chotila	Surendranagar
Panchavada	Chotila	Surendranagar
Reshamiya	Chotila	Surendranagar
Rampara (Rajpara)	Chotila	Surendranagar
Shekhaliya	Chotila	Surendranagar
Khatadi	Chotila	Surendranagar
Rajpara (Chobari)	Chotila	Surendranagar
Tramboda	Chotila	Surendranagar
Mokasar	Chotila	Surendranagar
Piyava	Chotila	Surendranagar
Naniyani	Chotila	Surendranagar
Mota Haraniya	Chotila	Surendranagar
Surai	Chotila	Surendranagar
Bhimora	Chotila	Surendranagar
Lakhanka	Chotila	Surendranagar
Kherana	Chotila	Surendranagar
Kabran	Chotila	Surendranagar
Dakvadla	Chotila	Surendranagar
Salkhada	Chotila	Surendranagar
Fulzar	Chotila	Surendranagar
Gunda	Chotila	Surendranagar
Bhojpari	Chotila	Surendranagar
Bhojpara	Chotila	Surendranagar
Mahidad	Chotila	Surendranagar
Sanosara	Chotila	Surendranagar
Mevasa (Sanosara)	Chotila	Surendranagar
Gadhechi	Chotila	Surendranagar
Chiroda (Sanosara)	Chotila	Surendranagar
Sukhsar	Chotila	Surendranagar
Rampara (Chobari)	Chotila	Surendranagar
Chobari	Chotila	Surendranagar
Sakhpar	Chotila	Surendranagar
Tajpar	Chotila	Surendranagar
Rupavati (Anandpur)	Chotila	Surendranagar
Jivapar (Anandpur)	Chotila	Surendranagar
Ankadiya	Chotila	Surendranagar
Kanthariya	Chotila	Surendranagar
Anandpur (Bhadla)	Chotila	Surendranagar
Devpara (Anandpur)	Chotila	Surendranagar
Parabdi	Chotila	Surendranagar
Dharaie	Chotila	Surendranagar
Dhokalva	Chotila	Surendranagar
Golida	Chotila	Surendranagar
Monpar	Chotila	Surendranagar
Vadali	Chotila	Surendranagar
Pipaliya (Dhokalva)	Chotila	Surendranagar
Bhetsuda	Chotila	Surendranagar
Chitralank	Sayla	Surendranagar
Ishvariya	Sayla	Surendranagar
Chorvira (Than)	Sayla	Surendranagar
Sitagadh	Sayla	Surendranagar
Kansala	Sayla	Surendranagar
Kanpur	Sayla	Surendranagar
Bhaduka	Sayla	Surendranagar
Kashipara	Sayla	Surendranagar
Sayla	Sayla	Surendranagar
Nava Sudamda	Sayla	Surendranagar
Vakhatpar	Sayla	Surendranagar
Doliya	Sayla	Surendranagar
Aya	Sayla	Surendranagar
Sorimbhda	Sayla	Surendranagar
Hadala	Sayla	Surendranagar
Dharadungri	Sayla	Surendranagar
Brahmapuri (Vanki)	Sayla	Surendranagar
Shapar	Sayla	Surendranagar
Dhedhuki	Sayla	Surendranagar
Samatpar	Sayla	Surendranagar
Kesarpar	Sayla	Surendranagar
Gosal	Sayla	Surendranagar
Madargadh	Sayla	Surendranagar
Juna Jashapar	Sayla	Surendranagar
Nava Jashapar	Sayla	Surendranagar
Thoriyali	Sayla	Surendranagar
Mota Kerala	Sayla	Surendranagar
Vadiya	Sayla	Surendranagar
Nathupara	Sayla	Surendranagar
Sudamda	Sayla	Surendranagar
chhadiyali	Sayla	Surendranagar
Sejakpar	Sayla	Surendranagar
Mota Sakhpar	Sayla	Surendranagar
Dhankaniya	Sayla	Surendranagar
Mangalkui	Sayla	Surendranagar
Sonpari	Sayla	Surendranagar
Ratanpar	Sayla	Surendranagar
Morsal	Sayla	Surendranagar
Ratadki	Sayla	Surendranagar
Titoda	Sayla	Surendranagar
Dhamrasala	Sayla	Surendranagar
Ovangadh	Sayla	Surendranagar
Vanta Vachh	Sayla	Surendranagar
Shirvaniya	Sayla	Surendranagar
Gadhshirvaniya	Sayla	Surendranagar
Sangoi	Sayla	Surendranagar
Nagadka	Sayla	Surendranagar
Loya	Sayla	Surendranagar
Chorvira (D)	Sayla	Surendranagar
Mota Bhadla	Sayla	Surendranagar
Noli	Sayla	Surendranagar
Lakhavad	Sayla	Surendranagar
Khintla	Sayla	Surendranagar
Gundiyavada	Sayla	Surendranagar
Dhandhalpur	Sayla	Surendranagar
Sokhada	Sayla	Surendranagar
Adala	Sayla	Surendranagar
Navagam	Sayla	Surendranagar
Karadi	Sayla	Surendranagar
Dhajala	Sayla	Surendranagar
Limbala	Sayla	Surendranagar
Nadala (Devgadh)	Sayla	Surendranagar
Garambhadi	Sayla	Surendranagar
Dhinkwali	Sayla	Surendranagar
Kotda	Sayla	Surendranagar
Pipaliya	Sayla	Surendranagar
Nana Haraniya	Sayla	Surendranagar
Ori	Sayla	Surendranagar
Shekhdod	Sayla	Surendranagar
Ninama	Sayla	Surendranagar
Nana Matra	Sayla	Surendranagar
Kaswali	Sayla	Surendranagar
Goraiya	Sayla	Surendranagar
Gangajal	Sayla	Surendranagar
Samadhiyala	Sayla	Surendranagar
Navi Morwad	Chuda	Surendranagar
Juni Morwad	Chuda	Surendranagar
Samdhiyala	Chuda	Surendranagar
Jepar	Chuda	Surendranagar
Laliyad	Chuda	Surendranagar
Karol	Chuda	Surendranagar
Mojidad	Chuda	Surendranagar
Acharda	Chuda	Surendranagar
Chamardi	Chuda	Surendranagar
Darod	Chuda	Surendranagar
Chachana	Chuda	Surendranagar
Khandiya	Chuda	Surendranagar
Sejakpar	Chuda	Surendranagar
Bhrugupur	Chuda	Surendranagar
Gokharwala	Chuda	Surendranagar
Chuda	Chuda	Surendranagar
Velavadar	Chuda	Surendranagar
Chokdi	Chuda	Surendranagar
Korda	Chuda	Surendranagar
Bhanejada	Chuda	Surendranagar
Kudla	Chuda	Surendranagar
Chachka	Chuda	Surendranagar
Ramdevgadh	Chuda	Surendranagar
Zinzavadar	Chuda	Surendranagar
Chhatriyala	Chuda	Surendranagar
Karmad	Chuda	Surendranagar
Zobala	Chuda	Surendranagar
Chhalala	Chuda	Surendranagar
Kanthariya	Chuda	Surendranagar
Vanala	Chuda	Surendranagar
Rangpur	Chuda	Surendranagar
Balala	Chuda	Surendranagar
Vejalka	Chuda	Surendranagar
Minapur	Chuda	Surendranagar
Bhensjal	Chuda	Surendranagar
Vaniyavadar	Chuda	Surendranagar
Nagnesh	Chuda	Surendranagar
Sontha	Chuda	Surendranagar
Moti Kathechi	Limbdi	Surendranagar
Nani Kathechi	Limbdi	Surendranagar
Gadthal	Limbdi	Surendranagar
Jaliyala	Limbdi	Surendranagar
Bhagwanpar	Limbdi	Surendranagar
Ranagadh	Limbdi	Surendranagar
Fulwadi	Limbdi	Surendranagar
Rojasar	Limbdi	Surendranagar
Dhalwana	Limbdi	Surendranagar
Mulbavla	Limbdi	Surendranagar
Digvijaygadh	Limbdi	Surendranagar
Dhirajgadh	Limbdi	Surendranagar
Parali	Limbdi	Surendranagar
Bhathan	Limbdi	Surendranagar
Laxmisar	Limbdi	Surendranagar
Shiyani	Limbdi	Surendranagar
Jambu	Limbdi	Surendranagar
Parnala	Limbdi	Surendranagar
Jasmatpar	Limbdi	Surendranagar
Jalampar	Limbdi	Surendranagar
Ralol	Limbdi	Surendranagar
Gedi	Limbdi	Surendranagar
Ramrajpar	Limbdi	Surendranagar
Nana Timbla	Limbdi	Surendranagar
Natwargadh	Limbdi	Surendranagar
Ghaghretiya	Limbdi	Surendranagar
Umedpar	Limbdi	Surendranagar
Dolatpar	Limbdi	Surendranagar
Samla	Limbdi	Surendranagar
Raska	Limbdi	Surendranagar
Ankewaliya	Limbdi	Surendranagar
Bhalgamda	Limbdi	Surendranagar
Mota Timbla	Limbdi	Surendranagar
Ghaghosar	Limbdi	Surendranagar
Katariya	Limbdi	Surendranagar
Tokrala	Limbdi	Surendranagar
Kanpara	Limbdi	Surendranagar
Ghanshyampar	Limbdi	Surendranagar
Jansali	Limbdi	Surendranagar
Balol	Limbdi	Surendranagar
Devpara	Limbdi	Surendranagar
Panshina	Limbdi	Surendranagar
Khambhlav	Limbdi	Surendranagar
Jakhan	Limbdi	Surendranagar
Choki	Limbdi	Surendranagar
Choraniya	Limbdi	Surendranagar
Untadi	Limbdi	Surendranagar
Bodiya	Limbdi	Surendranagar
Ughal	Limbdi	Surendranagar
Borana	Limbdi	Surendranagar
Liyad	Limbdi	Surendranagar
Sauka	Limbdi	Surendranagar
Pandri	Limbdi	Surendranagar
Borna	Limbdi	Surendranagar
Zamdi	Limbdi	Surendranagar
Bhoika	Limbdi	Surendranagar
Bhojpara	Limbdi	Surendranagar
Kamalpar	Limbdi	Surendranagar
Aanandpar	Limbdi	Surendranagar
Hadala	Limbdi	Surendranagar
Jasapar	Limbdi	Surendranagar
Dholi	Limbdi	Surendranagar
Vakhatpar	Limbdi	Surendranagar
Jajasar	Maliya	Rajkot
Haripar	Maliya	Rajkot
Kajarda	Maliya	Rajkot
Chikhli	Maliya	Rajkot
Venasar	Maliya	Rajkot
Mandarki	Maliya	Rajkot
Ghantila	Maliya	Rajkot
Vejalpar	Maliya	Rajkot
Kumbhariya	Maliya	Rajkot
Vardusar	Maliya	Rajkot
Khirai	Maliya	Rajkot
Fattepar	Maliya	Rajkot
Rasangpar	Maliya	Rajkot
Songadh	Maliya	Rajkot
Nani Barar	Maliya	Rajkot
Bhavpar	Maliya	Rajkot
Bagasara	Maliya	Rajkot
Vavaniya	Maliya	Rajkot
Laxmivas	Maliya	Rajkot
Varsamedi	Maliya	Rajkot
Chamanpar	Maliya	Rajkot
Nana Bhela	Maliya	Rajkot
Mota Bhela	Maliya	Rajkot
Moti Barar	Maliya	Rajkot
Jasapar	Maliya	Rajkot
Navagam	Maliya	Rajkot
Virvadarka	Maliya	Rajkot
Vadharva	Maliya	Rajkot
Sultanpur	Maliya	Rajkot
Manaba	Maliya	Rajkot
Khakhrechi	Maliya	Rajkot
Rohishala	Maliya	Rajkot
Meghpar	Maliya	Rajkot
Derala	Maliya	Rajkot
Sarvad	Maliya	Rajkot
Targhari	Maliya	Rajkot
Mota Dahisara	Maliya	Rajkot
Navlakhi	Maliya	Rajkot
Lavanpur	Maliya	Rajkot
Bodki	Maliya	Rajkot
Khirsara	Maliya	Rajkot
Dahisara Nana	Maliya	Rajkot
Chanchavadarda	Maliya	Rajkot
Mahendragadh	Maliya	Rajkot
Kuntasi	Maliya	Rajkot
Sokhda	Morvi	Rajkot
Bahadurgadh	Morvi	Rajkot
Nava Nagdavas	Morvi	Rajkot
Piludi	Morvi	Rajkot
Rapar	Morvi	Rajkot
Aniyari	Morvi	Rajkot
Jetpar	Morvi	Rajkot
Vaghpar	Morvi	Rajkot
Juna Nagdavas	Morvi	Rajkot
Gungan	Morvi	Rajkot
Gala	Morvi	Rajkot
Sapar	Morvi	Rajkot
Jasmatgadh	Morvi	Rajkot
Chakampar	Morvi	Rajkot
Zinkiyali	Morvi	Rajkot
Jivapar Chakampar	Morvi	Rajkot
Kerala	Morvi	Rajkot
Haripar	Morvi	Rajkot
Nava Sadulka	Morvi	Rajkot
Ravapar Nadi	Morvi	Rajkot
Mansar	Morvi	Rajkot
Naranka	Morvi	Rajkot
Pipaliya	Morvi	Rajkot
Virparda	Morvi	Rajkot
Hajnali	Morvi	Rajkot
Modpar	Morvi	Rajkot
Lutavadar	Morvi	Rajkot
Barvala	Morvi	Rajkot
Khevaliya	Morvi	Rajkot
Khakhrala	Morvi	Rajkot
Vanaliya	Morvi	Rajkot
Juna Sadulka	Morvi	Rajkot
Bela Rangpar	Morvi	Rajkot
Rangpar	Morvi	Rajkot
Khareda	Morvi	Rajkot
Andarna	Morvi	Rajkot
Vankda	Morvi	Rajkot
Sanala (Talaviya)	Morvi	Rajkot
Pipali	Morvi	Rajkot
Timbdi	Morvi	Rajkot
Dharampur	Morvi	Rajkot
Gor Khijadia	Morvi	Rajkot
Jepur	Morvi	Rajkot
Bagathala	Morvi	Rajkot
Biliya	Morvi	Rajkot
Kantipur	Morvi	Rajkot
Manekvada	Morvi	Rajkot
Nagalpar	Morvi	Rajkot
Nani Vavdi	Morvi	Rajkot
Amreli (Part)	Morvi	Rajkot
Ghuntu	Morvi	Rajkot
Unchi Mandal	Morvi	Rajkot
Nichi Mandal	Morvi	Rajkot
Kalikanagar	Morvi	Rajkot
Lakhdhirpur	Morvi	Rajkot
Lalpar	Morvi	Rajkot
Madhapar (Part)	Morvi	Rajkot
Panchasar	Morvi	Rajkot
Amrapar Nag	Morvi	Rajkot
Moti Vavdi	Morvi	Rajkot
Khanpar	Morvi	Rajkot
Chanchapar	Morvi	Rajkot
Thorala	Morvi	Rajkot
Rajpar	Morvi	Rajkot
Bhadiyad (Part)	Morvi	Rajkot
Jodhpur Nadi	Morvi	Rajkot
Jambudiya	Morvi	Rajkot
Paneli	Morvi	Rajkot
Gidach	Morvi	Rajkot
Makansar	Morvi	Rajkot
Adepar	Morvi	Rajkot
Lakhdhirnagar	Morvi	Rajkot
Lilapar	Morvi	Rajkot
Ghunada Sajanpar	Morvi	Rajkot
Nesda Khanpar	Tankara	Rajkot
Mahendrapur	Tankara	Rajkot
Nana Rampar	Tankara	Rajkot
Nasitpar	Tankara	Rajkot
Virpar	Tankara	Rajkot
Lajai	Tankara	Rajkot
Rajavad	Tankara	Rajkot
Nana Khijadiya	Tankara	Rajkot
Ghunada Khanpar	Tankara	Rajkot
Meghpar Zala	Tankara	Rajkot
Mota Khijadiya	Tankara	Rajkot
Lakhdhir Gadh	Tankara	Rajkot
Hadmatiya	Tankara	Rajkot
Sajanpar	Tankara	Rajkot
Tankara	Tankara	Rajkot
Vaghgadh	Tankara	Rajkot
Bangavadi	Tankara	Rajkot
Khakhra	Tankara	Rajkot
Otala	Tankara	Rajkot
Devaliya	Tankara	Rajkot
Nesda Surji	Tankara	Rajkot
Kalyanpur	Tankara	Rajkot
Jabalpur	Tankara	Rajkot
Amrapar (Tol)	Tankara	Rajkot
Tol	Tankara	Rajkot
JivaparTankara	Tankara	Rajkot
Harbatiyali	Tankara	Rajkot
Hirapar	Tankara	Rajkot
Saraya	Tankara	Rajkot
Savdi	Tankara	Rajkot
Jodhpar (Zala)	Tankara	Rajkot
Virvav	Tankara	Rajkot
Bhutkotda	Tankara	Rajkot
Mitana	Tankara	Rajkot
Dhroliya	Tankara	Rajkot
Rohishala	Tankara	Rajkot
Neknam	Tankara	Rajkot
Hamirpar	Tankara	Rajkot
Chhattar	Tankara	Rajkot
Kagdadi	Tankara	Rajkot
Vachhakpar	Tankara	Rajkot
Sakhpar	Tankara	Rajkot
Kothariya	Tankara	Rajkot
Bedi	Tankara	Rajkot
Hadala	Tankara	Rajkot
Anandpar	Tankara	Rajkot
Vijaynagar	Tankara	Rajkot
Ol	Wankaner	Rajkot
Jambudiya Vidi	Wankaner	Rajkot
Samtherva	Wankaner	Rajkot
Bhimguda	Wankaner	Rajkot
Virpar	Wankaner	Rajkot
Ratavirda	Wankaner	Rajkot
Sartanpar	Wankaner	Rajkot
Matel	Wankaner	Rajkot
Jamsar	Wankaner	Rajkot
Nagalpar	Wankaner	Rajkot
Rajgadh	Wankaner	Rajkot
Vardusar	Wankaner	Rajkot
Maktanpar	Wankaner	Rajkot
Anandpar	Wankaner	Rajkot
Lakaddhar	Wankaner	Rajkot
Dhuva	Wankaner	Rajkot
Panchasiya	Wankaner	Rajkot
Ranekpar	Wankaner	Rajkot
Jambudiya Bhayati	Wankaner	Rajkot
Vithalpar	Wankaner	Rajkot
Paddhara	Wankaner	Rajkot
Bherda	Wankaner	Rajkot
Palans	Wankaner	Rajkot
Chitrakhada	Wankaner	Rajkot
Lunasar	Wankaner	Rajkot
Khanpar	Wankaner	Rajkot
Derala	Wankaner	Rajkot
Jali	Wankaner	Rajkot
Jetparda	Wankaner	Rajkot
Bhojpara	Wankaner	Rajkot
Vaghasia	Wankaner	Rajkot
Vankiya	Wankaner	Rajkot
Kothariya	Wankaner	Rajkot
Rati Devli	Wankaner	Rajkot
Panchasar	Wankaner	Rajkot
Hasanpar	Wankaner	Rajkot
Palansdi	Wankaner	Rajkot
Sardharka	Wankaner	Rajkot
Rajthali	Wankaner	Rajkot
Gangiyavadar	Wankaner	Rajkot
Kachhiyagala	Wankaner	Rajkot
Lunsariya	Wankaner	Rajkot
Dhamalpar	Wankaner	Rajkot
Tithava	Wankaner	Rajkot
Arni Timba	Wankaner	Rajkot
Valasan	Wankaner	Rajkot
Pipaliyaraj	Wankaner	Rajkot
Panch Dwarka	Wankaner	Rajkot
Amarsar	Wankaner	Rajkot
Kerala	Wankaner	Rajkot
Bokad Thambha	Wankaner	Rajkot
Dighaliya	Wankaner	Rajkot
Kashipar	Wankaner	Rajkot
Daldi	Wankaner	Rajkot
Paj	Wankaner	Rajkot
Rasikgadh	Wankaner	Rajkot
Lalpar	Wankaner	Rajkot
Limbala	Wankaner	Rajkot
Rajavadla	Wankaner	Rajkot
Sindhavadar	Wankaner	Rajkot
Pratapgadh	Wankaner	Rajkot
Kalavadi Navi	Wankaner	Rajkot
Kotda Nayani	Wankaner	Rajkot
Pipaliya Agabhi	Wankaner	Rajkot
Kalavadi Juni	Wankaner	Rajkot
Kankot	Wankaner	Rajkot
Khijadiya	Wankaner	Rajkot
Bhojpara Vidi	Wankaner	Rajkot
Jodhpar	Wankaner	Rajkot
Gariya	Wankaner	Rajkot
Kanpar	Wankaner	Rajkot
Shekhardi	Wankaner	Rajkot
Chanchadiya	Wankaner	Rajkot
Vinaygadh	Wankaner	Rajkot
Ratadiya	Wankaner	Rajkot
Mahika	Wankaner	Rajkot
Kothi	Wankaner	Rajkot
Jalsika	Wankaner	Rajkot
Ghiyavad	Wankaner	Rajkot
Vanzara	Wankaner	Rajkot
Kherva	Wankaner	Rajkot
Khakhana	Wankaner	Rajkot
Pipardi	Wankaner	Rajkot
Holmadh	Wankaner	Rajkot
Garida	Wankaner	Rajkot
Samadhiala	Wankaner	Rajkot
Gundakhada	Wankaner	Rajkot
Satapar	Wankaner	Rajkot
Vithalgadh	Wankaner	Rajkot
Tarakiya	Wankaner	Rajkot
Adepar	Wankaner	Rajkot
Mesariya	Wankaner	Rajkot
Rangpar	Wankaner	Rajkot
Jalida	Wankaner	Rajkot
Vasundra	Wankaner	Rajkot
Rupavati	Wankaner	Rajkot
Jepur	Wankaner	Rajkot
Bhalgam	Wankaner	Rajkot
Thikariyala	Wankaner	Rajkot
Thoriyali	Paddhari	Rajkot
Khodapipar	Paddhari	Rajkot
Khakhada Bela	Paddhari	Rajkot
Khajurdi	Paddhari	Rajkot
Khamta	Paddhari	Rajkot
Haripar	Paddhari	Rajkot
Dahisarda (Aji)	Paddhari	Rajkot
Ukarda	Paddhari	Rajkot
Govindpar	Paddhari	Rajkot
Depaliya	Paddhari	Rajkot
Rupavati	Paddhari	Rajkot
Jodhpar Chhala	Paddhari	Rajkot
Hadmatiya	Paddhari	Rajkot
Chanol Moti	Paddhari	Rajkot
Chanol Nani	Paddhari	Rajkot
Khijadiya Nana	Paddhari	Rajkot
Vanpari	Paddhari	Rajkot
Moviya	Paddhari	Rajkot
Adbalka	Paddhari	Rajkot
Gadhda	Paddhari	Rajkot
Dungarka	Paddhari	Rajkot
Rampar Mota	Paddhari	Rajkot
Bodi Ghodi	Paddhari	Rajkot
Chanol Navi	Paddhari	Rajkot
Fatepar	Paddhari	Rajkot
Visaman	Paddhari	Rajkot
Khokhri	Paddhari	Rajkot
Jivapar	Paddhari	Rajkot
Dhunana Gam	Paddhari	Rajkot
Jhilariya	Paddhari	Rajkot
Rampar Pati	Paddhari	Rajkot
Vachli Ghodi	Paddhari	Rajkot
Chhelli Ghodi	Paddhari	Rajkot
Metoda	Paddhari	Rajkot
Targhari	Paddhari	Rajkot
Baghi	Paddhari	Rajkot
Naranka	Paddhari	Rajkot
Khandheri	Paddhari	Rajkot
Rangpar	Paddhari	Rajkot
Sarapdad	Paddhari	Rajkot
Khijadiya Mota	Paddhari	Rajkot
Rojiya	Paddhari	Rajkot
Dahisarda Und	Paddhari	Rajkot
Sal Pipaliya	Paddhari	Rajkot
Radad	Paddhari	Rajkot
Kerala	Paddhari	Rajkot
Khambhala	Paddhari	Rajkot
Nyara	Paddhari	Rajkot
Dhokaliya	Paddhari	Rajkot
Suvag	Paddhari	Rajkot
Hidad	Paddhari	Rajkot
Domda Bhayuna	Paddhari	Rajkot
Sagaliya Nana	Paddhari	Rajkot
Intala Nana	Paddhari	Rajkot
Nanavada	Paddhari	Rajkot
Amreli	Paddhari	Rajkot
Ishvariya	Paddhari	Rajkot
Jaliya	Rajkot	Rajkot
Ratanpar	Rajkot	Rajkot
Khorana	Rajkot	Rajkot
Sanosara	Rajkot	Rajkot
Rampara (Suliya)	Rajkot	Rajkot
Vankvad	Rajkot	Rajkot
Hirasar	Rajkot	Rajkot
Satda	Rajkot	Rajkot
Jhiyana	Rajkot	Rajkot
Khijadiya	Rajkot	Rajkot
Nagalpar	Rajkot	Rajkot
Rajgadh	Rajkot	Rajkot
Gavaridad	Rajkot	Rajkot
Para Pipaliya	Rajkot	Rajkot
Hadmatiya (Bedi)	Rajkot	Rajkot
Nakaravadi	Rajkot	Rajkot
Pipaliya	Rajkot	Rajkot
Ranpar	Rajkot	Rajkot
Kuchiyadad	Rajkot	Rajkot
Rampara Beti	Rajkot	Rajkot
Parevala	Rajkot	Rajkot
Saypar	Rajkot	Rajkot
Kuvadva	Rajkot	Rajkot
Dhamalpar	Rajkot	Rajkot
Sokhada	Rajkot	Rajkot
Ronki	Rajkot	Rajkot
Vajdi Gadh	Rajkot	Rajkot
Vejagam	Rajkot	Rajkot
Maliyasan	Rajkot	Rajkot
Targhadiya	Rajkot	Rajkot
Gunda	Rajkot	Rajkot
Magharvada	Rajkot	Rajkot
Mesvada	Rajkot	Rajkot
Barvan	Rajkot	Rajkot
Chanchadiya	Rajkot	Rajkot
Jamgadh	Rajkot	Rajkot
Rafala	Rajkot	Rajkot
Kherdi	Rajkot	Rajkot
Amargadh	Rajkot	Rajkot
Vajdi (Virda)	Rajkot	Rajkot
Mahika	Rajkot	Rajkot
Thebachda	Rajkot	Rajkot
Gadhka	Rajkot	Rajkot
Bedla	Rajkot	Rajkot
Fadadang	Rajkot	Rajkot
Deroi	Rajkot	Rajkot
Dhandhni	Rajkot	Rajkot
Kasturbadham	Rajkot	Rajkot
Kalipat	Rajkot	Rajkot
Lampasari	Rajkot	Rajkot
Kankot	Rajkot	Rajkot
Ramnagar	Rajkot	Rajkot
Khokhadadad	Rajkot	Rajkot
Vadali	Rajkot	Rajkot
Aniyala	Rajkot	Rajkot
Dhandhiya	Rajkot	Rajkot
Hadmatiya (Golida)	Rajkot	Rajkot
Golida	Rajkot	Rajkot
Sajadiali Lili	Rajkot	Rajkot
Samadhiyala	Rajkot	Rajkot
Padasan	Rajkot	Rajkot
Lothada	Rajkot	Rajkot
Bhayasar	Rajkot	Rajkot
Kathrota	Rajkot	Rajkot
Lodhida	Rajkot	Rajkot
Lakhapar	Rajkot	Rajkot
Bhupgadh	Rajkot	Rajkot
Sardhar	Rajkot	Rajkot
Navagam	Rajkot	Rajkot
Chitravav	Rajkot	Rajkot
Rampara	Rajkot	Rajkot
Sar	Rajkot	Rajkot
Sajadiali Suki	Rajkot	Rajkot
Haripar	Rajkot	Rajkot
Kharachiya	Rajkot	Rajkot
Bhangda	Rajkot	Rajkot
Halenda	Rajkot	Rajkot
Umrali	Rajkot	Rajkot
Makanpar	Rajkot	Rajkot
Badpar	Rajkot	Rajkot
Hodthali	Rajkot	Rajkot
Dungarpar	Rajkot	Rajkot
Und Khijadiya	Lodhika	Rajkot
Dhudiya Domda	Lodhika	Rajkot
Laxmi Intala	Lodhika	Rajkot
Pambhar Intala	Lodhika	Rajkot
Haripar Pal	Lodhika	Rajkot
Rataiya	Lodhika	Rajkot
Motavada	Lodhika	Rajkot
Nagar Pipaliya	Lodhika	Rajkot
Devla	Lodhika	Rajkot
Khirsara (Ranmalji)	Lodhika	Rajkot
Metoda	Lodhika	Rajkot
Vajdi (Vad)	Lodhika	Rajkot
Jashvantpur	Lodhika	Rajkot
Vagudad	Lodhika	Rajkot
Devgam	Lodhika	Rajkot
Chhapra	Lodhika	Rajkot
Pipardi	Lodhika	Rajkot
Ratanpar	Lodhika	Rajkot
Balsar	Lodhika	Rajkot
Haripar Taravada	Lodhika	Rajkot
Pal	Lodhika	Rajkot
Kangashiyali	Lodhika	Rajkot
Dholara	Lodhika	Rajkot
Ravki	Lodhika	Rajkot
Taravada	Lodhika	Rajkot
Chibhda	Lodhika	Rajkot
Abhepar	Lodhika	Rajkot
Chandli	Lodhika	Rajkot
Jetakuba	Lodhika	Rajkot
Nadhu Pipaliya	Lodhika	Rajkot
Kotha Pipaliya	Lodhika	Rajkot
Lodhika	Lodhika	Rajkot
Sanganva	Lodhika	Rajkot
Makhavad	Lodhika	Rajkot
Khambha	Lodhika	Rajkot
Virva	Lodhika	Rajkot
Pardi	Lodhika	Rajkot
Pipaliya Pal	Lodhika	Rajkot
Noghanchora	Kotda Sangani	Rajkot
Kalambhdi	Kotda Sangani	Rajkot
Champabeda	Kotda Sangani	Rajkot
Thordi	Kotda Sangani	Rajkot
Navi Mengani	Kotda Sangani	Rajkot
Juni Mengani	Kotda Sangani	Rajkot
Padavala	Kotda Sangani	Rajkot
Piplana	Kotda Sangani	Rajkot
Naranka	Kotda Sangani	Rajkot
Bhadoi	Kotda Sangani	Rajkot
Rajpara	Kotda Sangani	Rajkot
Anandpar	Kotda Sangani	Rajkot
Ardoi	Kotda Sangani	Rajkot
Ambaliala	Kotda Sangani	Rajkot
Anida	Kotda Sangani	Rajkot
Hadamatala	Kotda Sangani	Rajkot
Soliya	Kotda Sangani	Rajkot
Bhadva	Kotda Sangani	Rajkot
Devaliya	Kotda Sangani	Rajkot
Kotda Sangani	Kotda Sangani	Rajkot
Khokhri	Kotda Sangani	Rajkot
Panchtalavda	Kotda Sangani	Rajkot
Juna Rajpipla	Kotda Sangani	Rajkot
Nava Rajpipla	Kotda Sangani	Rajkot
Mota Mandava	Kotda Sangani	Rajkot
Manekvada	Kotda Sangani	Rajkot
Rajgadh	Kotda Sangani	Rajkot
Khareda	Kotda Sangani	Rajkot
Vadiya	Kotda Sangani	Rajkot
Vadipara	Kotda Sangani	Rajkot
Pipaliya Karmal	Kotda Sangani	Rajkot
Nana Mandava	Kotda Sangani	Rajkot
Ramod	Kotda Sangani	Rajkot
Bagdadiya	Kotda Sangani	Rajkot
Sandhavaya	Kotda Sangani	Rajkot
Detadiya	Kotda Sangani	Rajkot
Rampara	Kotda Sangani	Rajkot
Satapar	Kotda Sangani	Rajkot
Shishak	Kotda Sangani	Rajkot
Boghravadar	Jasdan	Rajkot
Ranjitgadh	Jasdan	Rajkot
Raningpar	Jasdan	Rajkot
Dhedhuki	Jasdan	Rajkot
Ajmer	Jasdan	Rajkot
Chhasiya	Jasdan	Rajkot
Mota Hadmatiya	Jasdan	Rajkot
Moti Lakhavad	Jasdan	Rajkot
Kharachiya Jas	Jasdan	Rajkot
Mota Matra	Jasdan	Rajkot
Vangadhara	Jasdan	Rajkot
Thoriyali	Jasdan	Rajkot
Vinchhiya	Jasdan	Rajkot
Revaniya	Jasdan	Rajkot
Dadli	Jasdan	Rajkot
Veraval Bhadla	Jasdan	Rajkot
Virpur	Jasdan	Rajkot
Bhandariya	Jasdan	Rajkot
Gadhadiya (Jam)	Jasdan	Rajkot
Adhiya	Jasdan	Rajkot
Bhadla	Jasdan	Rajkot
Dahinsara	Jasdan	Rajkot
Gundala (Jas)	Jasdan	Rajkot
Kotda	Jasdan	Rajkot
Rupavati	Jasdan	Rajkot
Pipardi	Jasdan	Rajkot
Kandhevaliya	Jasdan	Rajkot
Amrapur	Jasdan	Rajkot
Hingolgadh	Jasdan	Rajkot
Khadkana	Jasdan	Rajkot
Kaduka	Jasdan	Rajkot
Madava	Jasdan	Rajkot
Kamlapur	Jasdan	Rajkot
Raja Vadla Jam	Jasdan	Rajkot
Ramaliya	Jasdan	Rajkot
Khadvavdi	Jasdan	Rajkot
Kanesara	Jasdan	Rajkot
Kundani	Jasdan	Rajkot
Rajavadla Jas	Jasdan	Rajkot
Barvala	Jasdan	Rajkot
Parewala	Jasdan	Rajkot
Devpara	Jasdan	Rajkot
Lilapur	Jasdan	Rajkot
Lalavadar	Jasdan	Rajkot
Bhonyra	Jasdan	Rajkot
Hathasani	Jasdan	Rajkot
Janada	Jasdan	Rajkot
Veraval Bhadli	Jasdan	Rajkot
Sanali	Jasdan	Rajkot
Asalpar	Jasdan	Rajkot
Devdhari	Jasdan	Rajkot
Patiyali	Jasdan	Rajkot
Modhuka	Jasdan	Rajkot
Fulzar	Jasdan	Rajkot
Kalasar	Jasdan	Rajkot
Hadmatiya khanda	Jasdan	Rajkot
Bakhalvad	Jasdan	Rajkot
Polarpar	Jasdan	Rajkot
Kothi	Jasdan	Rajkot
Nani Lakhavad	Jasdan	Rajkot
Virnagar	Jasdan	Rajkot
Baldhoi	Jasdan	Rajkot
Kharachiya Jam	Jasdan	Rajkot
Atkot	Jasdan	Rajkot
Chitaliya	Jasdan	Rajkot
Gadhadiya (Jas)	Jasdan	Rajkot
Shivrajpur	Jasdan	Rajkot
Madhavipur	Jasdan	Rajkot
Godladhar	Jasdan	Rajkot
Som Pipaliya	Jasdan	Rajkot
Bandhali	Jasdan	Rajkot
Ankadiya	Jasdan	Rajkot
Sartanpar	Jasdan	Rajkot
Belda	Jasdan	Rajkot
Sanala	Jasdan	Rajkot
Vanala	Jasdan	Rajkot
Somalpar	Jasdan	Rajkot
Navagam	Jasdan	Rajkot
Vadod	Jasdan	Rajkot
Jangvad	Jasdan	Rajkot
Panchavada	Jasdan	Rajkot
Jasapar	Jasdan	Rajkot
Kanpar	Jasdan	Rajkot
Ishvariya	Jasdan	Rajkot
Veraval sanathali	Jasdan	Rajkot
Dolatpar	Jasdan	Rajkot
Pratappur	Jasdan	Rajkot
Juna Pipaliya	Jasdan	Rajkot
Jivapar	Jasdan	Rajkot
Gundala Jam	Jasdan	Rajkot
Gokhlana	Jasdan	Rajkot
Ambardi	Jasdan	Rajkot
Bhadli	Jasdan	Rajkot
Gadhala	Jasdan	Rajkot
Kansloliya	Jasdan	Rajkot
Sanathali	Jasdan	Rajkot
Dodiyala	Jasdan	Rajkot
Meghpar	Jasdan	Rajkot
Madhda	Jasdan	Rajkot
Zundala	Jasdan	Rajkot
Ranparda	Jasdan	Rajkot
Mungavavdi	Gondal	Rajkot
Rib	Gondal	Rajkot
Ribda	Gondal	Rajkot
Gundasara	Gondal	Rajkot
Pipaliya	Gondal	Rajkot
Bharudi	Gondal	Rajkot
Daliya	Gondal	Rajkot
Valadhari	Gondal	Rajkot
Patiyali	Gondal	Rajkot
Hadamatala	Gondal	Rajkot
Ambardi	Gondal	Rajkot
Vanthali	Gondal	Rajkot
Betavad	Gondal	Rajkot
Kolithad	Gondal	Rajkot
Lunivav	Gondal	Rajkot
Analgadh	Gondal	Rajkot
Sindhavadar	Gondal	Rajkot
Mahika Nana	Gondal	Rajkot
Mahika Mota	Gondal	Rajkot
Bhunava	Gondal	Rajkot
Biliyala	Gondal	Rajkot
Shemla	Gondal	Rajkot
Panchiyavadar	Gondal	Rajkot
Bhojpara	Gondal	Rajkot
Nagadka	Gondal	Rajkot
Umvada Mota	Gondal	Rajkot
Umvada Nana	Gondal	Rajkot
Vejagam	Gondal	Rajkot
Garnala	Gondal	Rajkot
Hadmadiya	Gondal	Rajkot
Mespar	Gondal	Rajkot
Trakuda	Gondal	Rajkot
Daiya	Gondal	Rajkot
Anida	Gondal	Rajkot
Vachhra	Gondal	Rajkot
Khandadhar	Gondal	Rajkot
Dadva Hamirpara	Gondal	Rajkot
Kamarkotda	Gondal	Rajkot
Bandhiya	Gondal	Rajkot
Ghoghavadar	Gondal	Rajkot
Rupavati	Gondal	Rajkot
Jamvali	Gondal	Rajkot
Gundala	Gondal	Rajkot
Patidad	Gondal	Rajkot
Vekri	Gondal	Rajkot
Padavala	Gondal	Rajkot
Charakhdi	Gondal	Rajkot
Chordi	Gondal	Rajkot
Kantoliya	Gondal	Rajkot
Moviya	Gondal	Rajkot
Bildi	Gondal	Rajkot
Shrinathgadh	Gondal	Rajkot
Vorakotda	Gondal	Rajkot
Gomta	Gondal	Rajkot
Navagam	Gondal	Rajkot
Bandra	Gondal	Rajkot
Devachadi	Gondal	Rajkot
Mandankundla	Gondal	Rajkot
Kamadhiya	Gondal	Rajkot
Keshvala	Gondal	Rajkot
Vasavad	Gondal	Rajkot
Meta Khambhaliya	Gondal	Rajkot
Sajadiyali	Gondal	Rajkot
Karmal Kotda	Gondal	Rajkot
Shivrajgadh	Gondal	Rajkot
Lilakha	Gondal	Rajkot
Masitala	Gondal	Rajkot
Bhandariya	Gondal	Rajkot
Khambhalida	Gondal	Rajkot
Devla	Gondal	Rajkot
Dhudashiya	Gondal	Rajkot
Mota Sakhpar	Gondal	Rajkot
Nana Sakhpar	Gondal	Rajkot
Moti Khilori	Gondal	Rajkot
Dharala	Gondal	Rajkot
Ravna	Gondal	Rajkot
Patkhilori	Gondal	Rajkot
Derdi	Gondal	Rajkot
Vinzivad	Gondal	Rajkot
Sultanpur	Gondal	Rajkot
Ransiki	Gondal	Rajkot
Chavandi	Jamkandorna	Rajkot
Dadar	Jamkandorna	Rajkot
Kanavadala	Jamkandorna	Rajkot
Dadvi	Jamkandorna	Rajkot
Pipaliya Agency	Jamkandorna	Rajkot
Rajpara	Jamkandorna	Rajkot
Gundasari	Jamkandorna	Rajkot
Matravad Nava	Jamkandorna	Rajkot
Matravad Juna	Jamkandorna	Rajkot
Khijadiya Moj	Jamkandorna	Rajkot
Thorala	Jamkandorna	Rajkot
Bardiya	Jamkandorna	Rajkot
Satudad	Jamkandorna	Rajkot
Pipaliya Maljibhi	Jamkandorna	Rajkot
Tarkasar	Jamkandorna	Rajkot
Meghavad	Jamkandorna	Rajkot
Thordi	Jamkandorna	Rajkot
Vavdi	Jamkandorna	Rajkot
Charel	Jamkandorna	Rajkot
Chitravad	Jamkandorna	Rajkot
Chitravad Pati	Jamkandorna	Rajkot
Khatli	Jamkandorna	Rajkot
Balapar	Jamkandorna	Rajkot
Pipardi	Jamkandorna	Rajkot
Rampar	Jamkandorna	Rajkot
Belda	Jamkandorna	Rajkot
Sajadiyali	Jamkandorna	Rajkot
Dholidhar	Jamkandorna	Rajkot
Rangpar	Jamkandorna	Rajkot
Boriya	Jamkandorna	Rajkot
Bandhiya	Jamkandorna	Rajkot
Ujala	Jamkandorna	Rajkot
Padariya	Jamkandorna	Rajkot
Khajurda	Jamkandorna	Rajkot
Sodvadar	Jamkandorna	Rajkot
Rodhel	Jamkandorna	Rajkot
Anchvad	Jamkandorna	Rajkot
Jasapar	Jamkandorna	Rajkot
Jam Kandorna	Jamkandorna	Rajkot
Mota Bhadra	Jamkandorna	Rajkot
Dudhivadar	Jamkandorna	Rajkot
Raydi	Jamkandorna	Rajkot
Hariyasan	Jamkandorna	Rajkot
Sanala	Jamkandorna	Rajkot
Adval	Jamkandorna	Rajkot
Taravda	Jamkandorna	Rajkot
Ishvariya	Jamkandorna	Rajkot
Satvadi	Upleta	Rajkot
Makhiyala	Upleta	Rajkot
Padvala	Upleta	Rajkot
Vadali	Upleta	Rajkot
Khirsara	Upleta	Rajkot
Timbadi Jam	Upleta	Rajkot
Sajdiyali	Upleta	Rajkot
Arni	Upleta	Rajkot
Paneli Moti	Upleta	Rajkot
Hariyasan	Upleta	Rajkot
Jal	Upleta	Rajkot
Kalaria	Upleta	Rajkot
Bhankh	Upleta	Rajkot
Gadhala	Upleta	Rajkot
Mojira	Upleta	Rajkot
Kharachia	Upleta	Rajkot
Charelia	Upleta	Rajkot
Vadekhan	Upleta	Rajkot
Pransla	Upleta	Rajkot
Dhank	Upleta	Rajkot
Gadhethal	Upleta	Rajkot
Rajpara	Upleta	Rajkot
Rabarika	Upleta	Rajkot
Kolki	Upleta	Rajkot
Khakhi Jalia	Upleta	Rajkot
Kerala	Upleta	Rajkot
Navapara	Upleta	Rajkot
Sevantra	Upleta	Rajkot
Vadla	Upleta	Rajkot
Nagvadar	Upleta	Rajkot
Mervadar	Upleta	Rajkot
Tanasva	Upleta	Rajkot
Varjang Jalia	Upleta	Rajkot
Mekhatimbi	Upleta	Rajkot
Murakhada	Upleta	Rajkot
Dumiyani	Upleta	Rajkot
Chikhalia	Upleta	Rajkot
Hadfodi	Upleta	Rajkot
Gadha	Upleta	Rajkot
Isra	Upleta	Rajkot
Nilakha	Upleta	Rajkot
Ganod	Upleta	Rajkot
Bhimora	Upleta	Rajkot
Lath	Upleta	Rajkot
Meli Majethi	Upleta	Rajkot
Kundhech	Upleta	Rajkot
Talgana	Upleta	Rajkot
Samadhiyala	Upleta	Rajkot
Kathrota	Upleta	Rajkot
Moti Vavdi	Dhoraji	Rajkot
Zanzmer	Dhoraji	Rajkot
Umarkot	Dhoraji	Rajkot
Vegdi	Dhoraji	Rajkot
Bhukhi	Dhoraji	Rajkot
Supedi	Dhoraji	Rajkot
Nani Vavdi	Dhoraji	Rajkot
Bholgamda	Dhoraji	Rajkot
Chhadvavadar	Dhoraji	Rajkot
Bhola	Dhoraji	Rajkot
Bhutvad	Dhoraji	Rajkot
Fareni	Dhoraji	Rajkot
Jamnavad	Dhoraji	Rajkot
Pipaliya	Dhoraji	Rajkot
Nagalkhada	Dhoraji	Rajkot
Hadmatiya	Dhoraji	Rajkot
Moti Marad	Dhoraji	Rajkot
Moti Parabdi	Dhoraji	Rajkot
Toraniya	Dhoraji	Rajkot
Nani Parabdi	Dhoraji	Rajkot
Udakiya	Dhoraji	Rajkot
Bhadajaliya	Dhoraji	Rajkot
Nani Marad	Dhoraji	Rajkot
Chichod	Dhoraji	Rajkot
Patanvav	Dhoraji	Rajkot
Kalana	Dhoraji	Rajkot
Velariya	Dhoraji	Rajkot
Bhader	Dhoraji	Rajkot
Vadodar	Dhoraji	Rajkot
Chhatrasa	Dhoraji	Rajkot
Umrali	Jetpur	Rajkot
Valadungra	Jetpur	Rajkot
Haripar	Jetpur	Rajkot
Mevasa	Jetpur	Rajkot
Jepur	Jetpur	Rajkot
Virpur	Jetpur	Rajkot
Thorala	Jetpur	Rajkot
Jambudi	Jetpur	Rajkot
Premgadh	Jetpur	Rajkot
Lunagara	Jetpur	Rajkot
Lunagiri	Jetpur	Rajkot
Kerali	Jetpur	Rajkot
Rabarika	Jetpur	Rajkot
Seluka	Jetpur	Rajkot
Kagvad	Jetpur	Rajkot
Pithadiya	Jetpur	Rajkot
Sardharpur	Jetpur	Rajkot
Panchpipla	Jetpur	Rajkot
Mota Gundala	Jetpur	Rajkot
Mandlikpur	Jetpur	Rajkot
Pedhla	Jetpur	Rajkot
Derdi	Jetpur	Rajkot
Monpar	Jetpur	Rajkot
Vadasada	Jetpur	Rajkot
Amarnagar	Jetpur	Rajkot
Khajuri Gundala	Jetpur	Rajkot
Khirsara	Jetpur	Rajkot
Champrajpur	Jetpur	Rajkot
Juni Sankali	Jetpur	Rajkot
Navi Sankali	Jetpur	Rajkot
Bordi Samadhiyala	Jetpur	Rajkot
Thana Galol	Jetpur	Rajkot
Station Vavdi	Jetpur	Rajkot
Charaniya	Jetpur	Rajkot
Charan Samadhiyala	Jetpur	Rajkot
Amrapar	Jetpur	Rajkot
Kharachiya	Jetpur	Rajkot
Rupavati	Jetpur	Rajkot
Dedarva	Jetpur	Rajkot
Pipalva	Jetpur	Rajkot
Akala	Jetpur	Rajkot
Arab Timbdi	Jetpur	Rajkot
Bava Pipaliya	Jetpur	Rajkot
Bheda Pipaliya	Jetpur	Rajkot
Reshamdi Galol	Jetpur	Rajkot
Devki Galol	Jetpur	Rajkot
Bhimrana	Okhamandal	Jamnagar
Padli	Okhamandal	Jamnagar
Hamusar	Okhamandal	Jamnagar
Shamlasar	Okhamandal	Jamnagar
Positra	Okhamandal	Jamnagar
Rajpara	Okhamandal	Jamnagar
Goriyali	Okhamandal	Jamnagar
Gadhechi	Okhamandal	Jamnagar
Batisa	Okhamandal	Jamnagar
Mojap	Okhamandal	Jamnagar
Makanpur	Okhamandal	Jamnagar
Vasai	Okhamandal	Jamnagar
Mevasa	Okhamandal	Jamnagar
Kalyanpur	Okhamandal	Jamnagar
Rangasar	Okhamandal	Jamnagar
Nageshvar	Okhamandal	Jamnagar
Mulvel	Okhamandal	Jamnagar
Khatumba	Okhamandal	Jamnagar
Aniari	Okhamandal	Jamnagar
Mulvasar	Okhamandal	Jamnagar
Dhrasan Vel	Okhamandal	Jamnagar
Tobar	Okhamandal	Jamnagar
Shivrajpur	Okhamandal	Jamnagar
Varavala	Okhamandal	Jamnagar
Nana Bhavda	Okhamandal	Jamnagar
Mota Bhavda	Okhamandal	Jamnagar
Tupani	Okhamandal	Jamnagar
Charakla	Okhamandal	Jamnagar
Dhinaki	Okhamandal	Jamnagar
Korada	Okhamandal	Jamnagar
Baradia	Okhamandal	Jamnagar
Vachhu	Okhamandal	Jamnagar
Lovrali	Okhamandal	Jamnagar
Gorinja	Okhamandal	Jamnagar
Juni Dhrevad	Okhamandal	Jamnagar
Navi Dhrevad	Okhamandal	Jamnagar
Maripur	Okhamandal	Jamnagar
Okhamadhi	Okhamandal	Jamnagar
Kuranga	Okhamandal	Jamnagar
Kalawad Simani	Khambhalia	Jamnagar
Chudeshvar	Khambhalia	Jamnagar
Goinj	Khambhalia	Jamnagar
Kotha Visotri	Khambhalia	Jamnagar
Sodasala	Khambhalia	Jamnagar
Parodiya	Khambhalia	Jamnagar
Mota Mandha	Khambhalia	Jamnagar
Nana Mandha	Khambhalia	Jamnagar
Nana Ambla	Khambhalia	Jamnagar
Mota Ambla	Khambhalia	Jamnagar
Vadinar	Khambhalia	Jamnagar
Bharana	Khambhalia	Jamnagar
Timbdi	Khambhalia	Jamnagar
Kathi Devaliya	Khambhalia	Jamnagar
Kajurda	Khambhalia	Jamnagar
Sumra Taradhari	Khambhalia	Jamnagar
Vadaliya Sinhan	Khambhalia	Jamnagar
Sakhpar	Khambhalia	Jamnagar
Nagada	Khambhalia	Jamnagar
Danta	Khambhalia	Jamnagar
Kabar Visotri	Khambhalia	Jamnagar
Samor	Khambhalia	Jamnagar
Charbara	Khambhalia	Jamnagar
Beh	Khambhalia	Jamnagar
Nana Ashota	Khambhalia	Jamnagar
Beraja	Khambhalia	Jamnagar
Zakasiya	Khambhalia	Jamnagar
Vadtra	Khambhalia	Jamnagar
Hansthal	Khambhalia	Jamnagar
Kuvadiya	Khambhalia	Jamnagar
Harshadpur	Khambhalia	Jamnagar
Haripar	Khambhalia	Jamnagar
Kanchanpur	Khambhalia	Jamnagar
Sinhan Kakabhai	Khambhalia	Jamnagar
Sinhan Aher	Khambhalia	Jamnagar
Sodha Tardhari	Khambhalia	Jamnagar
Dharampur	Khambhalia	Jamnagar
Ramnagar	Khambhalia	Jamnagar
Viramdad	Khambhalia	Jamnagar
Khajuriya	Khambhalia	Jamnagar
Bhatel	Khambhalia	Jamnagar
Sonaradi	Khambhalia	Jamnagar
Dhandhusar	Khambhalia	Jamnagar
Datrana	Khambhalia	Jamnagar
Hanjdapar	Khambhalia	Jamnagar
Sidhpur	Khambhalia	Jamnagar
Movan	Khambhalia	Jamnagar
Pipliya	Khambhalia	Jamnagar
Juvangadh	Khambhalia	Jamnagar
Madhupur	Khambhalia	Jamnagar
Vinzalpar	Khambhalia	Jamnagar
Manza	Khambhalia	Jamnagar
Bhatgam	Khambhalia	Jamnagar
Kota	Khambhalia	Jamnagar
Lakhasar Hapa	Khambhalia	Jamnagar
Mahadeviya	Khambhalia	Jamnagar
Pir Lakhasar	Khambhalia	Jamnagar
Bajana	Khambhalia	Jamnagar
Kandorna	Khambhalia	Jamnagar
Kolava	Khambhalia	Jamnagar
Laliya	Khambhalia	Jamnagar
Keshod	Khambhalia	Jamnagar
Thakar Sherdi	Khambhalia	Jamnagar
Golan Sherdi	Khambhalia	Jamnagar
Bhadthar	Khambhalia	Jamnagar
Bhinda	Khambhalia	Jamnagar
Bhankhokhari	Khambhalia	Jamnagar
Tathiya	Khambhalia	Jamnagar
Bhandariya	Khambhalia	Jamnagar
Ambardi	Khambhalia	Jamnagar
Devaliya (A)	Khambhalia	Jamnagar
Sagariya	Khambhalia	Jamnagar
Sutariya	Khambhalia	Jamnagar
Kotadiya	Khambhalia	Jamnagar
Moti Khokhri	Khambhalia	Jamnagar
Bhara Beraja	Khambhalia	Jamnagar
Sheda Bhadthar	Khambhalia	Jamnagar
Laluka	Khambhalia	Jamnagar
Fot	Khambhalia	Jamnagar
Lalparda	Khambhalia	Jamnagar
Ajad Tapu	Khambhalia	Jamnagar
Panero(Kado)	Khambhalia	Jamnagar
Gandhiya (Kado)	Khambhalia	Jamnagar
Kalubhar Tapu	Khambhalia	Jamnagar
Sarmat	Jamnagar	Jamnagar
Gordhanpar	Jamnagar	Jamnagar
Khara Beraja	Jamnagar	Jamnagar
Dhinchda	Jamnagar	Jamnagar
Rozibet	Jamnagar	Jamnagar
Nava Nagna	Jamnagar	Jamnagar
Juna Nagna	Jamnagar	Jamnagar
Dhunvav	Jamnagar	Jamnagar
Khijadiya	Jamnagar	Jamnagar
Jambuda	Jamnagar	Jamnagar
Sachana	Jamnagar	Jamnagar
Rampar	Jamnagar	Jamnagar
Fala	Jamnagar	Jamnagar
Dhrangda	Jamnagar	Jamnagar
Khambhalida Nanovas	Jamnagar	Jamnagar
Khambhalida Motovas	Jamnagar	Jamnagar
Khijadiya Ravani	Jamnagar	Jamnagar
Ranjitpar	Jamnagar	Jamnagar
Khilos	Jamnagar	Jamnagar
Nani Banugar	Jamnagar	Jamnagar
Moti Banugar	Jamnagar	Jamnagar
Shekhpat	Jamnagar	Jamnagar
Khimrana	Jamnagar	Jamnagar
Naghedi	Jamnagar	Jamnagar
Vasai	Jamnagar	Jamnagar
Bed	Jamnagar	Jamnagar
Mungani	Jamnagar	Jamnagar
Gagva	Jamnagar	Jamnagar
Moti Khavdi	Jamnagar	Jamnagar
Nani Khavdi	Jamnagar	Jamnagar
Sapar	Jamnagar	Jamnagar
Amra	Jamnagar	Jamnagar
Ravalsar	Jamnagar	Jamnagar
Lakha Baval	Jamnagar	Jamnagar
Kansumara	Jamnagar	Jamnagar
Morkanda	Jamnagar	Jamnagar
Theba	Jamnagar	Jamnagar
Hapa	Jamnagar	Jamnagar
Bada	Jamnagar	Jamnagar
Suryapara	Jamnagar	Jamnagar
Lakhani Motovas	Jamnagar	Jamnagar
Lakhani Nanovas	Jamnagar	Jamnagar
Tamachan	Jamnagar	Jamnagar
Jamvanathali	Jamnagar	Jamnagar
Chavda	Jamnagar	Jamnagar
Moda	Jamnagar	Jamnagar
Gangajala	Jamnagar	Jamnagar
Alia	Jamnagar	Jamnagar
Mota Thavariya	Jamnagar	Jamnagar
Khimaliya	Jamnagar	Jamnagar
Dared	Jamnagar	Jamnagar
Masitiya	Jamnagar	Jamnagar
Champa Beraja	Jamnagar	Jamnagar
Jivapar	Jamnagar	Jamnagar
Gaduka	Jamnagar	Jamnagar
Balambhdi	Jamnagar	Jamnagar
Dodhiya	Jamnagar	Jamnagar
Vav Beraja	Jamnagar	Jamnagar
Chela	Jamnagar	Jamnagar
Dadiya	Jamnagar	Jamnagar
Mokhana	Jamnagar	Jamnagar
Suvarda	Jamnagar	Jamnagar
Vijarkhi	Jamnagar	Jamnagar
Sapda	Jamnagar	Jamnagar
Beraja	Jamnagar	Jamnagar
Jaga	Jamnagar	Jamnagar
Varna	Jamnagar	Jamnagar
Virpar	Jamnagar	Jamnagar
Veratiya	Jamnagar	Jamnagar
Khara Vedha	Jamnagar	Jamnagar
Sumri (Dhutarpar)	Jamnagar	Jamnagar
Dhudasiya	Jamnagar	Jamnagar
Dhutarpar	Jamnagar	Jamnagar
Medi	Jamnagar	Jamnagar
Nani Matli	Jamnagar	Jamnagar
Pasaya	Jamnagar	Jamnagar
Modpar	Jamnagar	Jamnagar
Fachariya	Jamnagar	Jamnagar
Miyatra	Jamnagar	Jamnagar
Harshadpar	Jamnagar	Jamnagar
Naranpar	Jamnagar	Jamnagar
Changa	Jamnagar	Jamnagar
Chandragadh	Jamnagar	Jamnagar
Khoja Beraja	Jamnagar	Jamnagar
Lonthiya	Jamnagar	Jamnagar
Bavariya	Jamnagar	Jamnagar
Lavadiya	Jamnagar	Jamnagar
Naghuna	Jamnagar	Jamnagar
Nana Thavariya	Jamnagar	Jamnagar
Hadmatiya	Jamnagar	Jamnagar
Matva	Jamnagar	Jamnagar
Moti Bhalsan	Jamnagar	Jamnagar
Sumri (Bhalsan)	Jamnagar	Jamnagar
Konza	Jamnagar	Jamnagar
Makvana	Jamnagar	Jamnagar
Dhandha	Jamnagar	Jamnagar
Chandraga	Jamnagar	Jamnagar
Vaniyagam	Jamnagar	Jamnagar
Vagadiya	Jamnagar	Jamnagar
Pirotan (Bet)	Jamnagar	Jamnagar
Untbet-Shampar	Jodiya	Jamnagar
Zinzuda	Jodiya	Jamnagar
Rajpar	Jodiya	Jamnagar
Fadsar	Jodiya	Jamnagar
Bela	Jodiya	Jamnagar
Rampar (Parabekar)	Jodiya	Jamnagar
Kothariya	Jodiya	Jamnagar
Amran	Jodiya	Jamnagar
Kharachiya	Jodiya	Jamnagar
Kerali	Jodiya	Jamnagar
Fatsar	Jodiya	Jamnagar
Jivapar	Jodiya	Jamnagar
Badanpar (Amran)	Jodiya	Jamnagar
Dhudkot	Jodiya	Jamnagar
Mavnugam	Jodiya	Jamnagar
Dudhai	Jodiya	Jamnagar
Manamora	Jodiya	Jamnagar
Bhimkata	Jodiya	Jamnagar
Jamsar	Jodiya	Jamnagar
Sampar	Jodiya	Jamnagar
Ambala	Jodiya	Jamnagar
Koyli	Jodiya	Jamnagar
Padana	Jodiya	Jamnagar
Jiragadh	Jodiya	Jamnagar
Tarana	Jodiya	Jamnagar
Madhapar	Jodiya	Jamnagar
Balambha	Jodiya	Jamnagar
Ranjitpar	Jodiya	Jamnagar
Jodiya	Jodiya	Jamnagar
Badanpar (Jodiya)	Jodiya	Jamnagar
Kunad	Jodiya	Jamnagar
Balachadi	Jodiya	Jamnagar
Khiri	Jodiya	Jamnagar
Hadiyana	Jodiya	Jamnagar
Baradi	Jodiya	Jamnagar
Beraja	Jodiya	Jamnagar
Vavdi	Jodiya	Jamnagar
Nesda	Jodiya	Jamnagar
Limbuda	Jodiya	Jamnagar
Anada	Jodiya	Jamnagar
Bhadra	Jodiya	Jamnagar
Lakhtar	Jodiya	Jamnagar
Keshiya	Jodiya	Jamnagar
Manpar	Jodiya	Jamnagar
Morana	Jodiya	Jamnagar
Meghpar	Jodiya	Jamnagar
Jasapar	Jodiya	Jamnagar
Bodka	Jodiya	Jamnagar
Pithad	Jodiya	Jamnagar
Gajdi	Jodiya	Jamnagar
Rasnal	Jodiya	Jamnagar
Timbdi	Jodiya	Jamnagar
Majoth	Dhrol	Jamnagar
Mavapar	Dhrol	Jamnagar
Nana Garediya	Dhrol	Jamnagar
Hadatoda	Dhrol	Jamnagar
Hajamchora	Dhrol	Jamnagar
Bhensdad	Dhrol	Jamnagar
Manekpar	Dhrol	Jamnagar
Mota Garediya	Dhrol	Jamnagar
Nathuvadla	Dhrol	Jamnagar
Soyal	Dhrol	Jamnagar
Vankiya	Dhrol	Jamnagar
Haripar	Dhrol	Jamnagar
Nana Vagudad	Dhrol	Jamnagar
Latipur	Dhrol	Jamnagar
Sagaliya	Dhrol	Jamnagar
Mota Vagudad	Dhrol	Jamnagar
Jayva	Dhrol	Jamnagar
Kharva	Dhrol	Jamnagar
Bijalka	Dhrol	Jamnagar
Mota Itala	Dhrol	Jamnagar
Laiyala	Dhrol	Jamnagar
Sudhadhuna	Dhrol	Jamnagar
Dharampur	Dhrol	Jamnagar
Modpar	Dhrol	Jamnagar
Dedakdad	Dhrol	Jamnagar
Sanosara	Dhrol	Jamnagar
Jabida	Dhrol	Jamnagar
Gadhada	Dhrol	Jamnagar
Rajpar	Dhrol	Jamnagar
Hamapar	Dhrol	Jamnagar
Roziya	Dhrol	Jamnagar
Jaliya Mansar	Dhrol	Jamnagar
Khijadiya	Dhrol	Jamnagar
Sumra	Dhrol	Jamnagar
Pipartoda	Dhrol	Jamnagar
Khengarka	Dhrol	Jamnagar
Katda	Dhrol	Jamnagar
Chhalla	Dhrol	Jamnagar
Golita	Dhrol	Jamnagar
Dangra	Dhrol	Jamnagar
Khakhra	Dhrol	Jamnagar
Moti Matli	Kalavad	Jamnagar
Pithadiya	Kalavad	Jamnagar
Makaji Meghpar	Kalavad	Jamnagar
Vibhaniya	Kalavad	Jamnagar
Nani Nagajar	Kalavad	Jamnagar
Moti Nagajar	Kalavad	Jamnagar
Khandhera	Kalavad	Jamnagar
Khan Kotda	Kalavad	Jamnagar
Sarapadar	Kalavad	Jamnagar
Beraja	Kalavad	Jamnagar
Nani Bhalsan	Kalavad	Jamnagar
Dungrani Devaliya	Kalavad	Jamnagar
Ravashiya	Kalavad	Jamnagar
Banga	Kalavad	Jamnagar
Dudhala	Kalavad	Jamnagar
Nagpur	Kalavad	Jamnagar
Golaniya	Kalavad	Jamnagar
Haripar (Khandhera)	Kalavad	Jamnagar
Vodisang	Kalavad	Jamnagar
Satiya	Kalavad	Jamnagar
Sortha	Kalavad	Jamnagar
Juvanpar	Kalavad	Jamnagar
Mota Vadala	Kalavad	Jamnagar
Bhimanugam	Kalavad	Jamnagar
Virvav	Kalavad	Jamnagar
Nana Badanpar	Kalavad	Jamnagar
Moti Bhagedi	Kalavad	Jamnagar
Laloi	Kalavad	Jamnagar
Galpadar	Kalavad	Jamnagar
Hansthal	Kalavad	Jamnagar
Rampar	Kalavad	Jamnagar
Chela Bedi	Kalavad	Jamnagar
Savli	Kalavad	Jamnagar
Davli	Kalavad	Jamnagar
Nani Bhagedi	Kalavad	Jamnagar
Nani Vavdi	Kalavad	Jamnagar
Jivapar	Kalavad	Jamnagar
Bava Khakhariya	Kalavad	Jamnagar
Bhayu Khakhariya	Kalavad	Jamnagar
Navania Khakhariya	Kalavad	Jamnagar
Pata Meghpar	Kalavad	Jamnagar
Shishang	Kalavad	Jamnagar
Dhedh Khijadiya	Kalavad	Jamnagar
Jashapar	Kalavad	Jamnagar
Sanala	Kalavad	Jamnagar
Machhalivad	Kalavad	Jamnagar
Vazir Khakhariya	Kalavad	Jamnagar
Morvadi	Kalavad	Jamnagar
Bodi	Kalavad	Jamnagar
Nana Panchdevda	Kalavad	Jamnagar
Mota Panchdevda	Kalavad	Jamnagar
Chhatar	Kalavad	Jamnagar
Arala	Kalavad	Jamnagar
Jamvali	Kalavad	Jamnagar
Jalansar	Kalavad	Jamnagar
Prabhuji Pipaliya	Kalavad	Jamnagar
Sarvaniya	Kalavad	Jamnagar
Khimani Sanosara	Kalavad	Jamnagar
Rajsthali	Kalavad	Jamnagar
Chapra	Kalavad	Jamnagar
Rajda	Kalavad	Jamnagar
Nikava	Kalavad	Jamnagar
Anandpar	Kalavad	Jamnagar
Pipaliya (Dhandhaliya)	Kalavad	Jamnagar
Khad Dhoraji	Kalavad	Jamnagar
Bediya	Kalavad	Jamnagar
Kotha Bhadukiya	Kalavad	Jamnagar
Mota Bhadukiya	Kalavad	Jamnagar
Balambhadi	Kalavad	Jamnagar
Mulila	Kalavad	Jamnagar
Rinari	Kalavad	Jamnagar
Makrani Sanosara	Kalavad	Jamnagar
Moti Vavdi	Kalavad	Jamnagar
Sarvaniya Hakumati	Kalavad	Jamnagar
Dhundhoraji	Kalavad	Jamnagar
Navagam	Kalavad	Jamnagar
Machharda	Kalavad	Jamnagar
Fagas	Kalavad	Jamnagar
Napaniya Khijadiya	Kalavad	Jamnagar
Labukiya Bhadukiya	Kalavad	Jamnagar
Bhagat Khijadiya	Kalavad	Jamnagar
Pipar	Kalavad	Jamnagar
Nana Vadala	Kalavad	Jamnagar
Dangarvada	Kalavad	Jamnagar
Metiya	Kalavad	Jamnagar
Deri	Kalavad	Jamnagar
Kharedi	Kalavad	Jamnagar
Bamangam	Kalavad	Jamnagar
Toda	Kalavad	Jamnagar
Bhangda	Kalavad	Jamnagar
Umrala	Kalavad	Jamnagar
Haripar (Mevasa)	Kalavad	Jamnagar
Mevasa (Haripar)	Kalavad	Jamnagar
Bhavabhi Khijadiya	Kalavad	Jamnagar
Gunda	Kalavad	Jamnagar
Makha Karod	Kalavad	Jamnagar
Kalmeghada	Kalavad	Jamnagar
Moridad	Kalavad	Jamnagar
Singach	Lalpur	Jamnagar
Zankhar	Lalpur	Jamnagar
Jogvad	Lalpur	Jamnagar
Meghpar	Lalpur	Jamnagar
Padana	Lalpur	Jamnagar
Navagam	Lalpur	Jamnagar
Dera Chhikari	Lalpur	Jamnagar
Kana chhikari	Lalpur	Jamnagar
Pipli	Lalpur	Jamnagar
Meghnugam	Lalpur	Jamnagar
Kanalus	Lalpur	Jamnagar
Khatiya Beraja	Lalpur	Jamnagar
Lakhiya Nana	Lalpur	Jamnagar
Mithoi	Lalpur	Jamnagar
Rasangpar	Lalpur	Jamnagar
Lakhiya Mota	Lalpur	Jamnagar
Rangpar	Lalpur	Jamnagar
Setalus	Lalpur	Jamnagar
Arablus	Lalpur	Jamnagar
Meghavadar	Lalpur	Jamnagar
Veraval Moti	Lalpur	Jamnagar
Pipartoda	Lalpur	Jamnagar
Haripar	Lalpur	Jamnagar
Sevak Bhatiya	Lalpur	Jamnagar
Sevak Dhuniya	Lalpur	Jamnagar
Dabasang	Lalpur	Jamnagar
Machhu Beraja	Lalpur	Jamnagar
Sevak Bharudiya	Lalpur	Jamnagar
Modpar	Lalpur	Jamnagar
Jasapar	Lalpur	Jamnagar
Charantungi	Lalpur	Jamnagar
Daltungi	Lalpur	Jamnagar
Rafudad Moti	Lalpur	Jamnagar
Gajana	Lalpur	Jamnagar
Mulila	Lalpur	Jamnagar
Arikhana	Lalpur	Jamnagar
Memana	Lalpur	Jamnagar
Khengarpar	Lalpur	Jamnagar
Gala	Lalpur	Jamnagar
Karana	Lalpur	Jamnagar
Vadpanchasara	Lalpur	Jamnagar
Panchsara Mota	Lalpur	Jamnagar
Khad Khambhaliya	Lalpur	Jamnagar
Dhuniya Nava	Lalpur	Jamnagar
Khadba Mota	Lalpur	Jamnagar
Veraval Navi	Lalpur	Jamnagar
Lalpur	Lalpur	Jamnagar
Khirsara	Lalpur	Jamnagar
Pipar Navi	Lalpur	Jamnagar
Rafudad Nani	Lalpur	Jamnagar
Kanvirdi	Lalpur	Jamnagar
Apia	Lalpur	Jamnagar
Babarzar	Lalpur	Jamnagar
Govana	Lalpur	Jamnagar
Godavari	Lalpur	Jamnagar
Nanduri	Lalpur	Jamnagar
Bharudiya Mota	Lalpur	Jamnagar
Vijaypur	Lalpur	Jamnagar
Vavdi	Lalpur	Jamnagar
Rakka	Lalpur	Jamnagar
Khatiya	Lalpur	Jamnagar
Sajadiyali	Lalpur	Jamnagar
Badhla	Lalpur	Jamnagar
Khadba Nana	Lalpur	Jamnagar
Babariya	Lalpur	Jamnagar
Rinzpur	Lalpur	Jamnagar
Tebhada	Lalpur	Jamnagar
Dharampur	Lalpur	Jamnagar
Sanosri	Lalpur	Jamnagar
Kathitad	Lalpur	Jamnagar
Sansara	Lalpur	Jamnagar
Chorbedi	Lalpur	Jamnagar
Dantiyo (Kado)	Lalpur	Jamnagar
Pindara	Kalyanpur	Jamnagar
Virpur Lusari	Kalyanpur	Jamnagar
Asota Mota	Kalyanpur	Jamnagar
Habardi Manipur	Kalyanpur	Jamnagar
Ran	Kalyanpur	Jamnagar
Mevasa	Kalyanpur	Jamnagar
Mahadeviya	Kalyanpur	Jamnagar
Ranjitpar	Kalyanpur	Jamnagar
Gurgadh	Kalyanpur	Jamnagar
Gaga	Kalyanpur	Jamnagar
Nandana	Kalyanpur	Jamnagar
Bhopalka	Kalyanpur	Jamnagar
Juvanpar	Kalyanpur	Jamnagar
Sidsara	Kalyanpur	Jamnagar
Manpara	Kalyanpur	Jamnagar
Meghpur Titodi	Kalyanpur	Jamnagar
Gadhka	Kalyanpur	Jamnagar
Patelka	Kalyanpur	Jamnagar
Khakharda	Kalyanpur	Jamnagar
Kenedi	Kalyanpur	Jamnagar
Bhatiya	Kalyanpur	Jamnagar
Bamanasa	Kalyanpur	Jamnagar
Bhatvadiya	Kalyanpur	Jamnagar
Goji Nes	Kalyanpur	Jamnagar
Bhogat	Kalyanpur	Jamnagar
Gokalpar	Kalyanpur	Jamnagar
Hadmatiya	Kalyanpur	Jamnagar
Bankodi	Kalyanpur	Jamnagar
Kalyanpur	Kalyanpur	Jamnagar
Khijadad	Kalyanpur	Jamnagar
Jampar	Kalyanpur	Jamnagar
Dhrumthal	Kalyanpur	Jamnagar
Chapar	Kalyanpur	Jamnagar
Kanakpar	Kalyanpur	Jamnagar
Kanpar Sherdi	Kalyanpur	Jamnagar
Rajpar	Kalyanpur	Jamnagar
Chur	Kalyanpur	Jamnagar
Mangariya	Kalyanpur	Jamnagar
Haripar	Kalyanpur	Jamnagar
Keshavpura	Kalyanpur	Jamnagar
Maleta	Kalyanpur	Jamnagar
Jodhpar	Kalyanpur	Jamnagar
Navadra	Kalyanpur	Jamnagar
Satapar	Kalyanpur	Jamnagar
Devaliya	Kalyanpur	Jamnagar
Paneli	Kalyanpur	Jamnagar
Jepur	Kalyanpur	Jamnagar
Ashiyavadar	Kalyanpur	Jamnagar
Dudhiya	Kalyanpur	Jamnagar
Dhaturiya	Kalyanpur	Jamnagar
Khirasara	Kalyanpur	Jamnagar
Nagadiya	Kalyanpur	Jamnagar
Dangarvad	Kalyanpur	Jamnagar
Ranparda	Kalyanpur	Jamnagar
Suryavadar	Kalyanpur	Jamnagar
Tankariya	Kalyanpur	Jamnagar
Sanosari	Kalyanpur	Jamnagar
Chachlana	Kalyanpur	Jamnagar
Lamba	Kalyanpur	Jamnagar
Gangdi	Kalyanpur	Jamnagar
Gandhvi	Kalyanpur	Jamnagar
Chandravada	Kalyanpur	Jamnagar
Premsar	Kalyanpur	Jamnagar
Gorana	Kalyanpur	Jamnagar
Renta Kalavad	Bhanvad	Jamnagar
Gundla	Bhanvad	Jamnagar
Chandvad	Bhanvad	Jamnagar
Jampar	Bhanvad	Jamnagar
Chokhanda	Bhanvad	Jamnagar
Bhangor	Bhanvad	Jamnagar
Bhoriya	Bhanvad	Jamnagar
Kabarka	Bhanvad	Jamnagar
Shedhakhai	Bhanvad	Jamnagar
Morjhar	Bhanvad	Jamnagar
Sevak Devaliya	Bhanvad	Jamnagar
Gunda	Bhanvad	Jamnagar
Sajadiyali	Bhanvad	Jamnagar
Kantoliya	Bhanvad	Jamnagar
Sanakhala	Bhanvad	Jamnagar
Rojhivada	Bhanvad	Jamnagar
Navagam	Bhanvad	Jamnagar
Sai Devaliya	Bhanvad	Jamnagar
Bodki	Bhanvad	Jamnagar
Fotdi	Bhanvad	Jamnagar
Dharagar	Bhanvad	Jamnagar
Krushnagadh	Bhanvad	Jamnagar
Verad	Bhanvad	Jamnagar
Fatepur	Bhanvad	Jamnagar
Rupamora	Bhanvad	Jamnagar
Jharera	Bhanvad	Jamnagar
Bhavaneshvar	Bhanvad	Jamnagar
Dhebar	Bhanvad	Jamnagar
Bhenakvad	Bhanvad	Jamnagar
Ambaliyara	Bhanvad	Jamnagar
Ranparda	Bhanvad	Jamnagar
Bharatpur	Bhanvad	Jamnagar
Mevasa	Bhanvad	Jamnagar
Ambardi	Bhanvad	Jamnagar
Vanavad	Bhanvad	Jamnagar
Shiva	Bhanvad	Jamnagar
Mota Kalavad	Bhanvad	Jamnagar
Timbdi	Bhanvad	Jamnagar
Ghumli	Bhanvad	Jamnagar
Mokhana	Bhanvad	Jamnagar
Pachhatar	Bhanvad	Jamnagar
Dudhala	Bhanvad	Jamnagar
Hathla	Bhanvad	Jamnagar
Gadu	Bhanvad	Jamnagar
Ranpar	Bhanvad	Jamnagar
Pachhatardi	Bhanvad	Jamnagar
Kansaliyo Nes	Bhanvad	Jamnagar
Baradi Nes	Bhanvad	Jamnagar
Dandra Nes	Bhanvad	Jamnagar
Modpar	Bhanvad	Jamnagar
Kalyanpar	Bhanvad	Jamnagar
Katkola	Bhanvad	Jamnagar
Satsagar Nes	Bhanvad	Jamnagar
Rojhda	Bhanvad	Jamnagar
Khodiyar Nes	Bhanvad	Jamnagar
Suvardo Nes	Bhanvad	Jamnagar
Fuljhar Nes	Bhanvad	Jamnagar
Kasvirdo Nes	Bhanvad	Jamnagar
Jambusar	Bhanvad	Jamnagar
Jasapar	Bhanvad	Jamnagar
Ravno Nes	Bhanvad	Jamnagar
Chhapiyo Nes	Bhanvad	Jamnagar
Ranivav Nes	Bhanvad	Jamnagar
Moradiyo Nes	Bhanvad	Jamnagar
Gulabsagar Nes	Bhanvad	Jamnagar
Abhpara Nes	Bhanvad	Jamnagar
Thar Nes	Bhanvad	Jamnagar
Dhedhakhuna Nes	Bhanvad	Jamnagar
Dhola Dhuna Nes	Bhanvad	Jamnagar
Kathiyani Nes	Bhanvad	Jamnagar
Vagadiyo Nes	Bhanvad	Jamnagar
Dhramni Nes	Bhanvad	Jamnagar
Vi Nes	Bhanvad	Jamnagar
Gali Nes	Bhanvad	Jamnagar
Killeshwar Nes	Bhanvad	Jamnagar
Dhedhio Nes	Bhanvad	Jamnagar
Tadi Nes	Bhanvad	Jamnagar
Khatariyo Nes	Bhanvad	Jamnagar
Bado Nes	Bhanvad	Jamnagar
Kapurdi Nes	Bhanvad	Jamnagar
Ranasar Nes	Bhanvad	Jamnagar
Karanjvaro	Bhanvad	Jamnagar
Bharadi Nes	Bhanvad	Jamnagar
Savarkundla	Bhanvad	Jamnagar
Son kansari Nes	Bhanvad	Jamnagar
Baritalav Nes	Bhanvad	Jamnagar
Khunano Nes	Bhanvad	Jamnagar
Bataliyo Nes	Bhanvad	Jamnagar
Kathano Nes	Bhanvad	Jamnagar
Danderi Nes	Bhanvad	Jamnagar
Bari Nes	Bhanvad	Jamnagar
Kheral	Bhanvad	Jamnagar
Amrachhella	Bhanvad	Jamnagar
Sakroja	Bhanvad	Jamnagar
Karsanpar	Jamjodhpur	Jamnagar
Moti Gop	Jamjodhpur	Jamnagar
Meghpar	Jamjodhpur	Jamnagar
Zinavari	Jamjodhpur	Jamnagar
Ghelda	Jamjodhpur	Jamnagar
Ghunda	Jamjodhpur	Jamnagar
Kotha Virdi	Jamjodhpur	Jamnagar
Bamthiya	Jamjodhpur	Jamnagar
Bhojabedi	Jamjodhpur	Jamnagar
Virpur	Jamjodhpur	Jamnagar
Bavdidad	Jamjodhpur	Jamnagar
Samana	Jamjodhpur	Jamnagar
Dal Devaliya	Jamjodhpur	Jamnagar
Narmana	Jamjodhpur	Jamnagar
Luvarsar	Jamjodhpur	Jamnagar
Sukhpar Dhrafa	Jamjodhpur	Jamnagar
Laloi	Jamjodhpur	Jamnagar
Ambardi Jam	Jamjodhpur	Jamnagar
Ambardi Bhupat	Jamjodhpur	Jamnagar
Gadhakda	Jamjodhpur	Jamnagar
Veraval	Jamjodhpur	Jamnagar
Ishvariya	Jamjodhpur	Jamnagar
Rabarika	Jamjodhpur	Jamnagar
Son Vadiya	Jamjodhpur	Jamnagar
Mota Vadiya	Jamjodhpur	Jamnagar
Hothiji Khadba	Jamjodhpur	Jamnagar
Vanana	Jamjodhpur	Jamnagar
Nandana	Jamjodhpur	Jamnagar
Ambardi Deri	Jamjodhpur	Jamnagar
Sheth Vadala	Jamjodhpur	Jamnagar
Sogthi	Jamjodhpur	Jamnagar
Sadodar	Jamjodhpur	Jamnagar
Methan	Jamjodhpur	Jamnagar
Bharad Moti	Jamjodhpur	Jamnagar
Bhardki	Jamjodhpur	Jamnagar
Kalyanpur	Jamjodhpur	Jamnagar
Jasapar	Jamjodhpur	Jamnagar
Chiroda Muluji	Jamjodhpur	Jamnagar
Ambardi Meghpar	Jamjodhpur	Jamnagar
Ambardi Mevasa	Jamjodhpur	Jamnagar
Melan	Jamjodhpur	Jamnagar
Kadbal	Jamjodhpur	Jamnagar
Vasantpur	Jamjodhpur	Jamnagar
Jamvali	Jamjodhpur	Jamnagar
Chur	Jamjodhpur	Jamnagar
Balva	Jamjodhpur	Jamnagar
Kotda	Jamjodhpur	Jamnagar
Dhrafa	Jamjodhpur	Jamnagar
Gorkhadi	Jamjodhpur	Jamnagar
Chiroda Sang	Jamjodhpur	Jamnagar
Butavadar	Jamjodhpur	Jamnagar
Bagdhara	Jamjodhpur	Jamnagar
Mandasan	Jamjodhpur	Jamnagar
Valasan	Jamjodhpur	Jamnagar
Sidsar	Jamjodhpur	Jamnagar
Gingni	Jamjodhpur	Jamnagar
Naliyero	Jamjodhpur	Jamnagar
Mahiki	Jamjodhpur	Jamnagar
Vadwala	Jamjodhpur	Jamnagar
Satapar	Jamjodhpur	Jamnagar
Vansjaliya	Jamjodhpur	Jamnagar
Tarsai	Jamjodhpur	Jamnagar
Sukhpur	Jamjodhpur	Jamnagar
Udepur	Jamjodhpur	Jamnagar
Dhoriyo Nesh	Jamjodhpur	Jamnagar
Patan	Jamjodhpur	Jamnagar
Malvada	Jamjodhpur	Jamnagar
Paradva	Jamjodhpur	Jamnagar
Amrapar	Jamjodhpur	Jamnagar
Bhetkadi	Porbandar	Porbandar
Advana	Porbandar	Porbandar
Simar	Porbandar	Porbandar
Rojhivada	Porbandar	Porbandar
Ishvariya	Porbandar	Porbandar
Bhomiyavadar	Porbandar	Porbandar
Sodhana	Porbandar	Porbandar
Shingda	Porbandar	Porbandar
Sisli	Porbandar	Porbandar
Miyani	Porbandar	Porbandar
Bhavpara	Porbandar	Porbandar
Vadala	Porbandar	Porbandar
Ambarama	Porbandar	Porbandar
Fatana	Porbandar	Porbandar
Majivana	Porbandar	Porbandar
Kunvadar	Porbandar	Porbandar
Morana	Porbandar	Porbandar
Paravada	Porbandar	Porbandar
Nagka	Porbandar	Porbandar
Bavalvav	Porbandar	Porbandar
Natvarnagar	Porbandar	Porbandar
Khambhodar	Porbandar	Porbandar
Kindar Kheda	Porbandar	Porbandar
Modhvada	Porbandar	Porbandar
Sakhpur	Porbandar	Porbandar
Tukda Miyani	Porbandar	Porbandar
Visavada	Porbandar	Porbandar
Palkhada	Porbandar	Porbandar
Keshav	Porbandar	Porbandar
Bagvadar	Porbandar	Porbandar
Vachhoda	Porbandar	Porbandar
Khistri	Porbandar	Porbandar
Vinjhrana	Porbandar	Porbandar
Godhana	Porbandar	Porbandar
Katvana	Porbandar	Porbandar
Beran	Porbandar	Porbandar
Bharvada	Porbandar	Porbandar
Baradiya	Porbandar	Porbandar
Ratdi	Porbandar	Porbandar
Kantela	Porbandar	Porbandar
Shrinagar	Porbandar	Porbandar
Rinavada	Porbandar	Porbandar
Simani	Porbandar	Porbandar
Bakharla	Porbandar	Porbandar
Boricha	Porbandar	Porbandar
Pandavadar	Porbandar	Porbandar
Degam	Porbandar	Porbandar
Kuchhdi	Porbandar	Porbandar
Zaver (Part)	Porbandar	Porbandar
Kolikhada	Porbandar	Porbandar
Ratanpar	Porbandar	Porbandar
Oddar	Porbandar	Porbandar
Tukda Gosa	Porbandar	Porbandar
Keshod (Lushala)	Porbandar	Porbandar
Erada	Porbandar	Porbandar
Delodar	Porbandar	Porbandar
Mitrala	Porbandar	Porbandar
Rajpar	Porbandar	Porbandar
Gosa	Porbandar	Porbandar
Chikasa	Porbandar	Porbandar
Bhad	Porbandar	Porbandar
Garej	Porbandar	Porbandar
Navi Bandar	Porbandar	Porbandar
Ratiya	Porbandar	Porbandar
Untada	Porbandar	Porbandar
Balej	Porbandar	Porbandar
Kadachh	Porbandar	Porbandar
Mocha	Porbandar	Porbandar
Gorsar	Porbandar	Porbandar
Mander	Porbandar	Porbandar
Chingariya	Porbandar	Porbandar
Pata	Porbandar	Porbandar
Madhavpur	Porbandar	Porbandar
Sinhjhar Nes	Porbandar	Porbandar
Ashiyapat	Ranavav	Porbandar
Hanumangadh	Ranavav	Porbandar
Bileshwar	Ranavav	Porbandar
Khambhala	Ranavav	Porbandar
Dharampur	Ranavav	Porbandar
Ramgadh	Ranavav	Porbandar
Bordi	Ranavav	Porbandar
Dolatgadh	Ranavav	Porbandar
Khirsara	Ranavav	Porbandar
Daiyar	Ranavav	Porbandar
Valotra	Ranavav	Porbandar
Aniali	Ranavav	Porbandar
Bhod	Ranavav	Porbandar
Pipaliya	Ranavav	Porbandar
Digvijaygadh	Ranavav	Porbandar
Virpur	Ranavav	Porbandar
Vadwala-Rana	Ranavav	Porbandar
Kandorna-Rana	Ranavav	Porbandar
Khijdad	Ranavav	Porbandar
Thoyana	Ranavav	Porbandar
Bapodar	Ranavav	Porbandar
Mokar	Ranavav	Porbandar
Padardi	Ranavav	Porbandar
Kerala	Ranavav	Porbandar
Jambu	Ranavav	Porbandar
Bhoddar	Ranavav	Porbandar
Mahira	Ranavav	Porbandar
Nerana	Ranavav	Porbandar
Khakhravala Nes	Ranavav	Porbandar
Bhukhbara Nes	Ranavav	Porbandar
Ajmapat Nes	Ranavav	Porbandar
Malek Nes	Ranavav	Porbandar
Vijfadiya Nes	Ranavav	Porbandar
Gandiyavad Nes	Ranavav	Porbandar
Munjvaro Nes	Ranavav	Porbandar
Fataltem Nes	Ranavav	Porbandar
Sajanwada Nes	Ranavav	Porbandar
Krushnay Nes	Ranavav	Porbandar
Kathiyo Nes	Ranavav	Porbandar
Chhapravala Nes	Ranavav	Porbandar
Khodiyar Nes	Ranavav	Porbandar
Fulzar Nes	Ranavav	Porbandar
Boriavala Nes	Ranavav	Porbandar
Karval Nes	Ranavav	Porbandar
Jarera Nes	Ranavav	Porbandar
Shermalki Nes	Ranavav	Porbandar
Ranava Nes	Ranavav	Porbandar
Satvira Nes	Ranavav	Porbandar
Dhorivav Nes	Ranavav	Porbandar
Morivirda Nes	Ranavav	Porbandar
Umrivala Nes	Ranavav	Porbandar
Dhuna Nes	Ranavav	Porbandar
Anti Nes	Ranavav	Porbandar
Dhraphadiya Nes	Ranavav	Porbandar
Bedawada Nes	Ranavav	Porbandar
Kothavaro Nes	Ranavav	Porbandar
Dataniya Nes	Ranavav	Porbandar
Kharavira Nes	Ranavav	Porbandar
Shermlanki Khunano Nes	Ranavav	Porbandar
Kharavira Khunano Nes	Ranavav	Porbandar
Dhoria Nes	Ranavav	Porbandar
Devda	Kutiyana	Porbandar
Ramnagar	Kutiyana	Porbandar
Khageshri	Kutiyana	Porbandar
Dhruvala	Kutiyana	Porbandar
Ishvariya	Kutiyana	Porbandar
Amar	Kutiyana	Porbandar
Bavlavadar	Kutiyana	Porbandar
Mahobatpara	Kutiyana	Porbandar
Hamadpara	Kutiyana	Porbandar
Helabeli	Kutiyana	Porbandar
Sindhpur	Kutiyana	Porbandar
Malanka	Kutiyana	Porbandar
Vadala	Kutiyana	Porbandar
Daduka	Kutiyana	Porbandar
Bildi	Kutiyana	Porbandar
Roghada	Kutiyana	Porbandar
Gokaran	Kutiyana	Porbandar
Khunpur	Kutiyana	Porbandar
Teri	Kutiyana	Porbandar
Choliyana	Kutiyana	Porbandar
Baloch	Kutiyana	Porbandar
Mal	Kutiyana	Porbandar
Chauta	Kutiyana	Porbandar
Thepda	Kutiyana	Porbandar
Mandva	Kutiyana	Porbandar
Katwana	Kutiyana	Porbandar
Kotda	Kutiyana	Porbandar
Paswali	Kutiyana	Porbandar
Kantol	Kutiyana	Porbandar
Moddar	Kutiyana	Porbandar
Segras	Kutiyana	Porbandar
Chhatrava	Kutiyana	Porbandar
Bhogsar	Kutiyana	Porbandar
Kavalka	Kutiyana	Porbandar
Gadhvana	Kutiyana	Porbandar
Dharsan	Kutiyana	Porbandar
Kansavad	Kutiyana	Porbandar
Jamra	Kutiyana	Porbandar
Mahiyari	Kutiyana	Porbandar
Tarkhai	Kutiyana	Porbandar
Revadra	Kutiyana	Porbandar
Bhadula	Kutiyana	Porbandar
Junej	Kutiyana	Porbandar
Farer	Kutiyana	Porbandar
Kadegi	Kutiyana	Porbandar
Mota Ghed	Kutiyana	Porbandar
Amipur	Kutiyana	Porbandar
Vadasda	Manavadar	Junagadh
Thaniyana	Manavadar	Junagadh
Zinzri	Manavadar	Junagadh
Bhindora	Manavadar	Junagadh
Gana	Manavadar	Junagadh
Vada	Manavadar	Junagadh
Vekri	Manavadar	Junagadh
Chikhlodra	Manavadar	Junagadh
Deshinga	Manavadar	Junagadh
Marmath	Manavadar	Junagadh
Saradiya	Manavadar	Junagadh
Limbuda	Manavadar	Junagadh
Indra	Manavadar	Junagadh
Sherdi	Manavadar	Junagadh
Untadi	Manavadar	Junagadh
Chudva	Manavadar	Junagadh
Khadiya	Manavadar	Junagadh
Sardargadh	Manavadar	Junagadh
Velva	Manavadar	Junagadh
Jilana	Manavadar	Junagadh
Buri	Manavadar	Junagadh
Rafala	Manavadar	Junagadh
Pajod	Manavadar	Junagadh
Samega	Manavadar	Junagadh
Bhalgam	Manavadar	Junagadh
Dadva	Manavadar	Junagadh
Jambuda	Manavadar	Junagadh
Ronki	Manavadar	Junagadh
Sanosra	Manavadar	Junagadh
Galvav	Manavadar	Junagadh
Dagad	Manavadar	Junagadh
Sultanabad	Manavadar	Junagadh
Eklera	Manavadar	Junagadh
Kodvav	Manavadar	Junagadh
Thapala	Manavadar	Junagadh
Bhitana	Manavadar	Junagadh
Sitana	Manavadar	Junagadh
Nanadiya	Manavadar	Junagadh
Nakra	Manavadar	Junagadh
Khakhavi	Manavadar	Junagadh
Mitadi	Manavadar	Junagadh
Kothariya	Manavadar	Junagadh
Bhalechda	Manavadar	Junagadh
Bodka	Manavadar	Junagadh
Piplana	Manavadar	Junagadh
Katakpara	Manavadar	Junagadh
Sarang pipli	Manavadar	Junagadh
Nandarkha	Manavadar	Junagadh
Kothadi	Manavadar	Junagadh
Mandodra	Manavadar	Junagadh
Vadala	Manavadar	Junagadh
Padardi	Manavadar	Junagadh
Ambaliya	Manavadar	Junagadh
Matiana	Manavadar	Junagadh
Koylana	Manavadar	Junagadh
Dungri	Vanthali	Junagadh
Ravni	Vanthali	Junagadh
Dhandhusar	Vanthali	Junagadh
Barwala	Vanthali	Junagadh
Bantiya	Vanthali	Junagadh
Zampodad	Vanthali	Junagadh
Naredi	Vanthali	Junagadh
Ghantiya	Vanthali	Junagadh
Navlakhi	Vanthali	Junagadh
Balot	Vanthali	Junagadh
Koyli	Vanthali	Junagadh
Nandarkhi (Ranijividi)	Vanthali	Junagadh
Umatwada	Vanthali	Junagadh
Vadla	Vanthali	Junagadh
Shapur	Vanthali	Junagadh
Santalpur	Vanthali	Junagadh
Meghpur	Vanthali	Junagadh
Navada	Vanthali	Junagadh
Tikar-padardi	Vanthali	Junagadh
Akha	Vanthali	Junagadh
Kanjha	Vanthali	Junagadh
Luvarsar	Vanthali	Junagadh
Selra	Vanthali	Junagadh
Dhanfuliya	Vanthali	Junagadh
Kajaliya Nana	Vanthali	Junagadh
Kanjhadi	Vanthali	Junagadh
Gadoi	Vanthali	Junagadh
Tinmas	Vanthali	Junagadh
Sendarda	Vanthali	Junagadh
Khumbhdi	Vanthali	Junagadh
Khokharda	Vanthali	Junagadh
Kajaliya Mota	Vanthali	Junagadh
Bandhda	Vanthali	Junagadh
Bodka	Vanthali	Junagadh
Ganthila	Vanthali	Junagadh
Sonardi	Vanthali	Junagadh
Ghudvadar	Vanthali	Junagadh
Raypur	Vanthali	Junagadh
Sukhpur	Vanthali	Junagadh
Mahobatpur	Vanthali	Junagadh
Bhatiya	Vanthali	Junagadh
Thanapipli	Vanthali	Junagadh
Lushala	Vanthali	Junagadh
Khorasa	Vanthali	Junagadh
Nagadiya	Vanthali	Junagadh
Vaspada	Vanthali	Junagadh
Goladhar	Junagadh	Junagadh
Vadasimdi	Junagadh	Junagadh
Vanandiya	Junagadh	Junagadh
Jhalansar	Junagadh	Junagadh
Kerala	Junagadh	Junagadh
Bhiyal	Junagadh	Junagadh
Choki	Junagadh	Junagadh
Kathrota	Junagadh	Junagadh
Isapur	Junagadh	Junagadh
Baliyavad	Junagadh	Junagadh
Chokli	Junagadh	Junagadh
Vadal	Junagadh	Junagadh
Makhiyala	Junagadh	Junagadh
Pipardi Timbo	Junagadh	Junagadh
Majevdi	Junagadh	Junagadh
Patrapsar	Junagadh	Junagadh
Ambaliya	Junagadh	Junagadh
Rupavati	Junagadh	Junagadh
Taliyadhar	Junagadh	Junagadh
Vadhavi	Junagadh	Junagadh
Virpur	Junagadh	Junagadh
Galiyavada	Junagadh	Junagadh
Sukhpur	Junagadh	Junagadh
Bamangam	Junagadh	Junagadh
Dervan	Junagadh	Junagadh
Hasnapur	Junagadh	Junagadh
Jambudi	Junagadh	Junagadh
Indreshvar	Junagadh	Junagadh
Khalilpur	Junagadh	Junagadh
Surajkund	Junagadh	Junagadh
Girnar Hills	Junagadh	Junagadh
Dungar Thana	Junagadh	Junagadh
Sagdividi	Junagadh	Junagadh
Ivnagar	Junagadh	Junagadh
Palasva	Junagadh	Junagadh
Padariya	Junagadh	Junagadh
Datar Hills	Junagadh	Junagadh
Bordevi	Junagadh	Junagadh
Limbdi Dhar	Junagadh	Junagadh
Mandlikpur	Junagadh	Junagadh
Nava Pipaliya	Junagadh	Junagadh
Bandhala	Junagadh	Junagadh
Bhalgam	Junagadh	Junagadh
Mandanpara	Junagadh	Junagadh
Ramnath	Junagadh	Junagadh
Vijapur	Junagadh	Junagadh
Sodvadar	Junagadh	Junagadh
Intala	Junagadh	Junagadh
Patapur	Junagadh	Junagadh
Salatha	Junagadh	Junagadh
Khadiya	Junagadh	Junagadh
Toraniya	Junagadh	Junagadh
Navagam	Junagadh	Junagadh
Bilkha	Junagadh	Junagadh
Umrala	Junagadh	Junagadh
Avatadiya Mota	Junagadh	Junagadh
Chorvadi	Junagadh	Junagadh
Anandpur	Junagadh	Junagadh
Mevasa Khadiya	Junagadh	Junagadh
Bagdu	Junagadh	Junagadh
Prabhatpur	Junagadh	Junagadh
Rameshvar	Junagadh	Junagadh
Avatadiya Nana	Junagadh	Junagadh
Mevasa Kamribaina	Junagadh	Junagadh
Bela	Junagadh	Junagadh
Badalpur	Junagadh	Junagadh
Jamka	Junagadh	Junagadh
Semrala	Junagadh	Junagadh
Sankhdavadar	Junagadh	Junagadh
Thumbala	Junagadh	Junagadh
Hadmatiya Vishal	Bhesan	Junagadh
Sukhpur	Bhesan	Junagadh
Bhatgam	Bhesan	Junagadh
Bamangadh	Bhesan	Junagadh
Hadmatiya Khajuri	Bhesan	Junagadh
Sankrola	Bhesan	Junagadh
Dholwa	Bhesan	Junagadh
Barwala	Bhesan	Junagadh
Parab Vavdi	Bhesan	Junagadh
Khambhaliya	Bhesan	Junagadh
Mandva	Bhesan	Junagadh
Kharachiya	Bhesan	Junagadh
Mendpara	Bhesan	Junagadh
Patla	Bhesan	Junagadh
Paturan	Bhesan	Junagadh
Dudhala	Bhesan	Junagadh
Malida	Bhesan	Junagadh
Kala Gadba	Bhesan	Junagadh
Paswala	Bhesan	Junagadh
Kariya	Bhesan	Junagadh
Ranpur	Bhesan	Junagadh
Rafaliya	Bhesan	Junagadh
Galath	Bhesan	Junagadh
Chuda	Bhesan	Junagadh
Hadmatiya Khakhra	Bhesan	Junagadh
Sardarpar	Bhesan	Junagadh
Morwada	Bhesan	Junagadh
Juni Dhari Gundali	Bhesan	Junagadh
Pipaliya Tadka	Bhesan	Junagadh
Bhesan	Bhesan	Junagadh
Samatpara	Bhesan	Junagadh
Patwad	Bhesan	Junagadh
Ratanpara	Bhesan	Junagadh
Ranshivav	Bhesan	Junagadh
Mathura Thana	Bhesan	Junagadh
Nava Vaghaniya	Bhesan	Junagadh
Chhodvadi	Bhesan	Junagadh
Vandarvad	Bhesan	Junagadh
Gorakhpur	Bhesan	Junagadh
Chanaka	Bhesan	Junagadh
Mota Gujariya	Bhesan	Junagadh
Nana Gujariya	Bhesan	Junagadh
Umrali	Bhesan	Junagadh
Navi Dhari Gundali	Bhesan	Junagadh
Damrala	Bhesan	Junagadh
Gorviyali	Bhesan	Junagadh
Hadmatiya Mota	Visavadar	Junagadh
Navaniya	Visavadar	Junagadh
Kotda Mota	Visavadar	Junagadh
Pipaliya Hajani	Visavadar	Junagadh
Pirvad	Visavadar	Junagadh
Shobhavadla Lashkar	Visavadar	Junagadh
Kanavadla	Visavadar	Junagadh
Pindakhai Moti	Visavadar	Junagadh
Vichhavad	Visavadar	Junagadh
Shirvaniya	Visavadar	Junagadh
Kotda Nana	Visavadar	Junagadh
Manganath Pipli	Visavadar	Junagadh
Rupavati	Visavadar	Junagadh
Chhalda	Visavadar	Junagadh
Rabarika	Visavadar	Junagadh
Hadmatiya Nana	Visavadar	Junagadh
Pindakhai Nani	Visavadar	Junagadh
Bhalgam	Visavadar	Junagadh
Shapar	Visavadar	Junagadh
Lunghiya	Visavadar	Junagadh
Sudavad	Visavadar	Junagadh
Jambuda	Visavadar	Junagadh
Dhebar	Visavadar	Junagadh
Desai Vadala	Visavadar	Junagadh
Sukhpur	Visavadar	Junagadh
Ishvariya Mandavad	Visavadar	Junagadh
Vajdi	Visavadar	Junagadh
Khambhaliya	Visavadar	Junagadh
Virpur	Visavadar	Junagadh
Khijadiya	Visavadar	Junagadh
Chavand Navi	Visavadar	Junagadh
Chavand Juni	Visavadar	Junagadh
Leriya	Visavadar	Junagadh
Ravani (Kuba)	Visavadar	Junagadh
Kuba(Ravani)	Visavadar	Junagadh
Chhelanka	Visavadar	Junagadh
Mahuda	Visavadar	Junagadh
Mahudi	Visavadar	Junagadh
Jhanjhesar	Visavadar	Junagadh
Bhat Vavdi	Visavadar	Junagadh
Ghodasan	Visavadar	Junagadh
Kankchiyala	Visavadar	Junagadh
Ambala	Visavadar	Junagadh
Bhutdi	Visavadar	Junagadh
Mandavad	Visavadar	Junagadh
Moniya	Visavadar	Junagadh
Chaparda	Visavadar	Junagadh
Monpari Nani	Visavadar	Junagadh
Ghantiyan	Visavadar	Junagadh
Vadala Shetranj	Visavadar	Junagadh
Shobhavadla Gir	Visavadar	Junagadh
Jambala	Visavadar	Junagadh
Baradiya	Visavadar	Junagadh
Dadar	Visavadar	Junagadh
Sarsai	Visavadar	Junagadh
Kalsari	Visavadar	Junagadh
Kalavad	Visavadar	Junagadh
Jetalvad	Visavadar	Junagadh
Vekariya	Visavadar	Junagadh
Lalpur	Visavadar	Junagadh
Govindpara	Visavadar	Junagadh
Monpari Moti	Visavadar	Junagadh
Ishvariya (Gir)	Visavadar	Junagadh
Miya Vadla	Visavadar	Junagadh
Ratang	Visavadar	Junagadh
Liliya	Visavadar	Junagadh
Limadhra	Visavadar	Junagadh
Haripur	Visavadar	Junagadh
Khambha Gir	Visavadar	Junagadh
Piyava Gir	Visavadar	Junagadh
Prempara	Visavadar	Junagadh
Jambudi	Visavadar	Junagadh
Manandiya	Visavadar	Junagadh
Bagoya	Visavadar	Junagadh
Ravani Mundiya	Visavadar	Junagadh
Kagmal	Visavadar	Junagadh
Tadhi	Visavadar	Junagadh
Rajpara	Visavadar	Junagadh
Dudhala	Visavadar	Junagadh
Javaldi	Visavadar	Junagadh
Barvaniya Nes	Visavadar	Junagadh
Mota Bhilgala	Visavadar	Junagadh
Panvi	Visavadar	Junagadh
Makhaniya	Visavadar	Junagadh
Khambhda	Visavadar	Junagadh
Haldarva Nes	Visavadar	Junagadh
Bajariya	Visavadar	Junagadh
Amaliyara	Visavadar	Junagadh
Lasa	Visavadar	Junagadh
Panjrapole Ni Suvardi	Visavadar	Junagadh
Lilapani	Visavadar	Junagadh
Suvardi	Visavadar	Junagadh
Padapani	Visavadar	Junagadh
Devkaraniya	Visavadar	Junagadh
Goradwala	Visavadar	Junagadh
Shapur (Nes)	Visavadar	Junagadh
Kutiya-Amliyara	Visavadar	Junagadh
Rosali	Visavadar	Junagadh
Bogadiya	Visavadar	Junagadh
Kankai	Visavadar	Junagadh
Karkadi	Visavadar	Junagadh
Hasnapur	Visavadar	Junagadh
Jambuthala	Visavadar	Junagadh
Arniyala	Mendarda	Junagadh
Simasi	Mendarda	Junagadh
Mithapur	Mendarda	Junagadh
Khadpipli	Mendarda	Junagadh
Khim Padar	Mendarda	Junagadh
Nagalpur	Mendarda	Junagadh
Datrana	Mendarda	Junagadh
Alidhra	Mendarda	Junagadh
Barvala	Mendarda	Junagadh
Dhandhawada	Mendarda	Junagadh
Samadhiyala	Mendarda	Junagadh
Chiroda	Mendarda	Junagadh
Gundala	Mendarda	Junagadh
Jhinjhuda	Mendarda	Junagadh
Najapur	Mendarda	Junagadh
Mendarda	Mendarda	Junagadh
Amargadh	Mendarda	Junagadh
Rajesar	Mendarda	Junagadh
Ambla	Mendarda	Junagadh
Rajavad	Mendarda	Junagadh
Devgadh	Mendarda	Junagadh
Babar Tirath	Mendarda	Junagadh
Manpur	Mendarda	Junagadh
Moti Khodiyar	Mendarda	Junagadh
Nataliya	Mendarda	Junagadh
Nani Khodiyar	Mendarda	Junagadh
Itali	Mendarda	Junagadh
Kanthala Nes	Mendarda	Junagadh
Kiloriya Nes	Mendarda	Junagadh
Vaniya Vav	Mendarda	Junagadh
Kenadipur	Mendarda	Junagadh
Ambala	Mendarda	Junagadh
Lilva	Mendarda	Junagadh
Khijadiya	Mendarda	Junagadh
Gadhali	Mendarda	Junagadh
Patarama	Mendarda	Junagadh
Chandravadi	Mendarda	Junagadh
Dedakiyal	Mendarda	Junagadh
Timbi	Mendarda	Junagadh
Malanka	Mendarda	Junagadh
Jambudi Nes	Mendarda	Junagadh
Karsangadh	Mendarda	Junagadh
Gundiyali	Mendarda	Junagadh
Amrapur	Mendarda	Junagadh
Ranidhar	Mendarda	Junagadh
Gadakiya	Mendarda	Junagadh
Surajgadh	Mendarda	Junagadh
Najapur (Chhatariya)	Mendarda	Junagadh
Indrana	Keshod	Junagadh
Balagam	Keshod	Junagadh
Sarod	Keshod	Junagadh
Bamnasa	Keshod	Junagadh
Muliyasa	Keshod	Junagadh
Jonpur	Keshod	Junagadh
Mangalpur	Keshod	Junagadh
Manekwada	Keshod	Junagadh
Dervan	Keshod	Junagadh
Magharwada	Keshod	Junagadh
Agatrai	Keshod	Junagadh
Pasvaliya	Keshod	Junagadh
Madhda	Keshod	Junagadh
Padodar	Keshod	Junagadh
Akhodad	Keshod	Junagadh
Panchala	Keshod	Junagadh
Sutrej	Keshod	Junagadh
Khirsara	Keshod	Junagadh
Khamidana	Keshod	Junagadh
Titodi	Keshod	Junagadh
Isra	Keshod	Junagadh
Chandigadh	Keshod	Junagadh
Handla	Keshod	Junagadh
Badodar	Keshod	Junagadh
Sangarsola	Keshod	Junagadh
Chitri	Keshod	Junagadh
Fagli	Keshod	Junagadh
Movana	Keshod	Junagadh
Pipli	Keshod	Junagadh
Nani Ghansari	Keshod	Junagadh
Nunarda	Keshod	Junagadh
Moti Ghansari	Keshod	Junagadh
Raningpara	Keshod	Junagadh
Kaneri	Keshod	Junagadh
Dhrabavad	Keshod	Junagadh
Nonjhanvav	Keshod	Junagadh
Pransli	Keshod	Junagadh
Ajab	Keshod	Junagadh
Mesvan	Keshod	Junagadh
Sondarda	Keshod	Junagadh
Kevadra	Keshod	Junagadh
Char	Keshod	Junagadh
Bava Simroli	Keshod	Junagadh
Silodar	Keshod	Junagadh
Bhat Simroli	Keshod	Junagadh
Eklera	Keshod	Junagadh
Pankhan	Keshod	Junagadh
Gelana	Keshod	Junagadh
Revadra	Keshod	Junagadh
Koyalana Lathiya	Keshod	Junagadh
Kalavani	Keshod	Junagadh
Rangpur	Keshod	Junagadh
Shergadh	Keshod	Junagadh
Miti	Mangrol	Junagadh
Hantarpur	Mangrol	Junagadh
Fulrama	Mangrol	Junagadh
Langad	Mangrol	Junagadh
Osa Ghed	Mangrol	Junagadh
Bhathrot	Mangrol	Junagadh
Bagasra-Ghed	Mangrol	Junagadh
Ghodadar	Mangrol	Junagadh
Sharma	Mangrol	Junagadh
Samarda	Mangrol	Junagadh
Sandha	Mangrol	Junagadh
Sarsali	Mangrol	Junagadh
Thali	Mangrol	Junagadh
Mekhadi	Mangrol	Junagadh
Virol	Mangrol	Junagadh
Kankana	Mangrol	Junagadh
Divrana	Mangrol	Junagadh
Kalej	Mangrol	Junagadh
Chankhva	Mangrol	Junagadh
Vadla	Mangrol	Junagadh
Ajak	Mangrol	Junagadh
Antroli	Mangrol	Junagadh
Divasa	Mangrol	Junagadh
Bamanvada	Mangrol	Junagadh
Nagichana	Mangrol	Junagadh
Darsali	Mangrol	Junagadh
Chingariya	Mangrol	Junagadh
Farangta	Mangrol	Junagadh
Zariyavada	Mangrol	Junagadh
Sangavada	Mangrol	Junagadh
Shil	Mangrol	Junagadh
Talodra	Mangrol	Junagadh
Nandarkhi	Mangrol	Junagadh
Chandvana	Mangrol	Junagadh
Karamdi	Mangrol	Junagadh
Gorej	Mangrol	Junagadh
Menanj	Mangrol	Junagadh
Kankasa	Mangrol	Junagadh
Lohej	Mangrol	Junagadh
Rahij	Mangrol	Junagadh
Roodalpur	Mangrol	Junagadh
Sultanpur	Mangrol	Junagadh
Bhatgam	Mangrol	Junagadh
Lathodra	Mangrol	Junagadh
Juthal	Mangrol	Junagadh
Sakrana	Mangrol	Junagadh
Virpur	Mangrol	Junagadh
Lambora	Mangrol	Junagadh
Dhelana	Mangrol	Junagadh
Mankhetra	Mangrol	Junagadh
Maktupur	Mangrol	Junagadh
Kotda Nava	Mangrol	Junagadh
Shaikhpur	Mangrol	Junagadh
Kotda Juna	Mangrol	Junagadh
Chotilividi	Mangrol	Junagadh
Sheriyakhan	Mangrol	Junagadh
Jamvali	Mangrol	Junagadh
Shepa	Mangrol	Junagadh
Husenabad	Mangrol	Junagadh
Shapur	Mangrol	Junagadh
Sheriyaj	Mangrol	Junagadh
Arena	Mangrol	Junagadh
Khodada	Mangrol	Junagadh
Pikhor	Malia	Junagadh
Panidhra	Malia	Junagadh
Gangecha	Malia	Junagadh
Avaniya	Malia	Junagadh
Bhankharvad	Malia	Junagadh
Matarvaniya	Malia	Junagadh
Tarsingda	Malia	Junagadh
Bodi	Malia	Junagadh
Ambalgadh	Malia	Junagadh
Amrapur Gir	Malia	Junagadh
Virdi	Malia	Junagadh
Vadala	Malia	Junagadh
Galodar	Malia	Junagadh
Malia	Malia	Junagadh
Akala	Malia	Junagadh
Kalimbhda	Malia	Junagadh
Katrasa	Malia	Junagadh
Jalondar	Malia	Junagadh
Devgam	Malia	Junagadh
Dharampur	Malia	Junagadh
Dudhala	Malia	Junagadh
Kerala	Malia	Junagadh
Janadi	Malia	Junagadh
Ambecha	Malia	Junagadh
Bhanduri	Malia	Junagadh
Budhecha	Malia	Junagadh
Langodra	Malia	Junagadh
Gotana	Malia	Junagadh
Ghunghati	Malia	Junagadh
Vadiya	Malia	Junagadh
Sarkadiya	Malia	Junagadh
Itali	Malia	Junagadh
Vandarvad	Malia	Junagadh
Babra	Malia	Junagadh
Ladudi -Gir	Malia	Junagadh
Dhrabavad	Malia	Junagadh
Jangar	Malia	Junagadh
Chuldi	Malia	Junagadh
Pankuva	Malia	Junagadh
Kadaya	Malia	Junagadh
Dhanej Moti	Malia	Junagadh
Dhanej Nani	Malia	Junagadh
Jhadka	Malia	Junagadh
Khera	Malia	Junagadh
Ghumli	Malia	Junagadh
Kukasvada	Malia	Junagadh
Khambhaliya	Malia	Junagadh
Jhunjharpur	Malia	Junagadh
Kanek	Malia	Junagadh
Visanvel	Malia	Junagadh
Gadu	Malia	Junagadh
Samdhiyala	Malia	Junagadh
Khorasa Gir	Malia	Junagadh
Patla	Malia	Junagadh
Lachhadi	Malia	Junagadh
Akala Gir	Malia	Junagadh
Pipalva	Malia	Junagadh
Barula	Malia	Junagadh
Januda	Malia	Junagadh
Sukhpur	Malia	Junagadh
Shantipura	Malia	Junagadh
Danderi	Malia	Junagadh
Achhidra	Malia	Junagadh
Kerambha	Talala	Junagadh
Dedkadi	Talala	Junagadh
Jambuthala	Talala	Junagadh
Raydi	Talala	Junagadh
Khada	Talala	Junagadh
Kadali	Talala	Junagadh
Nanava	Talala	Junagadh
Kansiya	Talala	Junagadh
Kutiya	Talala	Junagadh
Nana Bhilgala	Talala	Junagadh
Kathital	Talala	Junagadh
Sasan	Talala	Junagadh
Pancholi	Talala	Junagadh
Dudhala	Talala	Junagadh
Alavani	Talala	Junagadh
Kadvali	Talala	Junagadh
Karamnadajiya	Talala	Junagadh
Piparda	Talala	Junagadh
Dayara Timbi	Talala	Junagadh
Patariya	Talala	Junagadh
Karamdadi	Talala	Junagadh
Junvaniya	Talala	Junagadh
Nima	Talala	Junagadh
Kamleshwar	Talala	Junagadh
Chhodiya	Talala	Junagadh
Bhalchhel	Talala	Junagadh
Devaliya	Talala	Junagadh
Sandhbeda	Talala	Junagadh
Lakadverines	Talala	Junagadh
Haripur	Talala	Junagadh
Chitrod	Talala	Junagadh
Kiloriya	Talala	Junagadh
Vadvangada	Talala	Junagadh
Khakhravala	Talala	Junagadh
Bhojde	Talala	Junagadh
Sangodra	Talala	Junagadh
Hiranvel	Talala	Junagadh
Bheriya	Talala	Junagadh
Abudi	Talala	Junagadh
Chitravad	Talala	Junagadh
Borvav	Talala	Junagadh
Lushala	Talala	Junagadh
Kapuriya	Talala	Junagadh
Patasala	Talala	Junagadh
Ravta	Talala	Junagadh
Kheriyavala	Talala	Junagadh
Kisa	Talala	Junagadh
Vansali	Talala	Junagadh
Rasulpura	Talala	Junagadh
Jasapur	Talala	Junagadh
Ramarechi	Talala	Junagadh
Jepur	Talala	Junagadh
Bakula Dhanej	Talala	Junagadh
Khirdhar	Talala	Junagadh
Virpur	Talala	Junagadh
Dhava	Talala	Junagadh
Moruka	Talala	Junagadh
Vadla	Talala	Junagadh
Chopatla	Talala	Junagadh
Gola	Talala	Junagadh
Bhuvatirath	Talala	Junagadh
Bhagatimbi	Talala	Junagadh
Khodiyar	Talala	Junagadh
Bhantha	Talala	Junagadh
Janvadla	Talala	Junagadh
Somanisar	Talala	Junagadh
Bamanasa	Talala	Junagadh
Ankolvadi	Talala	Junagadh
Surva	Talala	Junagadh
Gundaran	Talala	Junagadh
Galiyawad	Talala	Junagadh
Umrethi	Talala	Junagadh
Semarvav	Talala	Junagadh
Maljhinjhva	Talala	Junagadh
Gabha	Talala	Junagadh
Ghunsiya	Talala	Junagadh
Dhramanva	Talala	Junagadh
Pipalva	Talala	Junagadh
Amblash	Talala	Junagadh
Madhupur Jambur	Talala	Junagadh
Hadmatiya	Talala	Junagadh
Mandorna	Talala	Junagadh
Gadhula	Talala	Junagadh
Batheshvar	Talala	Junagadh
Javantri	Talala	Junagadh
Jasadhar	Talala	Junagadh
Anida	Talala	Junagadh
Bhimdeval	Talala	Junagadh
Ratidhar	Talala	Junagadh
Rampara	Talala	Junagadh
Vadala	Talala	Junagadh
Raydi	Talala	Junagadh
Pikhor	Talala	Junagadh
Semaliya	Talala	Junagadh
Jamalpara	Talala	Junagadh
Vithalpur	Talala	Junagadh
Sajiya	Talala	Junagadh
Amrutvel	Talala	Junagadh
Shirvan	Talala	Junagadh
Vadodra Dodiya	Patan-Veraval	Junagadh
Simar	Patan-Veraval	Junagadh
Kindarva	Patan-Veraval	Junagadh
Sarasva	Patan-Veraval	Junagadh
Paldi	Patan-Veraval	Junagadh
Deda	Patan-Veraval	Junagadh
Kherali	Patan-Veraval	Junagadh
Hasnavadar	Patan-Veraval	Junagadh
Chhapri	Patan-Veraval	Junagadh
Ukadiya	Patan-Veraval	Junagadh
Umrala	Patan-Veraval	Junagadh
Umba	Patan-Veraval	Junagadh
Malondha	Patan-Veraval	Junagadh
Vavdi Adri	Patan-Veraval	Junagadh
Supasi	Patan-Veraval	Junagadh
Sidokar	Patan-Veraval	Junagadh
Adri	Patan-Veraval	Junagadh
Navapara	Patan-Veraval	Junagadh
Chanduvav	Patan-Veraval	Junagadh
Chamoda	Patan-Veraval	Junagadh
Ambaliyala	Patan-Veraval	Junagadh
Inaj	Patan-Veraval	Junagadh
Moraj	Patan-Veraval	Junagadh
Bherala	Patan-Veraval	Junagadh
Gunvantpur	Patan-Veraval	Junagadh
Mathasuriya	Patan-Veraval	Junagadh
Lumbha	Patan-Veraval	Junagadh
Kodidara	Patan-Veraval	Junagadh
Pandva	Patan-Veraval	Junagadh
Mandor	Patan-Veraval	Junagadh
Govindpara	Patan-Veraval	Junagadh
Dabhor	Patan-Veraval	Junagadh
Chhatroda	Patan-Veraval	Junagadh
Dari	Patan-Veraval	Junagadh
Tantivela	Patan-Veraval	Junagadh
Savni	Patan-Veraval	Junagadh
Ishvariya	Patan-Veraval	Junagadh
Bhetali	Patan-Veraval	Junagadh
Khandheri	Patan-Veraval	Junagadh
Kukras	Patan-Veraval	Junagadh
Indroi	Patan-Veraval	Junagadh
Navadra	Patan-Veraval	Junagadh
Patan (Rural Area)(Part)	Patan-Veraval	Junagadh
Veraval(Rural Area) (Part)	Patan-Veraval	Junagadh
Mithapur	Patan-Veraval	Junagadh
Sonariya	Patan-Veraval	Junagadh
Meghpur	Patan-Veraval	Junagadh
Bolas	Patan-Veraval	Junagadh
Nakhada	Patan-Veraval	Junagadh
Rampara	Patan-Veraval	Junagadh
Ajotha	Patan-Veraval	Junagadh
Badalpara	Patan-Veraval	Junagadh
Kajli	Patan-Veraval	Junagadh
Bij	Patan-Veraval	Junagadh
Anand Para	Sutrapada	Junagadh
Tobra	Sutrapada	Junagadh
Khambha	Sutrapada	Junagadh
Mahobatpara	Sutrapada	Junagadh
Rangpur	Sutrapada	Junagadh
Pipalva	Sutrapada	Junagadh
Timbdi	Sutrapada	Junagadh
Ghantiya	Sutrapada	Junagadh
Virodar	Sutrapada	Junagadh
Lakhapara	Sutrapada	Junagadh
Gorakh Madhi	Sutrapada	Junagadh
Sundarpara	Sutrapada	Junagadh
Lati	Sutrapada	Junagadh
Kadvar	Sutrapada	Junagadh
Harnasa	Sutrapada	Junagadh
Umbri	Sutrapada	Junagadh
Navagam	Sutrapada	Junagadh
Amrapur	Sutrapada	Junagadh
Alidhra	Sutrapada	Junagadh
Pransli	Sutrapada	Junagadh
Bhuvavada	Sutrapada	Junagadh
Gangetha	Sutrapada	Junagadh
Vansavad	Sutrapada	Junagadh
Barula	Sutrapada	Junagadh
Sara	Sutrapada	Junagadh
Bosan	Sutrapada	Junagadh
Chagiya	Sutrapada	Junagadh
Vavdi (Sutra)	Sutrapada	Junagadh
Morasa	Sutrapada	Junagadh
Thareli	Sutrapada	Junagadh
Padruka	Sutrapada	Junagadh
Kadsala	Sutrapada	Junagadh
Khera	Sutrapada	Junagadh
Bhuva Timbi	Sutrapada	Junagadh
Moradiya	Sutrapada	Junagadh
Solaj	Sutrapada	Junagadh
Lodhva	Sutrapada	Junagadh
Prashnavda	Sutrapada	Junagadh
Vadodra (Jhala)	Sutrapada	Junagadh
Barevla	Sutrapada	Junagadh
Singsar	Sutrapada	Junagadh
Matana	Sutrapada	Junagadh
Rakhej	Sutrapada	Junagadh
Thordi	Sutrapada	Junagadh
Dhamlej	Sutrapada	Junagadh
Kanjotar	Sutrapada	Junagadh
Valadar	Kodinar	Junagadh
Sandhnidhar	Kodinar	Junagadh
Ghantvad	Kodinar	Junagadh
Harmadiya	Kodinar	Junagadh
Arithiya	Kodinar	Junagadh
Nagadla	Kodinar	Junagadh
Chidivav	Kodinar	Junagadh
Kantala	Kodinar	Junagadh
Pavti	Kodinar	Junagadh
Arnej	Kodinar	Junagadh
Girdevli	Kodinar	Junagadh
Sugala	Kodinar	Junagadh
Sedhaya	Kodinar	Junagadh
Pichhva	Kodinar	Junagadh
Pichhvi	Kodinar	Junagadh
Alidar	Kodinar	Junagadh
Morvad	Kodinar	Junagadh
Jagatiya	Kodinar	Junagadh
Singhaj	Kodinar	Junagadh
Fachariya	Kodinar	Junagadh
Anandpur	Kodinar	Junagadh
Navagam	Kodinar	Junagadh
Pedhavada	Kodinar	Junagadh
Kadvasan	Kodinar	Junagadh
Vadnagar	Kodinar	Junagadh
Devalpur	Kodinar	Junagadh
Govindpur Bhandariya	Kodinar	Junagadh
Chhachhar	Kodinar	Junagadh
Vithalpur	Kodinar	Junagadh
Jithla	Kodinar	Junagadh
Bodva	Kodinar	Junagadh
Adpokar	Kodinar	Junagadh
Kareda	Kodinar	Junagadh
Sayajirajpura	Kodinar	Junagadh
Inchvad Nani	Kodinar	Junagadh
Gohil ni khan	Kodinar	Junagadh
Dudana	Kodinar	Junagadh
Ronaj	Kodinar	Junagadh
Mitiyaj	Kodinar	Junagadh
Fafni Moti	Kodinar	Junagadh
Jamanvada	Kodinar	Junagadh
Fafni Nani	Kodinar	Junagadh
Advi	Kodinar	Junagadh
Dolasa	Kodinar	Junagadh
Velva	Kodinar	Junagadh
Malgam	Kodinar	Junagadh
Devli	Kodinar	Junagadh
Chauhan ni khan	Kodinar	Junagadh
Barda	Kodinar	Junagadh
Mul Dwarka	Kodinar	Junagadh
Panadar	Kodinar	Junagadh
Pipli	Kodinar	Junagadh
Damli	Kodinar	Junagadh
Kadodara	Kodinar	Junagadh
Pipalva Bavana	Kodinar	Junagadh
Jantrakhadi	Kodinar	Junagadh
Panch Pipalva	Kodinar	Junagadh
Nanavada	Kodinar	Junagadh
Malsaram	Kodinar	Junagadh
Sarkhadi	Kodinar	Junagadh
Chhara	Kodinar	Junagadh
Kaj	Kodinar	Junagadh
Velan	Kodinar	Junagadh
Sapnes	Una	Junagadh
Chuldi	Una	Junagadh
Vaniagali	Una	Junagadh
Jamvali	Una	Junagadh
Hadala	Una	Junagadh
Vankajambu	Una	Junagadh
Vakumbha (Karjadi)	Una	Junagadh
Lotha	Una	Junagadh
Karjadi	Una	Junagadh
Jambuda	Una	Junagadh
Vakumbha (Dhramaniya)	Una	Junagadh
Nada	Una	Junagadh
Jambupani	Una	Junagadh
Vakumbha(Tadi)	Una	Junagadh
Bilivali Tali	Una	Junagadh
Dhramaniya	Una	Junagadh
Chhodvadi	Una	Junagadh
Tadi	Una	Junagadh
Giglani Gor	Una	Junagadh
Gola	Una	Junagadh
Vankidas	Una	Junagadh
Vanzara	Una	Junagadh
Biliyat Nes	Una	Junagadh
Biliyat	Una	Junagadh
Sudavi	Una	Junagadh
Chhatarla	Una	Junagadh
Laptni	Una	Junagadh
Aral	Una	Junagadh
Charchock	Una	Junagadh
Pichhadibela	Una	Junagadh
Panvadi	Una	Junagadh
Vagha Timbi	Una	Junagadh
Mahuda	Una	Junagadh
Piliyo Dhuno	Una	Junagadh
Jenagar	Una	Junagadh
Hadkala	Una	Junagadh
Ganeshgali	Una	Junagadh
Ghud Jinjva	Una	Junagadh
Asundrali	Una	Junagadh
Gupti	Una	Junagadh
Bhutada Hodi	Una	Junagadh
Leria	Una	Junagadh
Damacha	Una	Junagadh
Kardapan	Una	Junagadh
Gafagala	Una	Junagadh
Kalipat	Una	Junagadh
Umarvidi	Una	Junagadh
Dabhala	Una	Junagadh
Abudi	Una	Junagadh
Dedakiya	Una	Junagadh
Nava Dedakiya	Una	Junagadh
Banej	Una	Junagadh
Patla (Mahadev)	Una	Junagadh
Kanek	Una	Junagadh
Pareva	Una	Junagadh
Lamghar	Una	Junagadh
Kansvala	Una	Junagadh
Tulsishyam	Una	Junagadh
Dodhi	Una	Junagadh
Rajasthali	Una	Junagadh
Sakra	Una	Junagadh
Barwala	Una	Junagadh
Gandhara	Una	Junagadh
Vadli	Una	Junagadh
Nana Mindha	Una	Junagadh
Mota Mindha	Una	Junagadh
Khajuri	Una	Junagadh
Bobadiya	Una	Junagadh
Kandhavala	Una	Junagadh
Khakharavali	Una	Junagadh
Chhela	Una	Junagadh
Dal	Una	Junagadh
Kansariya	Una	Junagadh
Jamvala	Una	Junagadh
Bharawala	Una	Junagadh
Tadhodiya	Una	Junagadh
Viragali	Una	Junagadh
Ujjadiya	Una	Junagadh
Mandvi	Una	Junagadh
Oyna	Una	Junagadh
Sarkadiya	Una	Junagadh
Nitli	Una	Junagadh
Sonariya	Una	Junagadh
Motisar	Una	Junagadh
Nagadiya	Una	Junagadh
Jambudi	Una	Junagadh
Kodiya	Una	Junagadh
Rasulpara	Una	Junagadh
Mor Supada Nes	Una	Junagadh
Babariya	Una	Junagadh
Tapakeshvar	Una	Junagadh
Fareda	Una	Junagadh
Gir Gadhada	Una	Junagadh
Dron	Una	Junagadh
Itvaya	Una	Junagadh
Sanosri	Una	Junagadh
Dhokadva	Una	Junagadh
Bediya	Una	Junagadh
Bandharda	Una	Junagadh
Mota Samadhiyala	Una	Junagadh
Mahobatpara	Una	Junagadh
Ambada	Una	Junagadh
Nava Ugla	Una	Junagadh
Khilavad	Una	Junagadh
Fatsar	Una	Junagadh
Umedpara	Una	Junagadh
Sanvav	Una	Junagadh
Jaragli	Una	Junagadh
Vadviyala	Una	Junagadh
Jhudvadli	Una	Junagadh
Gundala	Una	Junagadh
Ugla	Una	Junagadh
Vajdi	Una	Junagadh
Padapadar	Una	Junagadh
Pankhan	Una	Junagadh
Nana Samadhiyala	Una	Junagadh
Luvari Moli	Una	Junagadh
Naliyeri Moli	Una	Junagadh
Vankiya	Una	Junagadh
Kakidi Moli	Una	Junagadh
Nandrakh	Una	Junagadh
Kandhi	Una	Junagadh
Bhacha	Una	Junagadh
Bhadiyadar	Una	Junagadh
Men	Una	Junagadh
Khapat	Una	Junagadh
Ankolali	Una	Junagadh
Panderi	Una	Junagadh
Dhrabavad	Una	Junagadh
Velakot	Una	Junagadh
Jhanjhariya	Una	Junagadh
Sonpura	Una	Junagadh
Bhiyal	Una	Junagadh
Bodidar	Una	Junagadh
Kaneri	Una	Junagadh
Fulka	Una	Junagadh
Undari	Una	Junagadh
Ratad	Una	Junagadh
Chanchakvad	Una	Junagadh
Patapur	Una	Junagadh
Nesda	Una	Junagadh
Untwala	Una	Junagadh
Chorali Moli	Una	Junagadh
Moti Moli	Una	Junagadh
Paswala	Una	Junagadh
Umej	Una	Junagadh
Vavarda	Una	Junagadh
Kansari	Una	Junagadh
Varsingpur	Una	Junagadh
Elampur	Una	Junagadh
Damasa	Una	Junagadh
Maghardi	Una	Junagadh
Ambavad	Una	Junagadh
Kanakiya	Una	Junagadh
Simasi	Una	Junagadh
Ranvasi	Una	Junagadh
Bhebha	Una	Junagadh
Yajpur	Una	Junagadh
Nathej	Una	Junagadh
Samter	Una	Junagadh
Gangda	Una	Junagadh
Sondarda	Una	Junagadh
Sondardi	Una	Junagadh
Khatriwada	Una	Junagadh
Sanakhda	Una	Junagadh
Rameshvar	Una	Junagadh
Kanakbarda	Una	Junagadh
Sultanpur	Una	Junagadh
Siloj	Una	Junagadh
Nathal	Una	Junagadh
Kesariya	Una	Junagadh
Madhgam	Una	Junagadh
Revad	Una	Junagadh
Lerka	Una	Junagadh
Chikhli	Una	Junagadh
Sokhda	Una	Junagadh
Kajardi	Una	Junagadh
Sonari	Una	Junagadh
Mota Desar	Una	Junagadh
Lamdhar	Una	Junagadh
Kothari	Una	Junagadh
Amodra	Una	Junagadh
Garal	Una	Junagadh
Motha	Una	Junagadh
Manekpur	Una	Junagadh
Dudhala	Una	Junagadh
Sanjavapur	Una	Junagadh
Anjar	Una	Junagadh
Shahdesar	Una	Junagadh
Bhadasi	Una	Junagadh
Kob	Una	Junagadh
Bhingran	Una	Junagadh
Tad	Una	Junagadh
Paldi	Una	Junagadh
Olvan	Una	Junagadh
Vansoj	Una	Junagadh
Delwada	Una	Junagadh
Khan	Una	Junagadh
Dandi	Una	Junagadh
Khajudra	Una	Junagadh
Simar	Una	Junagadh
Saiyad Rajpara	Una	Junagadh
Kheda	Una	Junagadh
Senjaliya	Una	Junagadh
Rajput Rajpara	Una	Junagadh
Kalapan	Una	Junagadh
Rampara	Una	Junagadh
Naliya Mandvi	Una	Junagadh
Nandan	Una	Junagadh
Jhankharvada	Una	Junagadh
Navabandar	Una	Junagadh
Timbarva	Una	Junagadh
Kothariya	Una	Junagadh
Chikhal Kuba	Una	Junagadh
Bhayadhar	Una	Junagadh
Bhakha	Una	Junagadh
Thordi	Una	Junagadh
Ghodavadi	Una	Junagadh
Jasadhar	Una	Junagadh
Zankhiya	Una	Junagadh
Devalki	Kunkavav Vadia	Amreli
Bantwa-Devli	Kunkavav Vadia	Amreli
Barvala Baval	Kunkavav Vadia	Amreli
Bhukhli-Santhali	Kunkavav Vadia	Amreli
Khajuri	Kunkavav Vadia	Amreli
Megha-pipaliya	Kunkavav Vadia	Amreli
Targhari	Kunkavav Vadia	Amreli
Sanali	Kunkavav Vadia	Amreli
Vavdi Road	Kunkavav Vadia	Amreli
Badanpur Nava	Kunkavav Vadia	Amreli
Badanpur Juna	Kunkavav Vadia	Amreli
Bambhaniya	Kunkavav Vadia	Amreli
Devgam	Kunkavav Vadia	Amreli
Dadva(Randal)	Kunkavav Vadia	Amreli
Sarangpur	Kunkavav Vadia	Amreli
Jithudi	Kunkavav Vadia	Amreli
Maya padar	Kunkavav Vadia	Amreli
Lakhapadar	Kunkavav Vadia	Amreli
Sanala	Kunkavav Vadia	Amreli
Bhayavadar	Kunkavav Vadia	Amreli
Ujala-Mota	Kunkavav Vadia	Amreli
Talali	Kunkavav Vadia	Amreli
Khajuri-Pipaliya	Kunkavav Vadia	Amreli
Khadkhad	Kunkavav Vadia	Amreli
Morvada	Kunkavav Vadia	Amreli
Vadia	Kunkavav Vadia	Amreli
Khijadiya Hanuman	Kunkavav Vadia	Amreli
Pipaliya Dhundhiya	Kunkavav Vadia	Amreli
Khijadiya Khan	Kunkavav Vadia	Amreli
Arjansukh	Kunkavav Vadia	Amreli
Khakhariya	Kunkavav Vadia	Amreli
Surya Pratapgadh	Kunkavav Vadia	Amreli
Anida	Kunkavav Vadia	Amreli
Ujala-Nava	Kunkavav Vadia	Amreli
Jungar	Kunkavav Vadia	Amreli
Ishvariya	Kunkavav Vadia	Amreli
Luni-Dhar	Kunkavav Vadia	Amreli
Kolda	Kunkavav Vadia	Amreli
Kunkavav Nani	Kunkavav Vadia	Amreli
Kunkavav Moti	Kunkavav Vadia	Amreli
Najapur	Kunkavav Vadia	Amreli
Tori	Kunkavav Vadia	Amreli
Rampur	Kunkavav Vadia	Amreli
Amrapur	Kunkavav Vadia	Amreli
Barvala Bavishi	Kunkavav Vadia	Amreli
Khanpar	Babra	Amreli
Kalorana	Babra	Amreli
Lalka	Babra	Amreli
Vankiya	Babra	Amreli
Vavda	Babra	Amreli
Kotda Pitha	Babra	Amreli
Garni	Babra	Amreli
Pansada	Babra	Amreli
Karnuki	Babra	Amreli
Navaniya	Babra	Amreli
Untvad	Babra	Amreli
Raypar	Babra	Amreli
Sukavala	Babra	Amreli
Sukhpar	Babra	Amreli
Khambhala	Babra	Amreli
Kundal Nani	Babra	Amreli
Sirvaniya	Babra	Amreli
Kidi	Babra	Amreli
Ishvariya	Babra	Amreli
Taivadar	Babra	Amreli
Nilavala	Babra	Amreli
Samadhiyala	Babra	Amreli
Charkha	Babra	Amreli
Ghughrala	Babra	Amreli
Miya Khijadiya	Babra	Amreli
Isapar	Babra	Amreli
Nadala	Babra	Amreli
Ranpar	Babra	Amreli
Thorkhan	Babra	Amreli
Nonghanvadar	Babra	Amreli
Lonkotda	Babra	Amreli
Tramboda	Babra	Amreli
Gamapipaliya	Babra	Amreli
Khakhariya	Babra	Amreli
Kariyana	Babra	Amreli
Dared	Babra	Amreli
Barvala	Babra	Amreli
Galkotdi	Babra	Amreli
Chamardi	Babra	Amreli
Vavdi	Babra	Amreli
Devaliya Mota	Babra	Amreli
Fuljhar	Babra	Amreli
Khijadiya Kotda	Babra	Amreli
Dharai	Babra	Amreli
Jivapar	Babra	Amreli
Valardi	Babra	Amreli
Kunvargadh	Babra	Amreli
Amarvalpar	Babra	Amreli
Hathigadh	Babra	Amreli
Lunki	Babra	Amreli
Vandaliya	Babra	Amreli
Ingorala	Babra	Amreli
Pir Khijadiya	Babra	Amreli
Balel Pipariya	Babra	Amreli
Bhildi	Babra	Amreli
Bhila	Babra	Amreli
Hirana	Lathi	Amreli
Derdi-Janbai	Lathi	Amreli
Chavand	Lathi	Amreli
Shekhpipariya	Lathi	Amreli
Punjapar	Lathi	Amreli
Harsurpur	Lathi	Amreli
Keriya	Lathi	Amreli
Virpur	Lathi	Amreli
Karkoliya	Lathi	Amreli
Rajkot Nana	Lathi	Amreli
Pipalva	Lathi	Amreli
Ambardi	Lathi	Amreli
Kanchardi	Lathi	Amreli
Narangadh	Lathi	Amreli
Memda	Lathi	Amreli
Bhurakhiya	Lathi	Amreli
Rampar	Lathi	Amreli
Adtala	Lathi	Amreli
Jarakhiya	Lathi	Amreli
Toda	Lathi	Amreli
Dudhala Lathi	Lathi	Amreli
Pratapgadh	Lathi	Amreli
Tajpar	Lathi	Amreli
Methli	Lathi	Amreli
Dahinthara	Lathi	Amreli
Dhrufania	Lathi	Amreli
Suvagadh	Lathi	Amreli
Muliyapat	Lathi	Amreli
Thansa	Lathi	Amreli
Chhabhadiya	Lathi	Amreli
Bhingrad	Lathi	Amreli
Akala	Lathi	Amreli
Kerala	Lathi	Amreli
Malaviya Pipariya	Lathi	Amreli
Aliudepur	Lathi	Amreli
Matirala	Lathi	Amreli
Krishna gadh	Lathi	Amreli
Luvariya	Lathi	Amreli
Ansodar	Lathi	Amreli
Ingorala	Lathi	Amreli
Havtad	Lathi	Amreli
Padarshinga	Lathi	Amreli
Hajiradhar	Lathi	Amreli
Rabhda	Lathi	Amreli
Bhatvadar	Lathi	Amreli
Bhalvav	Lathi	Amreli
Dhamel	Lathi	Amreli
Dudhala Bai	Lathi	Amreli
Shakhpur	Lathi	Amreli
Saldi	Lilia	Amreli
Jatroda	Lilia	Amreli
Antaliya	Lilia	Amreli
Sanjantimba	Lilia	Amreli
Haripur	Lilia	Amreli
Eklera	Lilia	Amreli
Kankot Nana	Lilia	Amreli
Panch Talavda	Lilia	Amreli
Gundran	Lilia	Amreli
Dhangla	Lilia	Amreli
Hathigadh	Lilia	Amreli
Putaliya	Lilia	Amreli
Kankot Mota	Lilia	Amreli
Godhavadar	Lilia	Amreli
Punjapadar	Lilia	Amreli
Pipalva	Lilia	Amreli
Bhensan	Lilia	Amreli
Bodiya	Lilia	Amreli
Khara	Lilia	Amreli
Kalyanpar	Lilia	Amreli
Rajkot Nana	Lilia	Amreli
Kuntana	Lilia	Amreli
Sanaliya	Lilia	Amreli
Timbdi	Lilia	Amreli
Vaghaniya	Lilia	Amreli
Lilia Nana	Lilia	Amreli
Amba	Lilia	Amreli
Bhensvadi	Lilia	Amreli
Lonka	Lilia	Amreli
Lonki	Lilia	Amreli
Shedhavadar	Lilia	Amreli
Bhoringda	Lilia	Amreli
Krankach	Lilia	Amreli
Bavadi	Lilia	Amreli
Bavada	Lilia	Amreli
Ingorala	Lilia	Amreli
Monpur	Amreli	Amreli
Khijadiya Radadiya	Amreli	Amreli
Chital	Amreli	Amreli
Jasvantgadh	Amreli	Amreli
Randhiya	Amreli	Amreli
Rikadiya	Amreli	Amreli
Timba	Amreli	Amreli
Shedubhar	Amreli	Amreli
Suragpur	Amreli	Amreli
Haripura	Amreli	Amreli
Machiyala Mota	Amreli	Amreli
Ankadiya Nana	Amreli	Amreli
Dahida	Amreli	Amreli
Kathma	Amreli	Amreli
Pipllag	Amreli	Amreli
Venivadar	Amreli	Amreli
Sangaderi	Amreli	Amreli
Machiyala Nana	Amreli	Amreli
Varasda	Amreli	Amreli
Ishvariya	Amreli	Amreli
Giriya	Amreli	Amreli
Baxipur	Amreli	Amreli
Amarpur(Varudi)	Amreli	Amreli
Mangvapal	Amreli	Amreli
Bhandariya Nana	Amreli	Amreli
Ankadiya Mota	Amreli	Amreli
Malvan	Amreli	Amreli
Dholarva	Amreli	Amreli
Vadera	Amreli	Amreli
Rangpur	Amreli	Amreli
Keriyanagas	Amreli	Amreli
Lalavadar	Amreli	Amreli
Pratappara	Amreli	Amreli
Navakhijadiya	Amreli	Amreli
Thordi	Amreli	Amreli
Sanosara	Amreli	Amreli
Jaliya	Amreli	Amreli
Kamigadh	Amreli	Amreli
Khijadiya Khari	Amreli	Amreli
Kerala	Amreli	Amreli
Bhandariya Mota	Amreli	Amreli
Gavadka	Amreli	Amreli
Vithalpur	Amreli	Amreli
Champathal	Amreli	Amreli
Fattepur	Amreli	Amreli
Chakkargadh	Amreli	Amreli
Devaliya	Amreli	Amreli
Pithavajal	Amreli	Amreli
Vankiya	Amreli	Amreli
Babapur	Amreli	Amreli
Paniya	Amreli	Amreli
Mandavda Mota	Amreli	Amreli
Timbla	Amreli	Amreli
Taravda	Amreli	Amreli
Devrajiya	Amreli	Amreli
Taraktalav	Amreli	Amreli
Rajasthali	Amreli	Amreli
Gokharvala Mota	Amreli	Amreli
Gokharvala Nana	Amreli	Amreli
Chandgadh	Amreli	Amreli
Lapaliya	Amreli	Amreli
Sonariya	Amreli	Amreli
Shambhupura	Amreli	Amreli
Keriyachad	Amreli	Amreli
Sajiyavadar	Amreli	Amreli
Medi	Amreli	Amreli
Mandavda Nana	Amreli	Amreli
Sarambhda	Amreli	Amreli
Chadiya	Amreli	Amreli
Malila	Amreli	Amreli
Khad Khambhaliya	Amreli	Amreli
Balapur	Bagasara	Amreli
Pithadiya	Bagasara	Amreli
Vaghaniya Nava	Bagasara	Amreli
Vaghaniya Juna	Bagasara	Amreli
Khari	Bagasara	Amreli
Hadala	Bagasara	Amreli
Mavjinjva	Bagasara	Amreli
Ghantiyan	Bagasara	Amreli
Haliyad Navi	Bagasara	Amreli
Haliyad Juni	Bagasara	Amreli
Deri Pipaliya	Bagasara	Amreli
Pipaliya Nava	Bagasara	Amreli
Charan pipali	Bagasara	Amreli
Jethiavadar	Bagasara	Amreli
Adpur	Bagasara	Amreli
Munjiasar Mota	Bagasara	Amreli
Munjiasar Nana	Bagasara	Amreli
Manekvada	Bagasara	Amreli
Rafala	Bagasara	Amreli
Jamka	Bagasara	Amreli
Sanaliya	Bagasara	Amreli
Shilana	Bagasara	Amreli
Janjariya Nava	Bagasara	Amreli
Janjariya Juna	Bagasara	Amreli
Kadaya	Bagasara	Amreli
Kagdadi	Bagasara	Amreli
Samadhiyala	Bagasara	Amreli
Hamapur	Bagasara	Amreli
Khijadiya	Bagasara	Amreli
Hulariya	Bagasara	Amreli
Halariya	Bagasara	Amreli
Padargadh	Dhari	Amreli
Gopalgram	Dhari	Amreli
Dholarva	Dhari	Amreli
Garamli (Charkha)	Dhari	Amreli
Kathirvadar	Dhari	Amreli
Juna Charkha	Dhari	Amreli
Nava Charkha	Dhari	Amreli
Kami	Dhari	Amreli
Kerala	Dhari	Amreli
Paniya(Devasthan)	Dhari	Amreli
Mithapur(Dungri)	Dhari	Amreli
Parbadi	Dhari	Amreli
Dahida	Dhari	Amreli
Morzar	Dhari	Amreli
Manavav	Dhari	Amreli
Ambardi	Dhari	Amreli
Bharad	Dhari	Amreli
Bhayavadar	Dhari	Amreli
Dangavadar	Dhari	Amreli
Kotha Pipariya	Dhari	Amreli
Bhader	Dhari	Amreli
Monvel	Dhari	Amreli
Kathrota	Dhari	Amreli
Malshika	Dhari	Amreli
Dhari	Dhari	Amreli
Khicha	Dhari	Amreli
Chhatradiya	Dhari	Amreli
Zar	Dhari	Amreli
Hudli	Dhari	Amreli
Garamali Moti	Dhari	Amreli
Ingorala(Dungri)	Dhari	Amreli
Samadhiyala Nana	Dhari	Amreli
Ditla	Dhari	Amreli
Khambhaliya	Dhari	Amreli
Dhargani	Dhari	Amreli
Vavdi	Dhari	Amreli
Garamali Nani	Dhari	Amreli
Kaner	Dhari	Amreli
Vaghvadi	Dhari	Amreli
Rampur	Dhari	Amreli
Fategadh	Dhari	Amreli
Shivad	Dhari	Amreli
Bordi	Dhari	Amreli
Gigasan	Dhari	Amreli
Kubda	Dhari	Amreli
Amaratpur	Dhari	Amreli
Devla	Dhari	Amreli
Nagadhra	Dhari	Amreli
Lakhapadar	Dhari	Amreli
Virpur	Dhari	Amreli
Madhupur	Dhari	Amreli
Dabhali	Dhari	Amreli
Jira	Dhari	Amreli
Sarasiya	Dhari	Amreli
Facharia	Dhari	Amreli
Govindpur	Dhari	Amreli
Dalkhaniya	Dhari	Amreli
Mithapur Nakki	Dhari	Amreli
Chanchai	Dhari	Amreli
Paniya Dungri	Dhari	Amreli
Kotda	Dhari	Amreli
Shemardi	Dhari	Amreli
Krangsa	Dhari	Amreli
Sakhpur	Dhari	Amreli
Ravna	Dhari	Amreli
Matan Mala	Dhari	Amreli
Karamdadi	Dhari	Amreli
Trambakpur	Dhari	Amreli
Gadhiya	Dhari	Amreli
Hirava	Dhari	Amreli
Khisri	Dhari	Amreli
Jaljivadi	Dhari	Amreli
Dudhala	Dhari	Amreli
Gadhiya Chavand	Dhari	Amreli
Tarsingada	Dhari	Amreli
Rajsthali	Dhari	Amreli
Patla	Dhari	Amreli
Simaran	Savar Kundla	Amreli
Jira	Savar Kundla	Amreli
Borala	Savar Kundla	Amreli
Khadkala	Savar Kundla	Amreli
Juna Savar	Savar Kundla	Amreli
Kerala	Savar Kundla	Amreli
Kunkavav	Savar Kundla	Amreli
Khalpar	Savar Kundla	Amreli
Ankolada	Savar Kundla	Amreli
Mekda	Savar Kundla	Amreli
Fifad	Savar Kundla	Amreli
Ghoba	Savar Kundla	Amreli
Piparadi	Savar Kundla	Amreli
Hipavadli	Savar Kundla	Amreli
Mota Bhamodra	Savar Kundla	Amreli
Ghobapati	Savar Kundla	Amreli
Shelana	Savar Kundla	Amreli
Vanda	Savar Kundla	Amreli
Fachariya	Savar Kundla	Amreli
Piyava	Savar Kundla	Amreli
Dhar	Savar Kundla	Amreli
Moldi	Savar Kundla	Amreli
Amrutvel	Savar Kundla	Amreli
Bhuva	Savar Kundla	Amreli
Nana Bhamodra	Savar Kundla	Amreli
Charkhadiya	Savar Kundla	Amreli
Oliya	Savar Kundla	Amreli
Karjala	Savar Kundla	Amreli
Nesdi	Savar Kundla	Amreli
Kanatalav	Savar Kundla	Amreli
Mota Zinzuda	Savar Kundla	Amreli
Nana Zinzuda	Savar Kundla	Amreli
Pithvadi	Savar Kundla	Amreli
Senjal	Savar Kundla	Amreli
Mevasa	Savar Kundla	Amreli
Vanshiyali	Savar Kundla	Amreli
Jejad	Savar Kundla	Amreli
Thavi	Savar Kundla	Amreli
Virdi	Savar Kundla	Amreli
Kedariya	Savar Kundla	Amreli
Kantrodi	Savar Kundla	Amreli
Zadkala	Savar Kundla	Amreli
Nal	Savar Kundla	Amreli
Rabarika	Savar Kundla	Amreli
Bhonkarva	Savar Kundla	Amreli
Nani Vadal	Savar Kundla	Amreli
Bhenkra	Savar Kundla	Amreli
Vijayanagar	Savar Kundla	Amreli
Hathasani	Savar Kundla	Amreli
Dhajdi	Savar Kundla	Amreli
Badhada	Savar Kundla	Amreli
Gadhakda	Savar Kundla	Amreli
Likhala	Savar Kundla	Amreli
Dedkadi	Savar Kundla	Amreli
Madhada	Savar Kundla	Amreli
Jambuda	Savar Kundla	Amreli
Vijapdi	Savar Kundla	Amreli
Chhapri	Savar Kundla	Amreli
Khadsali	Savar Kundla	Amreli
Meriyana	Savar Kundla	Amreli
Goradka	Savar Kundla	Amreli
Luvara	Savar Kundla	Amreli
Ramgadh	Savar Kundla	Amreli
Jabal	Savar Kundla	Amreli
Abhrampara	Savar Kundla	Amreli
Mitiyala	Savar Kundla	Amreli
Bagoya	Savar Kundla	Amreli
Ambardi	Savar Kundla	Amreli
Dolti	Savar Kundla	Amreli
Bhamar	Savar Kundla	Amreli
Chikhali	Savar Kundla	Amreli
Hadida	Savar Kundla	Amreli
Dadhiya	Savar Kundla	Amreli
Vanot	Savar Kundla	Amreli
Ghandla	Savar Kundla	Amreli
Detad	Savar Kundla	Amreli
Giniya	Savar Kundla	Amreli
Khodiyana	Savar Kundla	Amreli
Absang	Savar Kundla	Amreli
Thordi	Savar Kundla	Amreli
Samadhiyala Mota	Khambha	Amreli
Rugnathpur	Khambha	Amreli
Jikiyali	Khambha	Amreli
Vankiya	Khambha	Amreli
Kotda	Khambha	Amreli
Anida	Khambha	Amreli
Ingorala	Khambha	Amreli
Bhad	Khambha	Amreli
Visavadar Nana	Khambha	Amreli
Dhari Nani	Khambha	Amreli
Lasa	Khambha	Amreli
Tantaniya	Khambha	Amreli
Umariya	Khambha	Amreli
Nanudi	Khambha	Amreli
Dadhiyali	Khambha	Amreli
Khambha	Khambha	Amreli
Pipalava	Khambha	Amreli
Gidardi	Khambha	Amreli
Dhavadiya	Khambha	Amreli
Bhaniya	Khambha	Amreli
Khadadhar	Khambha	Amreli
Bhavardi	Khambha	Amreli
Sarakadiya Divan	Khambha	Amreli
Sarakadiya	Khambha	Amreli
Kodiya	Khambha	Amreli
Pati	Khambha	Amreli
Raydi	Khambha	Amreli
Dedan	Khambha	Amreli
Raningpara	Khambha	Amreli
Nava Malaknes	Khambha	Amreli
Borala	Khambha	Amreli
Babarpur	Khambha	Amreli
Kantala	Khambha	Amreli
Chakrava	Khambha	Amreli
Hanumanpur	Khambha	Amreli
Juna Malaknes	Khambha	Amreli
Nesdi No-2	Khambha	Amreli
Samadhiyala No-2	Khambha	Amreli
Jivapar	Khambha	Amreli
Munjiyasar	Khambha	Amreli
Trakuda	Khambha	Amreli
Vangadhara	Khambha	Amreli
Talda	Khambha	Amreli
Dadli	Khambha	Amreli
Dhundhavana	Khambha	Amreli
Pachapachiya	Khambha	Amreli
Salva	Khambha	Amreli
Pipariya	Khambha	Amreli
Rabarika	Khambha	Amreli
Ambaliyala	Khambha	Amreli
Jamka	Khambha	Amreli
Ningala No-2	Khambha	Amreli
Bhundani	Khambha	Amreli
Gorana	Khambha	Amreli
Katarpara	Khambha	Amreli
Barman Mota	Khambha	Amreli
Barman Nana	Khambha	Amreli
Fachariya	Jafrabad	Amreli
Sarovarda	Jafrabad	Amreli
Shiyalbet	Jafrabad	Amreli
Lothpur	Jafrabad	Amreli
Kagvadar	Jafrabad	Amreli
Bhatvadar	Jafrabad	Amreli
Kanthariya Koli	Jafrabad	Amreli
Balanivav	Jafrabad	Amreli
Kanthariya Khalsa	Jafrabad	Amreli
Pichhadi	Jafrabad	Amreli
Ebhalvad	Jafrabad	Amreli
Lor	Jafrabad	Amreli
Pati Mansa (Nana)	Jafrabad	Amreli
Mota Mansa	Jafrabad	Amreli
Timbi	Jafrabad	Amreli
Chhelana	Jafrabad	Amreli
Hemal	Jafrabad	Amreli
Jikadri Juni	Jafrabad	Amreli
Jikadri Navi	Jafrabad	Amreli
Mithapur	Jafrabad	Amreli
Lunsapur	Jafrabad	Amreli
Vandh	Jafrabad	Amreli
Nageshri	Jafrabad	Amreli
Dudhala	Jafrabad	Amreli
Dholadri	Jafrabad	Amreli
Sokhda	Jafrabad	Amreli
Ghenspur	Jafrabad	Amreli
Sakariya Mota	Jafrabad	Amreli
Sakariya Nana	Jafrabad	Amreli
Bhada	Jafrabad	Amreli
Vadli	Jafrabad	Amreli
Kerala	Jafrabad	Amreli
Dharabandar	Jafrabad	Amreli
Rohisa	Jafrabad	Amreli
Chitrasar	Jafrabad	Amreli
Balana	Jafrabad	Amreli
Kadiyali	Jafrabad	Amreli
Vadhera	Jafrabad	Amreli
Mitiyala	Jafrabad	Amreli
Babarkot	Jafrabad	Amreli
Varahsvarup	Jafrabad	Amreli
Bhankodar	Jafrabad	Amreli
Bhakshi	Rajula	Amreli
Vavera	Rajula	Amreli
Kherali Nani	Rajula	Amreli
Khari	Rajula	Amreli
Kherali Moti	Rajula	Amreli
Babariyadhar	Rajula	Amreli
Navagam(Mariana)	Rajula	Amreli
Amuli	Rajula	Amreli
Masundada Nana- Mota	Rajula	Amreli
Balapar	Rajula	Amreli
Chhapri	Rajula	Amreli
Barbatana	Rajula	Amreli
Charodiya	Rajula	Amreli
Dipadiya	Rajula	Amreli
Dhareshvar	Rajula	Amreli
Agariya Mota	Rajula	Amreli
Vavdi	Rajula	Amreli
Agariya Nava	Rajula	Amreli
Agariya Dhudiya	Rajula	Amreli
Mandardi Navi-Juni	Rajula	Amreli
Vadli	Rajula	Amreli
Kundaliyala	Rajula	Amreli
Ringaniyala Mota	Rajula	Amreli
Doliya	Rajula	Amreli
Mandal	Rajula	Amreli
Morangi	Rajula	Amreli
Mobhiyana Mota	Rajula	Amreli
Mobhiyana Nana	Rajula	Amreli
Rampara No-1	Rajula	Amreli
Zinzka	Rajula	Amreli
Dungarparda	Rajula	Amreli
Dungar	Rajula	Amreli
Rajparda	Rajula	Amreli
Ganjavadar	Rajula	Amreli
Untiya	Rajula	Amreli
Zanzarda	Rajula	Amreli
Ringaniyala Nana	Rajula	Amreli
Zampodar	Rajula	Amreli
Kotdi	Rajula	Amreli
Katar	Rajula	Amreli
Barpatoli	Rajula	Amreli
Khakhbai	Rajula	Amreli
Khambhaliya	Rajula	Amreli
Hadmatiya	Rajula	Amreli
Kumbhariya	Rajula	Amreli
Sajanavav	Rajula	Amreli
Rabhda	Rajula	Amreli
Nesdi No -1	Rajula	Amreli
Majadar	Rajula	Amreli
Jholapar	Rajula	Amreli
Devka	Rajula	Amreli
Kadiyali	Rajula	Amreli
Chhatadiya	Rajula	Amreli
Hindorna	Rajula	Amreli
Vad	Rajula	Amreli
Bhachadar	Rajula	Amreli
Ningala No-1	Rajula	Amreli
Pipavav	Rajula	Amreli
Visaliya	Rajula	Amreli
Dantardi	Rajula	Amreli
Samadhiyala No-1	Rajula	Amreli
Patva	Rajula	Amreli
khera	Rajula	Amreli
Chanch	Rajula	Amreli
Kathivadar	Rajula	Amreli
Victar	Rajula	Amreli
Bherai	Rajula	Amreli
Dharano Nes	Rajula	Amreli
Chotra	Rajula	Amreli
Uchaiya	Rajula	Amreli
Rampara No-2	Rajula	Amreli
Kovaya	Rajula	Amreli
Nani Virva	Botad	Bhavnagar
Moti Virva	Botad	Bhavnagar
Gadhadiya	Botad	Bhavnagar
Mota Chhaida	Botad	Bhavnagar
Nana Chhaida	Botad	Bhavnagar
Bhadla	Botad	Bhavnagar
Limboda	Botad	Bhavnagar
Bodi	Botad	Bhavnagar
Piparadi	Botad	Bhavnagar
Pipaliya	Botad	Bhavnagar
Ratanpar	Botad	Bhavnagar
Nana Paliyad	Botad	Bhavnagar
Sankardi	Botad	Bhavnagar
Kaniyad	Botad	Bhavnagar
Babarkot	Botad	Bhavnagar
Paliyad	Botad	Bhavnagar
Kumbhara	Botad	Bhavnagar
Sarva	Botad	Bhavnagar
Bhadravadi	Botad	Bhavnagar
Targhara	Botad	Bhavnagar
Hadadad	Botad	Bhavnagar
Sherthali	Botad	Bhavnagar
Dhinkwali	Botad	Bhavnagar
Samadhiyala No.1	Botad	Bhavnagar
Nagalpar	Botad	Bhavnagar
Dhankaniya	Botad	Bhavnagar
Shirvaniya	Botad	Bhavnagar
Zariya	Botad	Bhavnagar
Turkha	Botad	Bhavnagar
Rangpar	Botad	Bhavnagar
Khakhoi	Botad	Bhavnagar
Salaiya	Botad	Bhavnagar
Rajpara	Botad	Bhavnagar
Jotingada	Botad	Bhavnagar
Bhambhan	Botad	Bhavnagar
Tajpar	Botad	Bhavnagar
Lathidad	Botad	Bhavnagar
Sajeli	Botad	Bhavnagar
Vajeli	Botad	Bhavnagar
Samadhiyala No.2	Botad	Bhavnagar
Keriya No.2	Botad	Bhavnagar
Zamrala	Botad	Bhavnagar
Kariyani	Botad	Bhavnagar
Sarvai	Botad	Bhavnagar
Pati	Botad	Bhavnagar
Zinzavadar	Botad	Bhavnagar
Sangavadar	Botad	Bhavnagar
Ratanvav	Botad	Bhavnagar
Lakheni	Botad	Bhavnagar
Keriya No.1	Botad	Bhavnagar
Chakampar	Botad	Bhavnagar
Rohishala	Botad	Bhavnagar
Datretiya	Vallabhipur	Bhavnagar
Malpara	Vallabhipur	Bhavnagar
Lundhara	Vallabhipur	Bhavnagar
Panvi	Vallabhipur	Bhavnagar
Patana	Vallabhipur	Bhavnagar
Ujalvav	Vallabhipur	Bhavnagar
Moti Dharai	Vallabhipur	Bhavnagar
Bhoraniya	Vallabhipur	Bhavnagar
Mul Dharai	Vallabhipur	Bhavnagar
Rangpur	Vallabhipur	Bhavnagar
Jalalpar	Vallabhipur	Bhavnagar
Totaniyala	Vallabhipur	Bhavnagar
Nasitpur	Vallabhipur	Bhavnagar
Juna Ratanpur	Vallabhipur	Bhavnagar
Chada	Vallabhipur	Bhavnagar
Dared	Vallabhipur	Bhavnagar
Melana	Vallabhipur	Bhavnagar
Rajpara (Bhayati)	Vallabhipur	Bhavnagar
Jaliya	Vallabhipur	Bhavnagar
Navaniya	Vallabhipur	Bhavnagar
Pipal	Vallabhipur	Bhavnagar
Kanpar	Vallabhipur	Bhavnagar
Pipariya	Vallabhipur	Bhavnagar
Bhojpara	Vallabhipur	Bhavnagar
Italiya	Vallabhipur	Bhavnagar
Ratanpur (Ga)	Vallabhipur	Bhavnagar
Mevasa	Vallabhipur	Bhavnagar
Shahpur	Vallabhipur	Bhavnagar
Monpur	Vallabhipur	Bhavnagar
Navagam No.1	Vallabhipur	Bhavnagar
Limbda	Vallabhipur	Bhavnagar
Kanthariya	Vallabhipur	Bhavnagar
Hadmatiya	Vallabhipur	Bhavnagar
Loliyana	Vallabhipur	Bhavnagar
Dudadhar	Vallabhipur	Bhavnagar
Kala Talav	Vallabhipur	Bhavnagar
Navagam No.2	Vallabhipur	Bhavnagar
Kheta Timbi	Vallabhipur	Bhavnagar
Velavadar	Vallabhipur	Bhavnagar
Lakhanka	Vallabhipur	Bhavnagar
Kalyanpur	Vallabhipur	Bhavnagar
Virdi	Vallabhipur	Bhavnagar
Meghavadar	Vallabhipur	Bhavnagar
Anandpur	Vallabhipur	Bhavnagar
Palanpar	Vallabhipur	Bhavnagar
Pachchhegam	Vallabhipur	Bhavnagar
Haliyad	Vallabhipur	Bhavnagar
Vavdi	Vallabhipur	Bhavnagar
Juni Rajasthali	Vallabhipur	Bhavnagar
Nava Rampar	Vallabhipur	Bhavnagar
Pipali	Vallabhipur	Bhavnagar
Gheldi	Vallabhipur	Bhavnagar
Rajpipla	Vallabhipur	Bhavnagar
Rajpara (Bhal)	Vallabhipur	Bhavnagar
Pati	Vallabhipur	Bhavnagar
Juna Rampar	Vallabhipur	Bhavnagar
Chamardi	Vallabhipur	Bhavnagar
Dhrufaniya	Gadhada	Bhavnagar
Hamapar	Gadhada	Bhavnagar
Ingorala (Khalsa)	Gadhada	Bhavnagar
Janada	Gadhada	Bhavnagar
Pipaliya	Gadhada	Bhavnagar
Tatam	Gadhada	Bhavnagar
Bhimdad	Gadhada	Bhavnagar
Derala	Gadhada	Bhavnagar
Ratanvav	Gadhada	Bhavnagar
Ratanpar	Gadhada	Bhavnagar
Sakhpar Mota	Gadhada	Bhavnagar
Gala	Gadhada	Bhavnagar
Salangpar Nanu	Gadhada	Bhavnagar
Meghvadiya	Gadhada	Bhavnagar
Sakhpar Nana	Gadhada	Bhavnagar
Surka	Gadhada	Bhavnagar
Ningala	Gadhada	Bhavnagar
Shiyanagar	Gadhada	Bhavnagar
Zinzavadar	Gadhada	Bhavnagar
Ugamedi	Gadhada	Bhavnagar
Goradka	Gadhada	Bhavnagar
Holaya	Gadhada	Bhavnagar
Raypar	Gadhada	Bhavnagar
Viravadi	Gadhada	Bhavnagar
Rojmal	Gadhada	Bhavnagar
Limbali	Gadhada	Bhavnagar
Kerala	Gadhada	Bhavnagar
Haripar	Gadhada	Bhavnagar
Adtala	Gadhada	Bhavnagar
Pipal	Gadhada	Bhavnagar
Tatana	Gadhada	Bhavnagar
Ishvariya	Gadhada	Bhavnagar
Lakhanka	Gadhada	Bhavnagar
Mandavdhar	Gadhada	Bhavnagar
Rampara	Gadhada	Bhavnagar
Itariya	Gadhada	Bhavnagar
Vavdi	Gadhada	Bhavnagar
Moti Kundal	Gadhada	Bhavnagar
Samadhiyala	Gadhada	Bhavnagar
Raliyana	Gadhada	Bhavnagar
Bodki	Gadhada	Bhavnagar
Vanali	Gadhada	Bhavnagar
Khopala	Gadhada	Bhavnagar
Virdi	Gadhada	Bhavnagar
Chiroda	Gadhada	Bhavnagar
Padvadar	Gadhada	Bhavnagar
Ingorala (Girasadar)	Gadhada	Bhavnagar
Limbadiya	Gadhada	Bhavnagar
Sitapar	Gadhada	Bhavnagar
Pipardi	Gadhada	Bhavnagar
Ghogha Samdi	Gadhada	Bhavnagar
Gundala	Gadhada	Bhavnagar
Sanjanavadar	Gadhada	Bhavnagar
Gadhali	Gadhada	Bhavnagar
Kaparadi	Gadhada	Bhavnagar
Chabhadiya	Gadhada	Bhavnagar
Rajpipala	Gadhada	Bhavnagar
Limbala	Gadhada	Bhavnagar
Chosla	Gadhada	Bhavnagar
Ankadiya	Gadhada	Bhavnagar
Malpara	Gadhada	Bhavnagar
Padapan	Gadhada	Bhavnagar
Junavadar	Gadhada	Bhavnagar
Rasnal	Gadhada	Bhavnagar
Patana	Gadhada	Bhavnagar
Khijadiya	Gadhada	Bhavnagar
Anida	Gadhada	Bhavnagar
Mandva	Gadhada	Bhavnagar
Bhandariya	Gadhada	Bhavnagar
Jalalpur	Gadhada	Bhavnagar
Nana Umarda	Gadhada	Bhavnagar
Mota Umarda	Gadhada	Bhavnagar
Vikaliya	Gadhada	Bhavnagar
Alampar	Umrala	Bhavnagar
Vadod	Umrala	Bhavnagar
Ramanka	Umrala	Bhavnagar
Chitravav	Umrala	Bhavnagar
Bochadva	Umrala	Bhavnagar
Ujalvav	Umrala	Bhavnagar
Dadva (Randalna)	Umrala	Bhavnagar
Dhola Godadji	Umrala	Bhavnagar
Tarpala	Umrala	Bhavnagar
Hadmatala	Umrala	Bhavnagar
Bhojavadar	Umrala	Bhavnagar
Samadhiyala	Umrala	Bhavnagar
Khijadiya	Umrala	Bhavnagar
Ingorala	Umrala	Bhavnagar
Vangadhra	Umrala	Bhavnagar
Dhamnaka	Umrala	Bhavnagar
Chogath (Thapnath)	Umrala	Bhavnagar
Dambhaliya	Umrala	Bhavnagar
Timba	Umrala	Bhavnagar
Dharuka	Umrala	Bhavnagar
Ratanpar	Umrala	Bhavnagar
Keriya	Umrala	Bhavnagar
Piparali	Umrala	Bhavnagar
Timbi	Umrala	Bhavnagar
Dedkadi	Umrala	Bhavnagar
Parwala	Umrala	Bhavnagar
Dharwala	Umrala	Bhavnagar
Limbda	Umrala	Bhavnagar
Jaliya	Umrala	Bhavnagar
Gangavada	Umrala	Bhavnagar
Hadmatiya	Umrala	Bhavnagar
Thonda	Umrala	Bhavnagar
Lakhawad	Umrala	Bhavnagar
Ranghola	Umrala	Bhavnagar
Devaliya	Umrala	Bhavnagar
Langala	Umrala	Bhavnagar
Zanzamer	Umrala	Bhavnagar
Malpara	Umrala	Bhavnagar
Reva	Umrala	Bhavnagar
Golrama	Umrala	Bhavnagar
Bajud	Umrala	Bhavnagar
Rajgadh	Bhavnagar	Bhavnagar
Velavadar	Bhavnagar	Bhavnagar
Mithapar	Bhavnagar	Bhavnagar
Kanatalav	Bhavnagar	Bhavnagar
Adhelai	Bhavnagar	Bhavnagar
Bhadbhid	Bhavnagar	Bhavnagar
Ganeshgadh	Bhavnagar	Bhavnagar
Kotda	Bhavnagar	Bhavnagar
Jashavantpar	Bhavnagar	Bhavnagar
Gundala	Bhavnagar	Bhavnagar
Sanes	Bhavnagar	Bhavnagar
Savaikot	Bhavnagar	Bhavnagar
Savainagar	Bhavnagar	Bhavnagar
Nava Madhiya	Bhavnagar	Bhavnagar
Khetakhatli	Bhavnagar	Bhavnagar
Narbad	Bhavnagar	Bhavnagar
Kalatalav	Bhavnagar	Bhavnagar
Juna Madhiya	Bhavnagar	Bhavnagar
Devaliya	Bhavnagar	Bhavnagar
Paliyad	Bhavnagar	Bhavnagar
Undevi	Bhavnagar	Bhavnagar
Kamlej	Bhavnagar	Bhavnagar
Ruva (Part)	Bhavnagar	Bhavnagar
Kardej	Bhavnagar	Bhavnagar
Bhojpura	Bhavnagar	Bhavnagar
Shampara	Bhavnagar	Bhavnagar
Sodvadra	Bhavnagar	Bhavnagar
Shedhavadar	Bhavnagar	Bhavnagar
Fariyadka	Bhavnagar	Bhavnagar
Shampura(Sidsar)	Bhavnagar	Bhavnagar
Adhewada	Bhavnagar	Bhavnagar
Tarsimiya (Part)	Bhavnagar	Bhavnagar
Akwada	Bhavnagar	Bhavnagar
Budhel	Bhavnagar	Bhavnagar
Bhuteshwar	Bhavnagar	Bhavnagar
Bhumbhali	Bhavnagar	Bhavnagar
Thordi	Bhavnagar	Bhavnagar
Kobdi	Bhavnagar	Bhavnagar
Pithalpar	Bhavnagar	Bhavnagar
Rampar	Bhavnagar	Bhavnagar
Surka	Bhavnagar	Bhavnagar
Juna Ratanpar	Bhavnagar	Bhavnagar
Nava Ratanpar	Bhavnagar	Bhavnagar
Gundi	Bhavnagar	Bhavnagar
Vavdi	Bhavnagar	Bhavnagar
Sartanpar	Bhavnagar	Bhavnagar
Bhadi	Bhavnagar	Bhavnagar
Bhandariya	Bhavnagar	Bhavnagar
Nagdhaniba	Bhavnagar	Bhavnagar
Alapar	Bhavnagar	Bhavnagar
Bhadbhediya	Bhavnagar	Bhavnagar
Koliyak	Bhavnagar	Bhavnagar
Hathab	Bhavnagar	Bhavnagar
Khadsaliya	Bhavnagar	Bhavnagar
Thalsar	Bhavnagar	Bhavnagar
Lakhanka	Bhavnagar	Bhavnagar
Bhandar	Ghogha	Bhavnagar
Bhinkada	Ghogha	Bhavnagar
Kankot	Ghogha	Bhavnagar
Lakhanka	Ghogha	Bhavnagar
Avaniya	Ghogha	Bhavnagar
Tagdi	Ghogha	Bhavnagar
Malpar	Ghogha	Bhavnagar
Mamsa	Ghogha	Bhavnagar
Nesvad	Ghogha	Bhavnagar
Valukad	Ghogha	Bhavnagar
Juna Padar	Ghogha	Bhavnagar
Khantadi	Ghogha	Bhavnagar
Samadhiyala	Ghogha	Bhavnagar
Kharakadi	Ghogha	Bhavnagar
Nana Khokhara	Ghogha	Bhavnagar
Trambak	Ghogha	Bhavnagar
Ukharala	Ghogha	Bhavnagar
Rajpara	Ghogha	Bhavnagar
Badi	Ghogha	Bhavnagar
Hoidad	Ghogha	Bhavnagar
Kuda	Ghogha	Bhavnagar
Piram	Ghogha	Bhavnagar
Malekvadar	Ghogha	Bhavnagar
Padva	Ghogha	Bhavnagar
Kareda	Ghogha	Bhavnagar
Mota Khokhara	Ghogha	Bhavnagar
Piparala	Ghogha	Bhavnagar
Paniyala	Ghogha	Bhavnagar
Banbhaniya	Ghogha	Bhavnagar
Sanodar	Ghogha	Bhavnagar
Morchand	Ghogha	Bhavnagar
Nathugadh	Ghogha	Bhavnagar
Sarvadar	Ghogha	Bhavnagar
Vavdi	Ghogha	Bhavnagar
Bhavanipara	Ghogha	Bhavnagar
Chhaya	Ghogha	Bhavnagar
Pithalpur	Ghogha	Bhavnagar
Odarka	Ghogha	Bhavnagar
Tanasa	Ghogha	Bhavnagar
Lakadiya	Ghogha	Bhavnagar
Chaniyala	Ghogha	Bhavnagar
Navagam(Nana)	Ghogha	Bhavnagar
Kukad	Ghogha	Bhavnagar
Kantala	Ghogha	Bhavnagar
Goriyali	Ghogha	Bhavnagar
Garibpura	Ghogha	Bhavnagar
Bhankhal	Ghogha	Bhavnagar
Bhutiya	Sihor	Bhavnagar
Gadhula	Sihor	Bhavnagar
Panch Talavada	Sihor	Bhavnagar
Vavdi (Gajabhai)	Sihor	Bhavnagar
Sendurda	Sihor	Bhavnagar
Ukharla	Sihor	Bhavnagar
Paldi	Sihor	Bhavnagar
Navagam (Mota)	Sihor	Bhavnagar
Maglana	Sihor	Bhavnagar
Ghanghali	Sihor	Bhavnagar
Bhangadh	Sihor	Bhavnagar
Nesda	Sihor	Bhavnagar
Bholad	Sihor	Bhavnagar
Khakhariya	Sihor	Bhavnagar
Vadiya	Sihor	Bhavnagar
Usrad	Sihor	Bhavnagar
Pipaliya	Sihor	Bhavnagar
Nana Surka	Sihor	Bhavnagar
Kantodiya	Sihor	Bhavnagar
Vav	Sihor	Bhavnagar
Ishvariya	Sihor	Bhavnagar
Sanosara	Sihor	Bhavnagar
Krushnapara	Sihor	Bhavnagar
Piparadi	Sihor	Bhavnagar
Zariya	Sihor	Bhavnagar
Ramdhari	Sihor	Bhavnagar
Ambla	Sihor	Bhavnagar
Amargadh	Sihor	Bhavnagar
Mota Surka	Sihor	Bhavnagar
Kachotiya	Sihor	Bhavnagar
Rajpara (Khodiyar)	Sihor	Bhavnagar
Juna Jaliya	Sihor	Bhavnagar
Dhrupka	Sihor	Bhavnagar
Mahadevpara	Sihor	Bhavnagar
Valavad	Sihor	Bhavnagar
Karkoliya	Sihor	Bhavnagar
Panchvada	Sihor	Bhavnagar
Sandhida	Sihor	Bhavnagar
Sarkadiya (Songadh)	Sihor	Bhavnagar
Padapan	Sihor	Bhavnagar
Sarvedi	Sihor	Bhavnagar
Dhankan Kunda	Sihor	Bhavnagar
Chorvadala	Sihor	Bhavnagar
Piparala	Sihor	Bhavnagar
Nava Jaliya	Sihor	Bhavnagar
Meghvadar	Sihor	Bhavnagar
Sar	Sihor	Bhavnagar
Khambha	Sihor	Bhavnagar
Bhadli	Sihor	Bhavnagar
Rabarika	Sihor	Bhavnagar
Kajavadar	Sihor	Bhavnagar
Kanad	Sihor	Bhavnagar
Malvan	Sihor	Bhavnagar
Todi	Sihor	Bhavnagar
Toda	Sihor	Bhavnagar
Khari	Sihor	Bhavnagar
Sakhvadar	Sihor	Bhavnagar
Jambala	Sihor	Bhavnagar
Devgana	Sihor	Bhavnagar
Bordi	Sihor	Bhavnagar
Rajpara (Tana)	Sihor	Bhavnagar
Limbaddhar	Sihor	Bhavnagar
Madhada	Sihor	Bhavnagar
Budhana	Sihor	Bhavnagar
Lavarda	Sihor	Bhavnagar
Vavdi (Vachhani)	Sihor	Bhavnagar
Tana	Sihor	Bhavnagar
Ratanpar	Sihor	Bhavnagar
Agiyali	Sihor	Bhavnagar
Tarakpaldi	Sihor	Bhavnagar
Karmadiya	Sihor	Bhavnagar
Thala	Sihor	Bhavnagar
Bekdi	Sihor	Bhavnagar
Gundala	Sihor	Bhavnagar
Dhundhsar	Sihor	Bhavnagar
Sarkadia (Tana)	Sihor	Bhavnagar
Varal	Sihor	Bhavnagar
Bhankhal	Sihor	Bhavnagar
Thorali	Sihor	Bhavnagar
Bhamariya	Gariadhar	Bhavnagar
Mandvi	Gariadhar	Bhavnagar
Manpur	Gariadhar	Bhavnagar
Kharadi	Gariadhar	Bhavnagar
Panasada	Gariadhar	Bhavnagar
Jaliya	Gariadhar	Bhavnagar
Sitapur	Gariadhar	Bhavnagar
Moti Vavdi	Gariadhar	Bhavnagar
Survilas	Gariadhar	Bhavnagar
Nana Charodiya	Gariadhar	Bhavnagar
Manguka	Gariadhar	Bhavnagar
Anandpur	Gariadhar	Bhavnagar
Pipalva	Gariadhar	Bhavnagar
Surnivas	Gariadhar	Bhavnagar
Manvilas	Gariadhar	Bhavnagar
Surnagar	Gariadhar	Bhavnagar
Sukhpar	Gariadhar	Bhavnagar
Paravdi	Gariadhar	Bhavnagar
Panchtobara	Gariadhar	Bhavnagar
Fachariya	Gariadhar	Bhavnagar
Ratanvav	Gariadhar	Bhavnagar
Timba	Gariadhar	Bhavnagar
Sandh Khakhara	Gariadhar	Bhavnagar
Chomal	Gariadhar	Bhavnagar
Pachchhegam	Gariadhar	Bhavnagar
Nani Vavdi	Gariadhar	Bhavnagar
Mota Charodiya	Gariadhar	Bhavnagar
Virdi	Gariadhar	Bhavnagar
Morba	Gariadhar	Bhavnagar
Khodvadari	Gariadhar	Bhavnagar
Navagam	Gariadhar	Bhavnagar
Ganeshgadh	Gariadhar	Bhavnagar
Paldi	Gariadhar	Bhavnagar
Mangadh	Gariadhar	Bhavnagar
Shivendranagar	Gariadhar	Bhavnagar
Jalvadar	Gariadhar	Bhavnagar
Damrala	Gariadhar	Bhavnagar
Saringpur	Gariadhar	Bhavnagar
Rupavati	Gariadhar	Bhavnagar
Mesanka	Gariadhar	Bhavnagar
Bela	Gariadhar	Bhavnagar
Velavadar	Gariadhar	Bhavnagar
Sarambhada	Gariadhar	Bhavnagar
Luvara	Gariadhar	Bhavnagar
Thansa	Gariadhar	Bhavnagar
Gujarada	Gariadhar	Bhavnagar
Bhandariya	Gariadhar	Bhavnagar
Samadhiyala	Gariadhar	Bhavnagar
Satapada	Gariadhar	Bhavnagar
Ranigam	Gariadhar	Bhavnagar
Pa	Gariadhar	Bhavnagar
Samadhiyala (Mulani)	Palitana	Bhavnagar
Nondhanvadar	Palitana	Bhavnagar
Nesadi	Palitana	Bhavnagar
Navagam	Palitana	Bhavnagar
Badeli	Palitana	Bhavnagar
Anida(Kumbhan)	Palitana	Bhavnagar
Juna Sarod	Palitana	Bhavnagar
Kumbhan	Palitana	Bhavnagar
Khakhariya	Palitana	Bhavnagar
Ankolali	Palitana	Bhavnagar
Hanol	Palitana	Bhavnagar
Khijadiya (Nonghanvadar)	Palitana	Bhavnagar
Bahadurpur	Palitana	Bhavnagar
Motisari	Palitana	Bhavnagar
Valukad	Palitana	Bhavnagar
Jaliya(Ankolali)	Palitana	Bhavnagar
Loinchada	Palitana	Bhavnagar
Senjaliya	Palitana	Bhavnagar
Khijadiya(Mokhadaka)	Palitana	Bhavnagar
Nava Sroda	Palitana	Bhavnagar
Bharatimba	Palitana	Bhavnagar
Ovanpurtimbo	Palitana	Bhavnagar
Mokhadaka	Palitana	Bhavnagar
Jamanvav	Palitana	Bhavnagar
Ratanpur	Palitana	Bhavnagar
Bahadurgadh	Palitana	Bhavnagar
Pithalpur	Palitana	Bhavnagar
Maliya	Palitana	Bhavnagar
Panchpipla	Palitana	Bhavnagar
Chonda	Palitana	Bhavnagar
Lilivav	Palitana	Bhavnagar
Ranparada (Kharana)	Palitana	Bhavnagar
Jaliya(Kharana)	Palitana	Bhavnagar
Vadiya	Palitana	Bhavnagar
Moti Rajasthali	Palitana	Bhavnagar
Malpara	Palitana	Bhavnagar
Randola	Palitana	Bhavnagar
Bhundarakha	Palitana	Bhavnagar
Sagapara	Palitana	Bhavnagar
Virpur (Palitana)	Palitana	Bhavnagar
Manvad (Hadmatiya)	Palitana	Bhavnagar
Gheti	Palitana	Bhavnagar
Dudhala	Palitana	Bhavnagar
Nanimal	Palitana	Bhavnagar
Adapar	Palitana	Bhavnagar
Luvarvav	Palitana	Bhavnagar
Jamwali	Palitana	Bhavnagar
Piparadi	Palitana	Bhavnagar
Bhadavav	Palitana	Bhavnagar
Mandavda	Palitana	Bhavnagar
Moti Paniyali	Palitana	Bhavnagar
Sonpari	Palitana	Bhavnagar
Kanjarada	Palitana	Bhavnagar
Dedarada	Palitana	Bhavnagar
Jaliya(Manaji)	Palitana	Bhavnagar
Jaliya(Amaraji)	Palitana	Bhavnagar
Gandhol	Palitana	Bhavnagar
Rohishala	Palitana	Bhavnagar
Dungarpur	Palitana	Bhavnagar
Jivapur	Palitana	Bhavnagar
Nana Garajiya	Palitana	Bhavnagar
Mota Garajiya	Palitana	Bhavnagar
Thorali	Palitana	Bhavnagar
Nani Paniyali	Palitana	Bhavnagar
Bhutiya	Palitana	Bhavnagar
Anida(Lakhavad)	Palitana	Bhavnagar
Lakhavad	Palitana	Bhavnagar
Nani Rajasthali	Palitana	Bhavnagar
Vadal	Palitana	Bhavnagar
Panderiya	Palitana	Bhavnagar
Hathsani	Palitana	Bhavnagar
Ranparda (Chok)	Palitana	Bhavnagar
Depla	Palitana	Bhavnagar
Rajapara (Chok)	Palitana	Bhavnagar
Ayavej	Palitana	Bhavnagar
Chok	Palitana	Bhavnagar
Vijana Nes	Palitana	Bhavnagar
Chokiyapati	Palitana	Bhavnagar
Satana Nes	Palitana	Bhavnagar
Bhandariya	Palitana	Bhavnagar
Lapaliya	Palitana	Bhavnagar
Maidhar	Palitana	Bhavnagar
Mendha	Palitana	Bhavnagar
Sanjanasar	Palitana	Bhavnagar
Bodana Nes	Palitana	Bhavnagar
Morchupana	Palitana	Bhavnagar
Juna Padar	Palitana	Bhavnagar
Sanala	Palitana	Bhavnagar
Chiroda	Palitana	Bhavnagar
Virpur (Chok)	Palitana	Bhavnagar
Shevadivadar	Palitana	Bhavnagar
Rajpara (Thadach)	Palitana	Bhavnagar
Thadach	Palitana	Bhavnagar
Bakhalka	Talaja	Bhavnagar
Bharoli	Talaja	Bhavnagar
Nesvad	Talaja	Bhavnagar
Mamsi	Talaja	Bhavnagar
Nani Mandavali	Talaja	Bhavnagar
Pingali	Talaja	Bhavnagar
Moti Mandavali	Talaja	Bhavnagar
Bhadraval	Talaja	Bhavnagar
Dihor	Talaja	Bhavnagar
Chudi	Talaja	Bhavnagar
Hamirpara	Talaja	Bhavnagar
Sankhadasar No.2	Talaja	Bhavnagar
Rajpara No.2	Talaja	Bhavnagar
Paniyali	Talaja	Bhavnagar
Bhensavadi	Talaja	Bhavnagar
Khadadpar	Talaja	Bhavnagar
Jaspara	Talaja	Bhavnagar
Mandva	Talaja	Bhavnagar
Panchpipla	Talaja	Bhavnagar
Samadhiyala	Talaja	Bhavnagar
Neshiya	Talaja	Bhavnagar
Shevaliya	Talaja	Bhavnagar
Bhegali	Talaja	Bhavnagar
Timana	Talaja	Bhavnagar
Nani Babariyat	Talaja	Bhavnagar
Bela	Talaja	Bhavnagar
Gadhada	Talaja	Bhavnagar
Trapaj	Talaja	Bhavnagar
Sonsiya	Talaja	Bhavnagar
Kathava	Talaja	Bhavnagar
Mahadevpara(Timbo)	Talaja	Bhavnagar
Bapada	Talaja	Bhavnagar
Dhardi	Talaja	Bhavnagar
Umarla	Talaja	Bhavnagar
Borla	Talaja	Bhavnagar
Hubakvad	Talaja	Bhavnagar
Dantrad	Talaja	Bhavnagar
Tadhavad	Talaja	Bhavnagar
Kundhada	Talaja	Bhavnagar
Kundheli	Talaja	Bhavnagar
Devaliya	Talaja	Bhavnagar
Makhaniya	Talaja	Bhavnagar
Royal	Talaja	Bhavnagar
Bhalar	Talaja	Bhavnagar
Bapasara	Talaja	Bhavnagar
Sathara	Talaja	Bhavnagar
Bharapara	Talaja	Bhavnagar
Mathavda	Talaja	Bhavnagar
Piparla	Talaja	Bhavnagar
Velavadar	Talaja	Bhavnagar
Ghantarvala	Talaja	Bhavnagar
Thaliya	Talaja	Bhavnagar
Jalvadar	Talaja	Bhavnagar
Nava Sangana	Talaja	Bhavnagar
Juna Sangana	Talaja	Bhavnagar
Navi Kamrol	Talaja	Bhavnagar
Juni Kamrol	Talaja	Bhavnagar
Shobhavad	Talaja	Bhavnagar
Gorkhi	Talaja	Bhavnagar
Devli	Talaja	Bhavnagar
Isora	Talaja	Bhavnagar
Padari(Gohil)	Talaja	Bhavnagar
Chopada	Talaja	Bhavnagar
Tarsara	Talaja	Bhavnagar
Lilivav	Talaja	Bhavnagar
Sankhadasar No.1	Talaja	Bhavnagar
Juni Chhapari	Talaja	Bhavnagar
Belada	Talaja	Bhavnagar
Ralgon	Talaja	Bhavnagar
Kodiya	Talaja	Bhavnagar
Navi Chhapari	Talaja	Bhavnagar
Nana Ghana	Talaja	Bhavnagar
Hajipar	Talaja	Bhavnagar
Rampara	Talaja	Bhavnagar
Pavthi	Talaja	Bhavnagar
Dakana	Talaja	Bhavnagar
Sartanpar	Talaja	Bhavnagar
Sakhvadar	Talaja	Bhavnagar
Fulsar	Talaja	Bhavnagar
Shelavadar	Talaja	Bhavnagar
Padari (Bhammar)	Talaja	Bhavnagar
Pasavi	Talaja	Bhavnagar
Mota Ghana	Talaja	Bhavnagar
Khardi	Talaja	Bhavnagar
Padargadh	Talaja	Bhavnagar
Kundavi	Talaja	Bhavnagar
Vavadi	Talaja	Bhavnagar
Mahadevpara	Talaja	Bhavnagar
Khandhera	Talaja	Bhavnagar
Nichadi	Talaja	Bhavnagar
Unchdi	Talaja	Bhavnagar
Bhungar	Talaja	Bhavnagar
Bodki	Talaja	Bhavnagar
Gadhesar	Talaja	Bhavnagar
Borda	Talaja	Bhavnagar
Bordi	Talaja	Bhavnagar
Vataliya	Talaja	Bhavnagar
Rojiya	Talaja	Bhavnagar
Mangela	Talaja	Bhavnagar
Ambla	Talaja	Bhavnagar
Reliya Gadhula	Talaja	Bhavnagar
Pithalpur	Talaja	Bhavnagar
Kerala	Talaja	Bhavnagar
Vejodari	Talaja	Bhavnagar
Datha	Talaja	Bhavnagar
Valar	Talaja	Bhavnagar
Pratapara	Talaja	Bhavnagar
Nava Juna Rajapara	Talaja	Bhavnagar
Zanzmer	Talaja	Bhavnagar
Talli	Talaja	Bhavnagar
Bambhor	Talaja	Bhavnagar
Methla	Talaja	Bhavnagar
Madhuvan	Talaja	Bhavnagar
Jesar	Mahuva	Bhavnagar
Vavdi	Mahuva	Bhavnagar
Kotiya	Mahuva	Bhavnagar
Kalmodar	Mahuva	Bhavnagar
Ratanpar	Mahuva	Bhavnagar
Karmadiya	Mahuva	Bhavnagar
Matalpar	Mahuva	Bhavnagar
Beda	Mahuva	Bhavnagar
Chhapariyali	Mahuva	Bhavnagar
Karjala	Mahuva	Bhavnagar
Kobadiya	Mahuva	Bhavnagar
Intiya	Mahuva	Bhavnagar
Karla	Mahuva	Bhavnagar
Moda	Mahuva	Bhavnagar
Sarera	Mahuva	Bhavnagar
Bila	Mahuva	Bhavnagar
Tantaniya	Mahuva	Bhavnagar
Tol Saldi Chotila	Mahuva	Bhavnagar
Bhanvadiya	Mahuva	Bhavnagar
Dungarpar	Mahuva	Bhavnagar
Monpar	Mahuva	Bhavnagar
Bagdana	Mahuva	Bhavnagar
Titodiya	Mahuva	Bhavnagar
Dharai	Mahuva	Bhavnagar
Dudana	Mahuva	Bhavnagar
Borla	Mahuva	Bhavnagar
Samadhiyala No.3	Mahuva	Bhavnagar
Kumbhariya	Mahuva	Bhavnagar
Gundarana	Mahuva	Bhavnagar
Mota Malpara	Mahuva	Bhavnagar
Saloli	Mahuva	Bhavnagar
Degavda	Mahuva	Bhavnagar
Khari	Mahuva	Bhavnagar
Vaghvadarda	Mahuva	Bhavnagar
Sedarda	Mahuva	Bhavnagar
Kotamoi	Mahuva	Bhavnagar
Shantinagar	Mahuva	Bhavnagar
Ugalvan	Mahuva	Bhavnagar
Moti Vadal	Mahuva	Bhavnagar
Modaliya	Mahuva	Bhavnagar
Akhegadh	Mahuva	Bhavnagar
Nana Asrana	Mahuva	Bhavnagar
Mota Khuntavada	Mahuva	Bhavnagar
Thorala	Mahuva	Bhavnagar
Bordi	Mahuva	Bhavnagar
Rajavadar	Mahuva	Bhavnagar
Shetrana	Mahuva	Bhavnagar
Belampar	Mahuva	Bhavnagar
Galthar	Mahuva	Bhavnagar
Jambuda	Mahuva	Bhavnagar
Nana Khuntvada	Mahuva	Bhavnagar
Kasan	Mahuva	Bhavnagar
Bhaguda	Mahuva	Bhavnagar
Moti Jagdhar	Mahuva	Bhavnagar
Longdi	Mahuva	Bhavnagar
Loyanga	Mahuva	Bhavnagar
Anganka	Mahuva	Bhavnagar
Khadsaliya	Mahuva	Bhavnagar
Chhapri	Mahuva	Bhavnagar
Chuna	Mahuva	Bhavnagar
Kakidi	Mahuva	Bhavnagar
Kalela	Mahuva	Bhavnagar
Goras	Mahuva	Bhavnagar
Kinkaria	Mahuva	Bhavnagar
Mota Asrana	Mahuva	Bhavnagar
Chaddika	Mahuva	Bhavnagar
Bambhaniya	Mahuva	Bhavnagar
Dudhala No.2	Mahuva	Bhavnagar
Sanganiya	Mahuva	Bhavnagar
Kumbhan	Mahuva	Bhavnagar
Konjali	Mahuva	Bhavnagar
Tared	Mahuva	Bhavnagar
Ratol	Mahuva	Bhavnagar
Kantasar	Mahuva	Bhavnagar
Chokva	Mahuva	Bhavnagar
Moti Sodvadri	Mahuva	Bhavnagar
Nani Sodvadri	Mahuva	Bhavnagar
Khatsura	Mahuva	Bhavnagar
Otha	Mahuva	Bhavnagar
Lilvan	Mahuva	Bhavnagar
Nani Jagdhar	Mahuva	Bhavnagar
Raniwada	Mahuva	Bhavnagar
Ranparda	Mahuva	Bhavnagar
Rohisa	Mahuva	Bhavnagar
Boda	Mahuva	Bhavnagar
Bhadrod	Mahuva	Bhavnagar
Talgajarada	Mahuva	Bhavnagar
Bhanavav	Mahuva	Bhavnagar
Rupavati	Mahuva	Bhavnagar
Lakhupara	Mahuva	Bhavnagar
Bhadra	Mahuva	Bhavnagar
Lusadi	Mahuva	Bhavnagar
Gundarani	Mahuva	Bhavnagar
Nana Jadra	Mahuva	Bhavnagar
Tavida	Mahuva	Bhavnagar
Taredi	Mahuva	Bhavnagar
Malvav	Mahuva	Bhavnagar
Katakda	Mahuva	Bhavnagar
Bhatakda	Mahuva	Bhavnagar
Uncha Kotda	Mahuva	Bhavnagar
Dayal	Mahuva	Bhavnagar
Kalsar	Mahuva	Bhavnagar
Valavav	Mahuva	Bhavnagar
Sathara	Mahuva	Bhavnagar
Vaghnagar	Mahuva	Bhavnagar
Vadli	Mahuva	Bhavnagar
Umaniyavadar	Mahuva	Bhavnagar
Nesvad	Mahuva	Bhavnagar
Haripara	Mahuva	Bhavnagar
Visavadar	Mahuva	Bhavnagar
Dundas	Mahuva	Bhavnagar
Mota Pipalva	Mahuva	Bhavnagar
Kankot	Mahuva	Bhavnagar
Nana Pipalva	Mahuva	Bhavnagar
Bildi	Mahuva	Bhavnagar
Amrutvel	Mahuva	Bhavnagar
Bhanvad	Mahuva	Bhavnagar
Mota Jadra	Mahuva	Bhavnagar
Maliya	Mahuva	Bhavnagar
Naip	Mahuva	Bhavnagar
Nikol	Mahuva	Bhavnagar
Devaliya	Mahuva	Bhavnagar
Dudhala No.1	Mahuva	Bhavnagar
Madhiya	Mahuva	Bhavnagar
Vangar	Mahuva	Bhavnagar
Padhiyarka	Mahuva	Bhavnagar
Doliya	Mahuva	Bhavnagar
Dudheri	Mahuva	Bhavnagar
Gujarda	Mahuva	Bhavnagar
Khared	Mahuva	Bhavnagar
Gadhada	Mahuva	Bhavnagar
Jafarganj	Tarapur	Anand
Mota Kalodra	Tarapur	Anand
Mil Rampura	Tarapur	Anand
Khada	Tarapur	Anand
Nabhoi	Tarapur	Anand
Rinza	Tarapur	Anand
Pachegam	Tarapur	Anand
Dugari	Tarapur	Anand
Kanavada	Tarapur	Anand
Changada	Tarapur	Anand
Vank Talav	Tarapur	Anand
Valandapura	Tarapur	Anand
Kasbara	Tarapur	Anand
Chitarwada	Tarapur	Anand
Fatepura	Tarapur	Anand
Galiyana	Tarapur	Anand
Varsada	Tarapur	Anand
Indranaj	Tarapur	Anand
Isarwada	Tarapur	Anand
Tol	Tarapur	Anand
Mahiyari	Tarapur	Anand
Khanpur	Tarapur	Anand
Isanpur	Tarapur	Anand
Valli	Tarapur	Anand
Rel	Tarapur	Anand
Jichka	Tarapur	Anand
Chikhaliya	Tarapur	Anand
Moraj	Tarapur	Anand
Tarapur	Tarapur	Anand
Adruj	Tarapur	Anand
Malpur	Tarapur	Anand
Amaliyara	Tarapur	Anand
Gorad	Tarapur	Anand
Padra	Tarapur	Anand
Khakhsar	Tarapur	Anand
Jafrabad	Tarapur	Anand
Budhej	Tarapur	Anand
Sath	Tarapur	Anand
Untwada	Tarapur	Anand
Mobha	Tarapur	Anand
Bhanderaj	Tarapur	Anand
Jalla	Tarapur	Anand
Bhadkad	Sojitra	Anand
Deva Vanta	Sojitra	Anand
Run	Sojitra	Anand
Petli	Sojitra	Anand
Deva Talpad	Sojitra	Anand
Bantwa	Sojitra	Anand
Magharol	Sojitra	Anand
Dabhou	Sojitra	Anand
Malataj	Sojitra	Anand
Kasor	Sojitra	Anand
Trambovad	Sojitra	Anand
Limbali	Sojitra	Anand
Meghalpur	Sojitra	Anand
Balinta	Sojitra	Anand
Gada	Sojitra	Anand
Devataj	Sojitra	Anand
Isnav	Sojitra	Anand
Piplav	Sojitra	Anand
Virol (Sojitra)	Sojitra	Anand
Dali	Sojitra	Anand
Palol	Sojitra	Anand
Runaj	Sojitra	Anand
Kothavi	Sojitra	Anand
Khansol	Sojitra	Anand
Ardi	Umreth	Anand
Zala Bordi	Umreth	Anand
Ghora	Umreth	Anand
Thamna	Umreth	Anand
Pansora	Umreth	Anand
Vansol	Umreth	Anand
Saiyadpura	Umreth	Anand
Meghva-Badapura	Umreth	Anand
Untkhari	Umreth	Anand
Lingda	Umreth	Anand
Parvata	Umreth	Anand
Navapura	Umreth	Anand
Bhatpura	Umreth	Anand
Khankhanpur	Umreth	Anand
Sureli	Umreth	Anand
Bechari	Umreth	Anand
Hamidpura	Umreth	Anand
Ratanpura	Umreth	Anand
Gangapura	Umreth	Anand
Ashipura	Umreth	Anand
Fatepura	Umreth	Anand
Jakhala	Umreth	Anand
Tarpura	Umreth	Anand
Badapura	Umreth	Anand
Bhalej	Umreth	Anand
Sardarpura	Umreth	Anand
Khankuva	Umreth	Anand
Dagjipura	Umreth	Anand
Bharoda	Umreth	Anand
Dhuleta	Umreth	Anand
Sundalpura	Umreth	Anand
Ahima	Umreth	Anand
Shili	Umreth	Anand
Khorwad	Umreth	Anand
Dholi	Umreth	Anand
Pratappura	Umreth	Anand
Ajarpura	Anand	Anand
Kasor	Anand	Anand
Rahtalav	Anand	Anand
Kunjrao	Anand	Anand
Tarnol	Anand	Anand
Samarkha	Anand	Anand
Lambhvel	Anand	Anand
Jol	Anand	Anand
Chikhodra	Anand	Anand
Rasnol	Anand	Anand
Khambholaj	Anand	Anand
Khanpur	Anand	Anand
Sarsa	Anand	Anand
Bedva	Anand	Anand
Vaghasi	Anand	Anand
Valasan	Anand	Anand
Sandesar	Anand	Anand
Meghva Gana	Anand	Anand
Gana	Anand	Anand
Vans Khiliya	Anand	Anand
Jitodiya (Part)	Anand	Anand
Gopalpura	Anand	Anand
Mogar	Anand	Anand
Kherda	Anand	Anand
Vaherakhadi	Anand	Anand
Ramnagar	Anand	Anand
Vadod	Anand	Anand
Jakhariya	Anand	Anand
Navli	Anand	Anand
Khandhali	Anand	Anand
Napad Vanto	Anand	Anand
Napad Talpad	Anand	Anand
Adas	Anand	Anand
Anklavdi	Anand	Anand
Rajupura	Anand	Anand
Vasad	Anand	Anand
Sundan	Anand	Anand
Ramol	Petlad	Anand
Demol	Petlad	Anand
Changa	Petlad	Anand
Padgol	Petlad	Anand
Sanjaya	Petlad	Anand
Bamroli	Petlad	Anand
Ravli	Petlad	Anand
Ghunteli	Petlad	Anand
Mahelav	Petlad	Anand
Bandhni	Petlad	Anand
Ravipura	Petlad	Anand
Morad	Petlad	Anand
Porda	Petlad	Anand
Sunav	Petlad	Anand
Vishnoli	Petlad	Anand
Ardi	Petlad	Anand
Sihol	Petlad	Anand
Vatav	Petlad	Anand
Palaj	Petlad	Anand
Silvai	Petlad	Anand
Amod	Petlad	Anand
Jesarva	Petlad	Anand
Isarama	Petlad	Anand
Rangaipura	Petlad	Anand
Bhavanipura	Petlad	Anand
Fangani	Petlad	Anand
Bhatiel	Petlad	Anand
Agas	Petlad	Anand
Boriya	Petlad	Anand
Ashi	Petlad	Anand
Dantali	Petlad	Anand
Shekhadi	Petlad	Anand
Pandoli	Petlad	Anand
Nar	Petlad	Anand
Sansej	Petlad	Anand
Ramodadi	Petlad	Anand
Manpura	Petlad	Anand
Manej	Petlad	Anand
Khadana	Petlad	Anand
Jogan	Petlad	Anand
Davalpura	Petlad	Anand
Lakkadpura	Petlad	Anand
Simarada	Petlad	Anand
Virol(Simarada)	Petlad	Anand
Rupiyapura	Petlad	Anand
Vishrampura	Petlad	Anand
Shahpur	Petlad	Anand
Kaniya	Petlad	Anand
Danteli	Petlad	Anand
Bhurakui	Petlad	Anand
Sundara	Petlad	Anand
Dhairyapura	Petlad	Anand
Vadadala	Petlad	Anand
Dharmaj	Petlad	Anand
Sundarana	Petlad	Anand
Bharel	Petlad	Anand
Golana	Khambhat	Anand
Mitli	Khambhat	Anand
Rohni	Khambhat	Anand
Gudel	Khambhat	Anand
Bhimtalav	Khambhat	Anand
Jinaj	Khambhat	Anand
Rangpur	Khambhat	Anand
Malu	Khambhat	Anand
Hariyan	Khambhat	Anand
Kanzat	Khambhat	Anand
Jalsan	Khambhat	Anand
Finav	Khambhat	Anand
Kanisa	Khambhat	Anand
Sayama	Khambhat	Anand
Kodva	Khambhat	Anand
Motipura	Khambhat	Anand
Bhat Talavadi	Khambhat	Anand
Malasoni	Khambhat	Anand
Daheda	Khambhat	Anand
Hasanpura	Khambhat	Anand
Tamsa	Khambhat	Anand
Pandad	Khambhat	Anand
Tarakpur	Khambhat	Anand
Vadgam	Khambhat	Anand
Vainaj	Khambhat	Anand
Navagam Bara	Khambhat	Anand
Akhol	Khambhat	Anand
Lunej	Khambhat	Anand
Paldi	Khambhat	Anand
Sokhada	Khambhat	Anand
Jhalapur	Khambhat	Anand
Navagam Vanta	Khambhat	Anand
Neja	Khambhat	Anand
Nagra	Khambhat	Anand
Kali Talavadi	Khambhat	Anand
Timba	Khambhat	Anand
Piploi	Khambhat	Anand
Nandeli	Khambhat	Anand
Bamanva	Khambhat	Anand
Jahaj	Khambhat	Anand
Jalundh	Khambhat	Anand
Vadola	Khambhat	Anand
Chhatardi	Khambhat	Anand
Nana Kalodra	Khambhat	Anand
Popatvav	Khambhat	Anand
Undel	Khambhat	Anand
Khatnal	Khambhat	Anand
Vatadra	Khambhat	Anand
Vatra	Khambhat	Anand
Bhuvel	Khambhat	Anand
Vasna	Khambhat	Anand
Ralaj	Khambhat	Anand
Kalamsar	Khambhat	Anand
Rajpur	Khambhat	Anand
Khadodhi	Khambhat	Anand
Haripura	Khambhat	Anand
Dhuvaran	Khambhat	Anand
Dhundakuva	Borsad	Anand
Sur Kuva	Borsad	Anand
Napa Talpad	Borsad	Anand
Napa Vanto	Borsad	Anand
Dahemi	Borsad	Anand
Naman	Borsad	Anand
Singlav	Borsad	Anand
Dhobikui	Borsad	Anand
Dedarda	Borsad	Anand
Kavitha	Borsad	Anand
Santokpura	Borsad	Anand
Vahera	Borsad	Anand
Pamol	Borsad	Anand
Kasumbad	Borsad	Anand
Harkhapura	Borsad	Anand
Bodal	Borsad	Anand
Davol	Borsad	Anand
Dabhasi	Borsad	Anand
Bochasan	Borsad	Anand
Gorel	Borsad	Anand
Rudel	Borsad	Anand
Nisaraya	Borsad	Anand
Vasna ( Borsad)	Borsad	Anand
Kasari	Borsad	Anand
Chuva	Borsad	Anand
Uneli	Borsad	Anand
Ranoli	Borsad	Anand
Khanpur	Borsad	Anand
Virsad	Borsad	Anand
Jantral	Borsad	Anand
Vasna ( Ras)	Borsad	Anand
Saijpur	Borsad	Anand
Zarola	Borsad	Anand
Vadeli	Borsad	Anand
Vachhiyel	Borsad	Anand
Bhadran	Borsad	Anand
Alarsa	Borsad	Anand
Pipli	Borsad	Anand
Khedasa	Borsad	Anand
Bhadraniya	Borsad	Anand
Sisva	Borsad	Anand
Ras	Borsad	Anand
Amiyad	Borsad	Anand
Banejda	Borsad	Anand
Kandhroti	Borsad	Anand
Kanbha	Borsad	Anand
Divel	Borsad	Anand
Kathol	Borsad	Anand
Umlav	Borsad	Anand
Valvod	Borsad	Anand
Dhanavasi	Borsad	Anand
Kinkhlod	Borsad	Anand
Moti Sherdi	Borsad	Anand
Nani Sherdi	Borsad	Anand
Gorva	Borsad	Anand
Kathana	Borsad	Anand
Dali	Borsad	Anand
Kalu	Borsad	Anand
Badalpur	Borsad	Anand
Kankapura	Borsad	Anand
Dahewan	Borsad	Anand
Salol	Borsad	Anand
Gajana	Borsad	Anand
Kothiya khad	Borsad	Anand
Khadol (Haldari)	Anklav	Anand
Haldari	Anklav	Anand
Asodar	Anklav	Anand
Kanthariya	Anklav	Anand
Bhetasi Vanta	Anklav	Anand
Bhetasi (Talpad)	Anklav	Anand
Mujkuva	Anklav	Anand
Ambav	Anklav	Anand
Joshikuva	Anklav	Anand
Ambali	Anklav	Anand
Bhetasi Ba Bhag	Anklav	Anand
Bhanpura	Anklav	Anand
Kahanvadi	Anklav	Anand
Amrol	Anklav	Anand
Kosindra	Anklav	Anand
Lalpura	Anklav	Anand
Asarma	Anklav	Anand
Hathipura	Anklav	Anand
Navakhal	Anklav	Anand
Navapura	Anklav	Anand
Bilpad	Anklav	Anand
Jhilod	Anklav	Anand
Manpura	Anklav	Anand
Umeta	Anklav	Anand
Khadol (Umeta)	Anklav	Anand
Sankhyad	Anklav	Anand
Chamara	Anklav	Anand
Narpura	Anklav	Anand
Devapura	Anklav	Anand
Gambhira	Anklav	Anand
Bamangam	Anklav	Anand
Bobha	Kapadvanj	Kheda
Fuljina Muvada	Kapadvanj	Kheda
Betawada	Kapadvanj	Kheda
Vaghajipur	Kapadvanj	Kheda
Nikol	Kapadvanj	Kheda
Punadra	Kapadvanj	Kheda
Rampura	Kapadvanj	Kheda
Lal Mandva	Kapadvanj	Kheda
Shihora	Kapadvanj	Kheda
Dhuliya Vasna	Kapadvanj	Kheda
Narshipur	Kapadvanj	Kheda
Jambudi	Kapadvanj	Kheda
Singpur	Kapadvanj	Kheda
Nathana Muvada	Kapadvanj	Kheda
Moti Zer	Kapadvanj	Kheda
Abvel	Kapadvanj	Kheda
Bavano Math	Kapadvanj	Kheda
Bhoja Na Muvada	Kapadvanj	Kheda
Talpoda	Kapadvanj	Kheda
Deradi Pavathi	Kapadvanj	Kheda
Palaiya	Kapadvanj	Kheda
Telnar	Kapadvanj	Kheda
Vyasjina Muvada	Kapadvanj	Kheda
Nirmali	Kapadvanj	Kheda
Lalpur (Nirmali)	Kapadvanj	Kheda
Zanda	Kapadvanj	Kheda
Aboch	Kapadvanj	Kheda
Dadana Muvada	Kapadvanj	Kheda
Nani Zer	Kapadvanj	Kheda
Vaghana Muvada	Kapadvanj	Kheda
Gocharna Muvada	Kapadvanj	Kheda
Kamboya	Kapadvanj	Kheda
Ghadiya	Kapadvanj	Kheda
Malana Muvada	Kapadvanj	Kheda
Valva Mahuda	Kapadvanj	Kheda
Kavath	Kapadvanj	Kheda
Kashipura	Kapadvanj	Kheda
Suki	Kapadvanj	Kheda
Pathoda	Kapadvanj	Kheda
Vaghas	Kapadvanj	Kheda
Vyas Vasna	Kapadvanj	Kheda
Dandiyapur	Kapadvanj	Kheda
Kotwalna Muvada	Kapadvanj	Kheda
Bhungaliya	Kapadvanj	Kheda
Alawa	Kapadvanj	Kheda
Ladujina Muvada	Kapadvanj	Kheda
Pirojpur	Kapadvanj	Kheda
Dantali	Kapadvanj	Kheda
Thavad	Kapadvanj	Kheda
Sultanpur (Vadadhara)	Kapadvanj	Kheda
Vadadhara	Kapadvanj	Kheda
Vanta	Kapadvanj	Kheda
Ghauva	Kapadvanj	Kheda
Sunda	Kapadvanj	Kheda
Reliya	Kapadvanj	Kheda
Dudhathal	Kapadvanj	Kheda
Letar	Kapadvanj	Kheda
Vadali	Kapadvanj	Kheda
Lalpur	Kapadvanj	Kheda
Jagdupur	Kapadvanj	Kheda
Kalaji	Kapadvanj	Kheda
Rozavada	Kapadvanj	Kheda
Kevadiya	Kapadvanj	Kheda
Bhailakui	Kapadvanj	Kheda
Hamirpura	Kapadvanj	Kheda
Aghatna Muvada	Kapadvanj	Kheda
Thunchal	Kapadvanj	Kheda
Sultanpur (Taiyabpur)	Kapadvanj	Kheda
Khanpur	Kapadvanj	Kheda
Taiyabpur	Kapadvanj	Kheda
Alampur	Kapadvanj	Kheda
Bhutiya	Kapadvanj	Kheda
Danadra	Kapadvanj	Kheda
Antisar	Kapadvanj	Kheda
Garod	Kapadvanj	Kheda
Navagam	Kapadvanj	Kheda
Jaloya	Kapadvanj	Kheda
Karkariya	Kapadvanj	Kheda
Ukardina Muvada	Kapadvanj	Kheda
Kabhaina Muvada	Kapadvanj	Kheda
Atarsumba	Kapadvanj	Kheda
Vaghavat	Kapadvanj	Kheda
Kosam	Kapadvanj	Kheda
Vavna Muvada	Kapadvanj	Kheda
Singali	Kapadvanj	Kheda
Mahamadpura	Kapadvanj	Kheda
Ramosadi	Kapadvanj	Kheda
Khadol	Kapadvanj	Kheda
Mal Itadi Pagi Bhag	Kapadvanj	Kheda
Mal Itadi Baraiya Bhag	Kapadvanj	Kheda
Vejalpur	Kapadvanj	Kheda
Rampura (Sundarvadi)	Kapadvanj	Kheda
Mirapur	Kapadvanj	Kheda
Fatiyabad	Kapadvanj	Kheda
Antroli	Kapadvanj	Kheda
Torna	Kapadvanj	Kheda
Dasalvada	Kapadvanj	Kheda
Ambaliyara	Kapadvanj	Kheda
Vasna	Kapadvanj	Kheda
Dana	Kapadvanj	Kheda
Dahiyap	Kapadvanj	Kheda
Salod	Kapadvanj	Kheda
Sorna	Kapadvanj	Kheda
Savali	Kapadvanj	Kheda
Chikhlod	Kapadvanj	Kheda
Vadol	Kapadvanj	Kheda
Bhatpur	Virpur	Kheda
Butiya	Virpur	Kheda
Khetavada	Virpur	Kheda
Chikhli Jhojha	Virpur	Kheda
Khata	Virpur	Kheda
Ghatda	Virpur	Kheda
Koyla	Virpur	Kheda
Chharvangi	Virpur	Kheda
Rampura	Virpur	Kheda
Gandhari	Virpur	Kheda
Badharpura	Virpur	Kheda
Alampura	Virpur	Kheda
Debhari	Virpur	Kheda
Bharodi	Virpur	Kheda
Umariya	Virpur	Kheda
Koydam	Virpur	Kheda
Vaghas	Virpur	Kheda
Chorasa	Virpur	Kheda
Kharod	Virpur	Kheda
Rojhav	Virpur	Kheda
Salaiya	Virpur	Kheda
Rajpur (Virpur)	Virpur	Kheda
Raliyata (Virpur)	Virpur	Kheda
Kasudi	Virpur	Kheda
Baroda	Virpur	Kheda
Kumbharvadi	Virpur	Kheda
Nasroli	Virpur	Kheda
Kaslavati	Virpur	Kheda
Kheroli	Virpur	Kheda
Gopalpura	Virpur	Kheda
Rasulpur	Virpur	Kheda
Jamalpur	Virpur	Kheda
Gomvadi	Virpur	Kheda
Dholavada	Virpur	Kheda
Rajena	Virpur	Kheda
Limbarvada	Virpur	Kheda
Handiya (Virpur)	Virpur	Kheda
Sariya	Virpur	Kheda
Balvakhant Na Muvada	Virpur	Kheda
Pansroda	Virpur	Kheda
Jambudi	Virpur	Kheda
Aspur	Virpur	Kheda
Tajpur	Virpur	Kheda
Jodhpur	Virpur	Kheda
Javrakhant Na Muvada	Virpur	Kheda
Bar	Virpur	Kheda
Varadhara	Virpur	Kheda
Asundariya	Virpur	Kheda
Ratankuva	Virpur	Kheda
Bhanjini Vav	Virpur	Kheda
Panta	Virpur	Kheda
Gadheli	Virpur	Kheda
Saradiya	Virpur	Kheda
Alela	Balasinor	Kheda
Gundela	Balasinor	Kheda
Dhanela	Balasinor	Kheda
Kambopa	Balasinor	Kheda
Dolat Poyda	Balasinor	Kheda
parabiya	Balasinor	Kheda
Jetholi	Balasinor	Kheda
Vasadra	Balasinor	Kheda
Pandva	Balasinor	Kheda
Sutariya	Balasinor	Kheda
Bhanthala	Balasinor	Kheda
Raiyoli	Balasinor	Kheda
Khandivav	Balasinor	Kheda
Dev	Balasinor	Kheda
Dhathi	Balasinor	Kheda
Limbdi	Balasinor	Kheda
Dhundhaliya	Balasinor	Kheda
Manvarpura	Balasinor	Kheda
Felsani	Balasinor	Kheda
Gunthli	Balasinor	Kheda
Jorapura	Balasinor	Kheda
Meghaliya	Balasinor	Kheda
Kadaia	Balasinor	Kheda
Janod	Balasinor	Kheda
Pilodra	Balasinor	Kheda
Gadhavada	Balasinor	Kheda
Dakhariya	Balasinor	Kheda
Saroda	Balasinor	Kheda
Gaja Pagina Muvada	Balasinor	Kheda
Baliyadev	Balasinor	Kheda
Othvad	Balasinor	Kheda
Parpadiya	Balasinor	Kheda
Navagama	Balasinor	Kheda
Bodeli	Balasinor	Kheda
Karanpur	Balasinor	Kheda
Saliyavadi	Balasinor	Kheda
Raliyata (Balasinor)	Balasinor	Kheda
Kotarbor	Balasinor	Kheda
Gadhna Muvada	Balasinor	Kheda
Vanakbori	Balasinor	Kheda
Sakariya	Balasinor	Kheda
Jamiyatpura	Balasinor	Kheda
Kunjara	Balasinor	Kheda
Vadadala	Balasinor	Kheda
Rajpur (Balasinor)	Balasinor	Kheda
Handiya (Balasinor)	Balasinor	Kheda
Narpura Alias Narmiyani Muvadi	Kathlal	Kheda
Madadra	Kathlal	Kheda
Apruji	Kathlal	Kheda
Suravat	Kathlal	Kheda
Ravdavat	Kathlal	Kheda
Chared	Kathlal	Kheda
Chelavat	Kathlal	Kheda
Lakha Miyani Muvadi	Kathlal	Kheda
Nani Bhanavat	Kathlal	Kheda
Moti Bhanavat	Kathlal	Kheda
Manorni Muvadi	Kathlal	Kheda
Hathiyani Muvadi	Kathlal	Kheda
Sandesar	Kathlal	Kheda
Kakarkhad	Kathlal	Kheda
Sarkhej	Kathlal	Kheda
Badarpur	Kathlal	Kheda
Mirjapur	Kathlal	Kheda
Khalal	Kathlal	Kheda
Pato	Kathlal	Kheda
Khadal	Kathlal	Kheda
Bhagatna Muvada	Kathlal	Kheda
Gugaliya	Kathlal	Kheda
Sipaini Muvadi	Kathlal	Kheda
Kaletar	Kathlal	Kheda
Gangadasni Muvadi	Kathlal	Kheda
Aral	Kathlal	Kheda
Mudel Ratanpur	Kathlal	Kheda
Gadvel	Kathlal	Kheda
Gangiyal	Kathlal	Kheda
Chhipial	Kathlal	Kheda
Chhipadi	Kathlal	Kheda
Vantda	Kathlal	Kheda
Kaniyel	Kathlal	Kheda
Bhatera	Kathlal	Kheda
Dampat	Kathlal	Kheda
Sikandar Porda	Kathlal	Kheda
Vishvnathpura	Kathlal	Kheda
Charan Nikol	Kathlal	Kheda
Fagvel	Kathlal	Kheda
Porda Fagvel	Kathlal	Kheda
Fulchhatrapura	Kathlal	Kheda
Lasundra	Kathlal	Kheda
Ladvel	Kathlal	Kheda
Laxmanpura	Kathlal	Kheda
Kathana	Kathlal	Kheda
Anara	Kathlal	Kheda
Porda Bhatera	Kathlal	Kheda
Pahad	Kathlal	Kheda
Jitpura	Kathlal	Kheda
Jamni	Kathlal	Kheda
Sarali	Kathlal	Kheda
Bagdol	Kathlal	Kheda
Abhripur	Kathlal	Kheda
Bharkunda	Kathlal	Kheda
Pithai	Kathlal	Kheda
Bhaner	Kathlal	Kheda
Shahpur	Kathlal	Kheda
Ghoghawada	Kathlal	Kheda
Bar Muvada	Mehmedabad	Kheda
Umedpura	Mehmedabad	Kheda
Haldarvas	Mehmedabad	Kheda
Gokalpura	Mehmedabad	Kheda
Hathnoli	Mehmedabad	Kheda
Moti Timbli	Mehmedabad	Kheda
Nani Timbali	Mehmedabad	Kheda
Nani Adboli	Mehmedabad	Kheda
Kothipura	Mehmedabad	Kheda
Moti Adboli	Mehmedabad	Kheda
Pahadiya	Mehmedabad	Kheda
Surajpura	Mehmedabad	Kheda
Raska	Mehmedabad	Kheda
Rohisa	Mehmedabad	Kheda
Jinjar	Mehmedabad	Kheda
Jalampura	Mehmedabad	Kheda
Ajabpura	Mehmedabad	Kheda
Ghodasar	Mehmedabad	Kheda
Ratanpura	Mehmedabad	Kheda
Sarsavani	Mehmedabad	Kheda
Jaliya	Mehmedabad	Kheda
Rudan	Mehmedabad	Kheda
Karoli	Mehmedabad	Kheda
Shatrunda	Mehmedabad	Kheda
Charan Na Muvada	Mehmedabad	Kheda
Charan Na Muvada (Inami)	Mehmedabad	Kheda
Kuna	Mehmedabad	Kheda
Dajipura	Mehmedabad	Kheda
Kanij	Mehmedabad	Kheda
Amsaran	Mehmedabad	Kheda
Modaj	Mehmedabad	Kheda
Mankwa	Mehmedabad	Kheda
Rinchhol	Mehmedabad	Kheda
Aklacha	Mehmedabad	Kheda
Vansoli	Mehmedabad	Kheda
Navchetan	Mehmedabad	Kheda
Navagam (Dolpura)	Mehmedabad	Kheda
Khatraj	Mehmedabad	Kheda
Sojali	Mehmedabad	Kheda
Ghodali	Mehmedabad	Kheda
Sansoli	Mehmedabad	Kheda
Nenpur	Mehmedabad	Kheda
Malutaj	Mehmedabad	Kheda
Sadra	Mehmedabad	Kheda
Vadadla	Mehmedabad	Kheda
Pahad	Mehmedabad	Kheda
Areri	Mehmedabad	Kheda
Wanthvali	Mehmedabad	Kheda
Kesra	Mehmedabad	Kheda
Sihunj	Mehmedabad	Kheda
Vansol Sundha	Mehmedabad	Kheda
Sundha	Mehmedabad	Kheda
Vamali	Mehmedabad	Kheda
Devki Vansol	Mehmedabad	Kheda
Kachhai	Mehmedabad	Kheda
Virol	Mehmedabad	Kheda
Chhapra	Mehmedabad	Kheda
Katakpura	Mehmedabad	Kheda
Iawa	Mehmedabad	Kheda
Bavra	Mehmedabad	Kheda
Gothaj	Mehmedabad	Kheda
Gadva	Mehmedabad	Kheda
Samaspur	Mehmedabad	Kheda
Khambhali	Mehmedabad	Kheda
Varsola	Mehmedabad	Kheda
Umiyapura	Kheda	Kheda
Lali	Kheda	Kheda
Mahij	Kheda	Kheda
Bidaj	Kheda	Kheda
Kanera	Kheda	Kheda
Sarsa	Kheda	Kheda
Vasna Margiya	Kheda	Kheda
Sankhej	Kheda	Kheda
Vaikunthpura	Kheda	Kheda
Pinglaj	Kheda	Kheda
Kathwada	Kheda	Kheda
Navagam	Kheda	Kheda
Malarpura	Kheda	Kheda
Samadara	Kheda	Kheda
Dedarda	Kheda	Kheda
Parsantaj	Kheda	Kheda
Vasna-Khurd	Kheda	Kheda
Kajipura	Kheda	Kheda
Goblaj	Kheda	Kheda
Pansoli	Kheda	Kheda
Chalindra	Kheda	Kheda
Dharoda	Kheda	Kheda
Chitrasar	Kheda	Kheda
Kaloli	Kheda	Kheda
Nayaka	Kheda	Kheda
Bherai	Kheda	Kheda
Dhathal	Kheda	Kheda
Vadala	Kheda	Kheda
Hariyala	Kheda	Kheda
Khumarvad	Kheda	Kheda
Vavdi	Kheda	Kheda
Damri	Kheda	Kheda
Govindpura	Kheda	Kheda
Shetra	Kheda	Kheda
Rasikpura	Kheda	Kheda
Varsang	Kheda	Kheda
Radhu	Kheda	Kheda
Chandna	Kheda	Kheda
Vasna Bujarg	Kheda	Kheda
Sokhda	Matar	Kheda
Ratanpur	Matar	Kheda
Antroli	Matar	Kheda
Haijarabad	Matar	Kheda
Sandhana	Matar	Kheda
Radhvanaj	Matar	Kheda
Vansar	Matar	Kheda
Pipariya	Matar	Kheda
Koshiyal	Matar	Kheda
Mahelaj	Matar	Kheda
Matar	Matar	Kheda
Khadiyarpura	Matar	Kheda
Undhela	Matar	Kheda
Alindra	Matar	Kheda
Untai	Matar	Kheda
Garmala	Matar	Kheda
Traj	Matar	Kheda
Baroda	Matar	Kheda
Kunjara	Matar	Kheda
Punaj	Matar	Kheda
Aslali	Matar	Kheda
Machhiel	Matar	Kheda
Heranj	Matar	Kheda
Maliyataj	Matar	Kheda
Siholdi	Matar	Kheda
Laval	Matar	Kheda
Khandhli	Matar	Kheda
Kathoda	Matar	Kheda
Tranja	Matar	Kheda
Kharenti	Matar	Kheda
Palla	Matar	Kheda
Asamali	Matar	Kheda
Nadhanpur	Matar	Kheda
Marala	Matar	Kheda
Nagrama	Matar	Kheda
Nandoli	Matar	Kheda
Dethli	Matar	Kheda
Malavada	Matar	Kheda
Ranasar	Matar	Kheda
Limbasi	Matar	Kheda
Mehmedabad	Matar	Kheda
Vastana	Matar	Kheda
Chanor	Matar	Kheda
Shekhupur	Matar	Kheda
Vasai	Matar	Kheda
Bhalada	Matar	Kheda
Sayla	Matar	Kheda
Indarvarna	Matar	Kheda
Hadeva	Matar	Kheda
Valotri	Matar	Kheda
Daloli	Matar	Kheda
Viroja	Matar	Kheda
Bamangam	Matar	Kheda
Pariyej	Matar	Kheda
Sinjiwada	Matar	Kheda
Andhaj	Nadiad	Kheda
Arera	Nadiad	Kheda
Dawapura	Nadiad	Kheda
Vina	Nadiad	Kheda
Hathaj	Nadiad	Kheda
Navagam	Nadiad	Kheda
Javol	Nadiad	Kheda
Arajanpur Kot	Nadiad	Kheda
Nana Vaga	Nadiad	Kheda
Paldi	Nadiad	Kheda
Sodpur	Nadiad	Kheda
Monghroli	Nadiad	Kheda
Maholel	Nadiad	Kheda
Palaiya	Nadiad	Kheda
Valla	Nadiad	Kheda
Erandiyapura	Nadiad	Kheda
Aljada	Nadiad	Kheda
Silod	Nadiad	Kheda
Hathnoli	Nadiad	Kheda
Degam	Nadiad	Kheda
Zarol	Nadiad	Kheda
Dantali	Nadiad	Kheda
Dabhan	Nadiad	Kheda
Kamla (Part)	Nadiad	Kheda
Yoginagar	Nadiad	Kheda
Manjipura (Part)	Nadiad	Kheda
Bilodra	Nadiad	Kheda
Marida	Nadiad	Kheda
Salun Vanto	Nadiad	Kheda
Salun Talpad	Nadiad	Kheda
Alindra	Nadiad	Kheda
Chalali	Nadiad	Kheda
Surasamal	Nadiad	Kheda
Kanjoda	Nadiad	Kheda
Fatepur	Nadiad	Kheda
Tundel	Nadiad	Kheda
Davda	Nadiad	Kheda
Bamroli	Nadiad	Kheda
Palana	Nadiad	Kheda
Vaso	Nadiad	Kheda
Rampura	Nadiad	Kheda
Pij	Nadiad	Kheda
Dumral	Nadiad	Kheda
Piplag	Nadiad	Kheda
Uttarsanda	Nadiad	Kheda
Bhumel	Nadiad	Kheda
Narsanda	Nadiad	Kheda
Gutal	Nadiad	Kheda
Keriavi	Nadiad	Kheda
Piplata	Nadiad	Kheda
Mitral	Nadiad	Kheda
Gangapur	Nadiad	Kheda
Navagam	Nadiad	Kheda
Thaledi	Nadiad	Kheda
Kaloli	Nadiad	Kheda
Akhdol	Nadiad	Kheda
Valetva	Nadiad	Kheda
Vadtal	Nadiad	Kheda
Rajnagar	Nadiad	Kheda
Khandivav	Mahudha	Kheda
Faloli	Mahudha	Kheda
Vasna	Mahudha	Kheda
Nizampura	Mahudha	Kheda
Mahisa	Mahudha	Kheda
Porda	Mahudha	Kheda
Kaprupur	Mahudha	Kheda
Khurdabad	Mahudha	Kheda
Minawada	Mahudha	Kheda
Ruppura	Mahudha	Kheda
Dadusar	Mahudha	Kheda
Mehmedabad Muvada	Mahudha	Kheda
Vadthal	Mahudha	Kheda
Dhandhodi	Mahudha	Kheda
Finav	Mahudha	Kheda
Bhumas	Mahudha	Kheda
Hajatiya	Mahudha	Kheda
Singhali	Mahudha	Kheda
Nani Khadol	Mahudha	Kheda
Moti Khadol	Mahudha	Kheda
Balol	Mahudha	Kheda
Kaiyaj	Mahudha	Kheda
Mirjapur	Mahudha	Kheda
Alina	Mahudha	Kheda
Nagval	Mahudha	Kheda
Sastapur	Mahudha	Kheda
Kadi	Mahudha	Kheda
Undra	Mahudha	Kheda
Toraniya	Mahudha	Kheda
Nadgam	Mahudha	Kheda
Mangalpur	Mahudha	Kheda
Khuntaj	Mahudha	Kheda
Sapla	Mahudha	Kheda
Bagdu	Mahudha	Kheda
Mulaj	Mahudha	Kheda
Sanali	Mahudha	Kheda
Khaladi	Mahudha	Kheda
Baladi	Mahudha	Kheda
Sheri	Mahudha	Kheda
Chunel	Mahudha	Kheda
Heranj	Mahudha	Kheda
Khad Godhra	Thasra	Kheda
Mahi Itadi	Thasra	Kheda
Vanoda	Thasra	Kheda
Rozva	Thasra	Kheda
Bhatvasna	Thasra	Kheda
Nanadara	Thasra	Kheda
Shamalpura	Thasra	Kheda
Ozharala	Thasra	Kheda
Sandheli	Thasra	Kheda
Salun	Thasra	Kheda
Sanadra	Thasra	Kheda
Wanghroli	Thasra	Kheda
Baladha	Thasra	Kheda
Menpura	Thasra	Kheda
Kuni	Thasra	Kheda
Sangol	Thasra	Kheda
Padal	Thasra	Kheda
Timbana Muvada	Thasra	Kheda
Rasulpur Padal	Thasra	Kheda
Sonaiya	Thasra	Kheda
Jargal	Thasra	Kheda
Dabhali	Thasra	Kheda
Palaiya	Thasra	Kheda
Gadhvina Muvada	Thasra	Kheda
Ajroli	Thasra	Kheda
Rani Porda	Thasra	Kheda
Chetarsumba	Thasra	Kheda
Vithalpura	Thasra	Kheda
Rawaliya	Thasra	Kheda
Porda	Thasra	Kheda
Ajupura	Thasra	Kheda
Bhatpura No-1	Thasra	Kheda
Bharthari	Thasra	Kheda
Pipalvada	Thasra	Kheda
Mithana Muvada	Thasra	Kheda
Vadad	Thasra	Kheda
Vaso	Thasra	Kheda
Sonipur	Thasra	Kheda
Pali	Thasra	Kheda
Malvan	Thasra	Kheda
Anghadi	Thasra	Kheda
Dabhsar	Thasra	Kheda
Kosam	Thasra	Kheda
Golaj	Thasra	Kheda
Vajewal	Thasra	Kheda
Bhatpura No-2	Thasra	Kheda
Chandasar	Thasra	Kheda
Amrutpura	Thasra	Kheda
Saiyat	Thasra	Kheda
Muliyad	Thasra	Kheda
Ekalvelu	Thasra	Kheda
Aurangpura	Thasra	Kheda
Badharpura	Thasra	Kheda
Ambav	Thasra	Kheda
Rustampura	Thasra	Kheda
Sarnal	Thasra	Kheda
Uplet	Thasra	Kheda
Shahpura	Thasra	Kheda
Udhmatpura	Thasra	Kheda
jalanagar	Thasra	Kheda
Sandheliya	Thasra	Kheda
Dhundi	Thasra	Kheda
Rasulpur Thasra	Thasra	Kheda
Vanoti	Thasra	Kheda
Pilol	Thasra	Kheda
Sui	Thasra	Kheda
Vallavpura	Thasra	Kheda
Bordi	Thasra	Kheda
Morambli	Thasra	Kheda
Masra	Thasra	Kheda
Khijalpur Talpad	Thasra	Kheda
Khijalpur Vanto	Thasra	Kheda
Malai	Thasra	Kheda
Vinzol	Thasra	Kheda
Simlaj	Thasra	Kheda
jakhed	Thasra	Kheda
Rakhiyal (Part)	Thasra	Kheda
Agarwa	Thasra	Kheda
Kotariya	Thasra	Kheda
Gumadiya	Thasra	Kheda
Vamali	Thasra	Kheda
Umba	Thasra	Kheda
Marghakui	Thasra	Kheda
Kalsar	Thasra	Kheda
Pandvania	Thasra	Kheda
Dhunadara	Thasra	Kheda
Nes	Thasra	Kheda
Harkhol	Thasra	Kheda
Aklach	Thasra	Kheda
Bhadrasa	Thasra	Kheda
Manjipura	Thasra	Kheda
Chitlav	Thasra	Kheda
Kotlindora	Thasra	Kheda
Jesapura Mithapura	Thasra	Kheda
Jorapura	Thasra	Kheda
Raniya	Thasra	Kheda
Lambho	Khanpur	Panch Mahals
Dhol Khakhara	Khanpur	Panch Mahals
Kala Khetra	Khanpur	Panch Mahals
Khatudamor Ni Muvadi	Khanpur	Panch Mahals
Chhani	Khanpur	Panch Mahals
Rankli	Khanpur	Panch Mahals
Dolatpura	Khanpur	Panch Mahals
Vadhela	Khanpur	Panch Mahals
Limdi Timba	Khanpur	Panch Mahals
Nesda	Khanpur	Panch Mahals
Udava	Khanpur	Panch Mahals
Mor Khakhara	Khanpur	Panch Mahals
Patapur	Khanpur	Panch Mahals
Padedi (Patapur)	Khanpur	Panch Mahals
Borvai	Khanpur	Panch Mahals
Kakari Mahudi	Khanpur	Panch Mahals
Dhokli	Khanpur	Panch Mahals
Ruzada	Khanpur	Panch Mahals
Khadodi	Khanpur	Panch Mahals
Madapur	Khanpur	Panch Mahals
Ghodiyarpir	Khanpur	Panch Mahals
Navagam-1	Khanpur	Panch Mahals
Vavkuva	Khanpur	Panch Mahals
Jalkukdi	Khanpur	Panch Mahals
Pandarwada	Khanpur	Panch Mahals
Motipura-1	Khanpur	Panch Mahals
Dalelpura	Khanpur	Panch Mahals
Masadra	Khanpur	Panch Mahals
Ladanna Muvada	Khanpur	Panch Mahals
Vastana Muvada	Khanpur	Panch Mahals
Bakor	Khanpur	Panch Mahals
Hansoliyana Muvada	Khanpur	Panch Mahals
Jethola	Khanpur	Panch Mahals
Korvai	Khanpur	Panch Mahals
Simalnada	Khanpur	Panch Mahals
Punjelav	Khanpur	Panch Mahals
Bhuvabar	Khanpur	Panch Mahals
Umariya	Khanpur	Panch Mahals
Jher	Khanpur	Panch Mahals
Dodavanta	Khanpur	Panch Mahals
Lavana	Khanpur	Panch Mahals
Babaliya	Khanpur	Panch Mahals
Tejakui	Khanpur	Panch Mahals
Dhuleta	Khanpur	Panch Mahals
Naroda	Khanpur	Panch Mahals
Khuntelav	Khanpur	Panch Mahals
Padedi (Kanod)	Khanpur	Panch Mahals
Kanod	Khanpur	Panch Mahals
Ghoghawada	Khanpur	Panch Mahals
Mena	Khanpur	Panch Mahals
Raheman	Khanpur	Panch Mahals
Kolambi	Khanpur	Panch Mahals
Mota Khanpur	Khanpur	Panch Mahals
Nana Khanpur	Khanpur	Panch Mahals
Bhadrod	Khanpur	Panch Mahals
Bamroda	Khanpur	Panch Mahals
Vadagam	Khanpur	Panch Mahals
Tarkadi	Khanpur	Panch Mahals
Vakhatpur	Khanpur	Panch Mahals
Gangata	Khanpur	Panch Mahals
Bedvalli	Khanpur	Panch Mahals
Chhapri-1	Khanpur	Panch Mahals
Badesara	Khanpur	Panch Mahals
Sampadiya	Khanpur	Panch Mahals
Karanta	Khanpur	Panch Mahals
Muda Vadekh	Khanpur	Panch Mahals
Vavyo	Khanpur	Panch Mahals
Vanka	Khanpur	Panch Mahals
Masiya	Khanpur	Panch Mahals
Bhanpur	Khanpur	Panch Mahals
Fatajina Bhevada	Khanpur	Panch Mahals
Limadiya	Khanpur	Panch Mahals
Isroda	Khanpur	Panch Mahals
Vavia	Khanpur	Panch Mahals
Kaslavati	Khanpur	Panch Mahals
Akhadana Degamda	Khanpur	Panch Mahals
Charnna Degamda	Khanpur	Panch Mahals
Tankana Bhevada	Khanpur	Panch Mahals
Talpadna Bhevada	Khanpur	Panch Mahals
Mahiapur	Khanpur	Panch Mahals
Pandyana Muvada	Khanpur	Panch Mahals
Mokamsinhna Bhevada	Khanpur	Panch Mahals
Vandarved	Khanpur	Panch Mahals
Virparna Muvada	Khanpur	Panch Mahals
Dolariya	Khanpur	Panch Mahals
Kanesar	Khanpur	Panch Mahals
Ditvas	Kadana	Panch Mahals
Karvai	Kadana	Panch Mahals
Sarasva (North))	Kadana	Panch Mahals
Bhul	Kadana	Panch Mahals
Bachkaria (North)	Kadana	Panch Mahals
Kaliyari	Kadana	Panch Mahals
Varsada	Kadana	Panch Mahals
Zalasang	Kadana	Panch Mahals
Vachhalawada	Kadana	Panch Mahals
Jogan Jetpur	Kadana	Panch Mahals
Godhar (North)	Kadana	Panch Mahals
Mota Padadara	Kadana	Panch Mahals
Nana Padadara	Kadana	Panch Mahals
Tarkoni Nal	Kadana	Panch Mahals
Moti Rath	Kadana	Panch Mahals
Nani Rath	Kadana	Panch Mahals
Kharod	Kadana	Panch Mahals
Pachher	Kadana	Panch Mahals
Rankakot	Kadana	Panch Mahals
Dhingalwada	Kadana	Panch Mahals
Chhajali	Kadana	Panch Mahals
Kakri Mahudi	Kadana	Panch Mahals
Ankaliya	Kadana	Panch Mahals
Talwada	Kadana	Panch Mahals
Ranakpur	Kadana	Panch Mahals
Nana Mirapur	Kadana	Panch Mahals
Mota Mirapur	Kadana	Panch Mahals
Ghaswada	Kadana	Panch Mahals
Jambunala	Kadana	Panch Mahals
Amboja	Kadana	Panch Mahals
Karodia (North)	Kadana	Panch Mahals
Sarsdi	Kadana	Panch Mahals
Royaniya	Kadana	Panch Mahals
Relva	Kadana	Panch Mahals
Amthani	Kadana	Panch Mahals
Padhara	Kadana	Panch Mahals
Bhagaliya	Kadana	Panch Mahals
Bokannala	Kadana	Panch Mahals
Velanwada	Kadana	Panch Mahals
Ladu Damorna Vanta	Kadana	Panch Mahals
Gareniya	Kadana	Panch Mahals
Buchawada	Kadana	Panch Mahals
Nindka (North)	Kadana	Panch Mahals
Muvala Bid	Kadana	Panch Mahals
Rathada	Kadana	Panch Mahals
Jaguna Muvada	Kadana	Panch Mahals
Limpur	Kadana	Panch Mahals
Munpur	Kadana	Panch Mahals
Agarwada	Kadana	Panch Mahals
Dedawada	Kadana	Panch Mahals
Antalwada	Kadana	Panch Mahals
Tantroli	Kadana	Panch Mahals
Khatva	Kadana	Panch Mahals
Dadhaliya	Kadana	Panch Mahals
Machhina Nadhara	Kadana	Panch Mahals
Kharawada	Kadana	Panch Mahals
Padamjini Muvadi	Kadana	Panch Mahals
Vagh Dungri	Kadana	Panch Mahals
Ghodiyar	Kadana	Panch Mahals
Kadana	Kadana	Panch Mahals
Chhatrapura	Kadana	Panch Mahals
Vagadiyana Pithapur	Kadana	Panch Mahals
Saliya Muvadi	Kadana	Panch Mahals
Kadva Bariyani Muvadi	Kadana	Panch Mahals
Divada	Kadana	Panch Mahals
Charanni Muvadi	Kadana	Panch Mahals
Balujina Muvada (Kadana)	Kadana	Panch Mahals
Nana Rajanpur	Kadana	Panch Mahals
Mota Rajanpur	Kadana	Panch Mahals
Thakor Na Nadhra	Kadana	Panch Mahals
Paniya	Kadana	Panch Mahals
Saliyabid	Kadana	Panch Mahals
Mankudi	Kadana	Panch Mahals
Sanghri	Kadana	Panch Mahals
Dodiya (Math)	Kadana	Panch Mahals
Math (Dodiya)	Kadana	Panch Mahals
Mal	Kadana	Panch Mahals
Chopad Devi	Kadana	Panch Mahals
Anoppur	Kadana	Panch Mahals
Luharna Muvada	Kadana	Panch Mahals
Godha Ni Muvadi	Kadana	Panch Mahals
Brahmanni Muvadi(Kadana)	Kadana	Panch Mahals
Kureta	Kadana	Panch Mahals
Golanpur	Kadana	Panch Mahals
Hathi Ranani Muvadi	Kadana	Panch Mahals
Daduni Muvadi	Kadana	Panch Mahals
Limbhola	Kadana	Panch Mahals
Parvatpura	Kadana	Panch Mahals
Bariyana Vanta	Kadana	Panch Mahals
Nana Machhiwada	Kadana	Panch Mahals
Nana Dharola	Kadana	Panch Mahals
Mota Dharola	Kadana	Panch Mahals
Kajli	Kadana	Panch Mahals
Bhemani Vav	Kadana	Panch Mahals
Zenzwa	Kadana	Panch Mahals
Lembani Vav	Kadana	Panch Mahals
Ladpur	Kadana	Panch Mahals
Vada Zampa	Kadana	Panch Mahals
Mota Machhiwada	Kadana	Panch Mahals
Vaghotiya	Kadana	Panch Mahals
Dolatpura	Kadana	Panch Mahals
Mahapur	Kadana	Panch Mahals
Maruwada	Kadana	Panch Mahals
Natthuni Muvadi	Kadana	Panch Mahals
Umariya	Kadana	Panch Mahals
Kelamul	Kadana	Panch Mahals
Renganiya	Kadana	Panch Mahals
Samatwada	Kadana	Panch Mahals
Bhukhi	Kadana	Panch Mahals
Pankhan	Kadana	Panch Mahals
Rughanathpura	Kadana	Panch Mahals
Malvan	Kadana	Panch Mahals
Nava Muvada	Kadana	Panch Mahals
Dhuniya	Kadana	Panch Mahals
Shiyal	Kadana	Panch Mahals
Ghanta Vadiya (West)	Kadana	Panch Mahals
Goriyana Muvada	Kadana	Panch Mahals
Brahmanni Muvadi (Malvan)	Kadana	Panch Mahals
Budhpur	Kadana	Panch Mahals
Chhala Pagina Muvada	Kadana	Panch Mahals
Ghantawada	Kadana	Panch Mahals
Nani Kharsoli	Kadana	Panch Mahals
Lapania	Kadana	Panch Mahals
Dahyapur	Kadana	Panch Mahals
Dhansura	Kadana	Panch Mahals
Mota Sagavadiya	Kadana	Panch Mahals
Math (Kotal )	Kadana	Panch Mahals
Kanawada	Kadana	Panch Mahals
Chandri	Kadana	Panch Mahals
Nani Vareth	Kadana	Panch Mahals
Moti Vareth	Kadana	Panch Mahals
Vaghadiyani Andhari	Kadana	Panch Mahals
Chitva	Santrampur	Panch Mahals
Bugad	Santrampur	Panch Mahals
Bugadna Muvada	Santrampur	Panch Mahals
Kanzara (Sant)	Santrampur	Panch Mahals
Vyar	Santrampur	Panch Mahals
Paniyar	Santrampur	Panch Mahals
Bhana Simal	Santrampur	Panch Mahals
Khedaya Alias Pratapgadh	Santrampur	Panch Mahals
Kunda	Santrampur	Panch Mahals
Bhamari	Santrampur	Panch Mahals
Simaliya	Santrampur	Panch Mahals
Sarad	Santrampur	Panch Mahals
Kotra	Santrampur	Panch Mahals
Moti Kyar	Santrampur	Panch Mahals
Nani Kyar	Santrampur	Panch Mahals
Kyariya	Santrampur	Panch Mahals
Taladra	Santrampur	Panch Mahals
Pithapur (Borvada)	Santrampur	Panch Mahals
Nalai	Santrampur	Panch Mahals
Timbla	Santrampur	Panch Mahals
Bhandara	Santrampur	Panch Mahals
Batakwada	Santrampur	Panch Mahals
Molara	Santrampur	Panch Mahals
Ukhreli	Santrampur	Panch Mahals
Daliyati	Santrampur	Panch Mahals
Bhenadra	Santrampur	Panch Mahals
Sagvadiya (Sant)	Santrampur	Panch Mahals
Kanjara (Sant)	Santrampur	Panch Mahals
Barikota	Santrampur	Panch Mahals
Pancha Muvadi	Santrampur	Panch Mahals
Metana Muvada	Santrampur	Panch Mahals
Dotawada	Santrampur	Panch Mahals
Surpur	Santrampur	Panch Mahals
Mota Sarnaiya	Santrampur	Panch Mahals
Babrol	Santrampur	Panch Mahals
Gada	Santrampur	Panch Mahals
Sangawada	Santrampur	Panch Mahals
Vadiya	Santrampur	Panch Mahals
Kasalpur	Santrampur	Panch Mahals
Endra	Santrampur	Panch Mahals
Moti Kharsoli	Santrampur	Panch Mahals
Vanta (Mahetana)	Santrampur	Panch Mahals
Vavia Muvada	Santrampur	Panch Mahals
Kasiya	Santrampur	Panch Mahals
Asivada	Santrampur	Panch Mahals
Chela Pagina Muvada	Santrampur	Panch Mahals
Gala Talawadi	Santrampur	Panch Mahals
Gamdi	Santrampur	Panch Mahals
Pagina Muvada	Santrampur	Panch Mahals
Kothina Muvada	Santrampur	Panch Mahals
Movasa	Santrampur	Panch Mahals
Bavana Saliya	Santrampur	Panch Mahals
Dahela	Santrampur	Panch Mahals
Bhotva (West)	Santrampur	Panch Mahals
Limada Muvadi	Santrampur	Panch Mahals
Ranijini Padedi	Santrampur	Panch Mahals
Lalakpur	Santrampur	Panch Mahals
Garadiya	Santrampur	Panch Mahals
Malanpur	Santrampur	Panch Mahals
Nana Natva	Santrampur	Panch Mahals
Sada	Santrampur	Panch Mahals
Babrai	Santrampur	Panch Mahals
Hirapura	Santrampur	Panch Mahals
Vanjiya Khunt	Santrampur	Panch Mahals
Narsingpur	Santrampur	Panch Mahals
Timbharva	Santrampur	Panch Mahals
Rampur (Sant)	Santrampur	Panch Mahals
Zab (West)	Santrampur	Panch Mahals
Hadani Sarsan	Santrampur	Panch Mahals
Moti Sarsan	Santrampur	Panch Mahals
Ranani Sarsan	Santrampur	Panch Mahals
Chhayan	Santrampur	Panch Mahals
Savgadh	Santrampur	Panch Mahals
Boidiya	Santrampur	Panch Mahals
Guvaliya	Santrampur	Panch Mahals
Galaliya	Santrampur	Panch Mahals
Sandh Paliya	Santrampur	Panch Mahals
Thambha	Santrampur	Panch Mahals
Mankodiya	Santrampur	Panch Mahals
Kalibel Navaghara	Santrampur	Panch Mahals
Kalibel	Santrampur	Panch Mahals
Padhariya	Santrampur	Panch Mahals
Nani Sarsan	Santrampur	Panch Mahals
Kanbina Moyla	Santrampur	Panch Mahals
Godhar (West)	Santrampur	Panch Mahals
Chunthana Muvada	Santrampur	Panch Mahals
Manchod	Santrampur	Panch Mahals
Rafai	Santrampur	Panch Mahals
Bahediya	Santrampur	Panch Mahals
Nasikpur	Santrampur	Panch Mahals
Barela	Santrampur	Panch Mahals
Moyala Pad	Santrampur	Panch Mahals
Vaghan	Santrampur	Panch Mahals
Dhamotna Moyla	Santrampur	Panch Mahals
Andarsing Na Muvada	Santrampur	Panch Mahals
Gothibda	Santrampur	Panch Mahals
Kosamba	Santrampur	Panch Mahals
Benada	Santrampur	Panch Mahals
Hathipura	Santrampur	Panch Mahals
Nesh Hathipura	Santrampur	Panch Mahals
Gothib	Santrampur	Panch Mahals
Nana Ambela	Santrampur	Panch Mahals
Mota Ambela	Santrampur	Panch Mahals
Galakhedi	Santrampur	Panch Mahals
Bhavanpura	Santrampur	Panch Mahals
Parthampur	Santrampur	Panch Mahals
Kherva	Santrampur	Panch Mahals
Padedi Ador	Santrampur	Panch Mahals
Kotvat	Santrampur	Panch Mahals
Khodadra	Santrampur	Panch Mahals
Falwa	Santrampur	Panch Mahals
Anjanwa	Santrampur	Panch Mahals
Charada	Santrampur	Panch Mahals
Vaghfal	Santrampur	Panch Mahals
Nan Salai	Santrampur	Panch Mahals
Rambhemna Muvada	Santrampur	Panch Mahals
Panchmuva	Santrampur	Panch Mahals
Vankdi	Santrampur	Panch Mahals
Vandariya (West)	Santrampur	Panch Mahals
Kenpur	Santrampur	Panch Mahals
Singalgadh	Santrampur	Panch Mahals
Valakhedi	Santrampur	Panch Mahals
Rayaniya	Santrampur	Panch Mahals
Ratanpur (Gothib)	Santrampur	Panch Mahals
Kaliya Amba	Santrampur	Panch Mahals
Bhotva (East)	Santrampur	Panch Mahals
Kaduchi	Santrampur	Panch Mahals
Janvad	Santrampur	Panch Mahals
Ranela	Santrampur	Panch Mahals
Sanbar	Santrampur	Panch Mahals
Umber	Santrampur	Panch Mahals
Shir	Santrampur	Panch Mahals
Motirel (West)	Santrampur	Panch Mahals
Vena	Santrampur	Panch Mahals
Ora	Santrampur	Panch Mahals
Jotangiya	Santrampur	Panch Mahals
Ambaliyat	Santrampur	Panch Mahals
Satkunda	Santrampur	Panch Mahals
Sarasva (West)	Santrampur	Panch Mahals
Nanirel (West)	Santrampur	Panch Mahals
Doli	Santrampur	Panch Mahals
Gadiya	Santrampur	Panch Mahals
Babri	Santrampur	Panch Mahals
Sukatimba	Santrampur	Panch Mahals
Moralnaka	Santrampur	Panch Mahals
Chinchani	Santrampur	Panch Mahals
Moti Bhugedi	Santrampur	Panch Mahals
Nani Bhugedi	Santrampur	Panch Mahals
Sagan Faliya	Santrampur	Panch Mahals
Amba	Santrampur	Panch Mahals
Jaldada	Santrampur	Panch Mahals
Limdi	Santrampur	Panch Mahals
Hadana Muvada	Lunawada	Panch Mahals
Ghantiada	Lunawada	Panch Mahals
Mota Vadadla	Lunawada	Panch Mahals
Hindoliya	Lunawada	Panch Mahals
Mahudiya	Lunawada	Panch Mahals
Dolatpura	Lunawada	Panch Mahals
Vaghji Bariyana Muvada	Lunawada	Panch Mahals
Padedi (Malekpur)	Lunawada	Panch Mahals
Malekpur	Lunawada	Panch Mahals
Govindpura	Lunawada	Panch Mahals
Zarakhvada	Lunawada	Panch Mahals
Manajina Muvada	Lunawada	Panch Mahals
Semarana Muvada (Haveli)	Lunawada	Panch Mahals
Nana Vadadala	Lunawada	Panch Mahals
Simalia	Lunawada	Panch Mahals
Sada	Lunawada	Panch Mahals
Rampur	Lunawada	Panch Mahals
Vechatana Muvada	Lunawada	Panch Mahals
Soniyana Muvada	Lunawada	Panch Mahals
Hadmatiya (Lunawada)	Lunawada	Panch Mahals
Bhulakhantna Muvada	Lunawada	Panch Mahals
Khundhi	Lunawada	Panch Mahals
Gangadiya	Lunawada	Panch Mahals
Savdasna Muvada	Lunawada	Panch Mahals
Gokalpura (M)	Lunawada	Panch Mahals
Vaniyavala Gorada	Lunawada	Panch Mahals
Padedi (Rampur)	Lunawada	Panch Mahals
Rajgadh	Lunawada	Panch Mahals
Taktajina Palla	Lunawada	Panch Mahals
Golana Palla	Lunawada	Panch Mahals
Chuvanana Muvada (Madhvas)	Lunawada	Panch Mahals
Patapur(Madhvas)AliasMotiZardi	Lunawada	Panch Mahals
Madhvas	Lunawada	Panch Mahals
Limbodara	Lunawada	Panch Mahals
Shero	Lunawada	Panch Mahals
Bhamra	Lunawada	Panch Mahals
Kolwan	Lunawada	Panch Mahals
Chhapri Muvada	Lunawada	Panch Mahals
Gariya	Lunawada	Panch Mahals
Hadod	Lunawada	Panch Mahals
Khantana Bhensadavada	Lunawada	Panch Mahals
Gohilna Muvada	Lunawada	Panch Mahals
Bharthajini Muvadi	Lunawada	Panch Mahals
Charanna Bhensavada	Lunawada	Panch Mahals
Kakana Bhensavada	Lunawada	Panch Mahals
Sajjanpur	Lunawada	Panch Mahals
Taralana Muvada	Lunawada	Panch Mahals
Napaniya	Lunawada	Panch Mahals
Vadi	Lunawada	Panch Mahals
Ranpur	Lunawada	Panch Mahals
Navagam(M)	Lunawada	Panch Mahals
Nani Palli	Lunawada	Panch Mahals
Daljina Chakalia	Lunawada	Panch Mahals
Jivanjina Chhapora	Lunawada	Panch Mahals
Senadaria Gorada	Lunawada	Panch Mahals
Sutari	Lunawada	Panch Mahals
Gadhvina Gorada	Lunawada	Panch Mahals
Juna Gorada	Lunawada	Panch Mahals
Vadina Gorada	Lunawada	Panch Mahals
Budhbhaina Chhapora	Lunawada	Panch Mahals
Moti Palli	Lunawada	Panch Mahals
Vaghela	Lunawada	Panch Mahals
Ankalwa	Lunawada	Panch Mahals
Vadi Udafa	Lunawada	Panch Mahals
Mota Sonela	Lunawada	Panch Mahals
Nana Sonela	Lunawada	Panch Mahals
Barotana Muvada	Lunawada	Panch Mahals
Pavapur	Lunawada	Panch Mahals
Hardaspur	Lunawada	Panch Mahals
Parampur	Lunawada	Panch Mahals
Kanela	Lunawada	Panch Mahals
Salawada	Lunawada	Panch Mahals
Charangam (Salawada)	Lunawada	Panch Mahals
Undra	Lunawada	Panch Mahals
Kanjav	Lunawada	Panch Mahals
Lalsar	Lunawada	Panch Mahals
Chori	Lunawada	Panch Mahals
Dhamod	Lunawada	Panch Mahals
Khempur	Lunawada	Panch Mahals
Zufarali	Lunawada	Panch Mahals
Denta	Lunawada	Panch Mahals
Mochivadiya	Lunawada	Panch Mahals
Sadhakpur	Lunawada	Panch Mahals
Morai	Lunawada	Panch Mahals
Kidia	Lunawada	Panch Mahals
Vakhatpur (Kidiya)	Lunawada	Panch Mahals
Ucharpi	Lunawada	Panch Mahals
Untadi	Lunawada	Panch Mahals
Hanseliya	Lunawada	Panch Mahals
Bhalada	Lunawada	Panch Mahals
Kaslal	Lunawada	Panch Mahals
Daniya	Lunawada	Panch Mahals
Pattan	Lunawada	Panch Mahals
Chandpur	Lunawada	Panch Mahals
Godariya	Lunawada	Panch Mahals
Gadhanpur	Lunawada	Panch Mahals
Koliyani Muvadi	Lunawada	Panch Mahals
Semrana Muvada(Vardhari)	Lunawada	Panch Mahals
Maliya	Lunawada	Panch Mahals
Juna Kalava	Lunawada	Panch Mahals
Dalukhadiya	Lunawada	Panch Mahals
Savarana Muvada	Lunawada	Panch Mahals
Salera	Lunawada	Panch Mahals
Chauhan na Muvada(Salera)	Lunawada	Panch Mahals
Kachhotiyana Muvada	Lunawada	Panch Mahals
Chavdana Muvada	Lunawada	Panch Mahals
Kantha	Lunawada	Panch Mahals
Aritha	Lunawada	Panch Mahals
Shamana	Lunawada	Panch Mahals
Chavdibaina Muvada	Lunawada	Panch Mahals
Sonesariya Math	Lunawada	Panch Mahals
Mehtana Chakaliya	Lunawada	Panch Mahals
Tankana Muvada	Lunawada	Panch Mahals
Mor Mahudi	Lunawada	Panch Mahals
Tochna Gorada	Lunawada	Panch Mahals
Fatajina Gorada	Lunawada	Panch Mahals
Saragwa Mahudi-1	Lunawada	Panch Mahals
Chataka Beli	Lunawada	Panch Mahals
Saudasni Muvadi	Lunawada	Panch Mahals
Mota Vadodar	Lunawada	Panch Mahals
Nanadavena Muvada	Lunawada	Panch Mahals
Sagana Muvada Alias SaragwaMahudi-2	Lunawada	Panch Mahals
Nana Vadodar	Lunawada	Panch Mahals
Arithi	Lunawada	Panch Mahals
Moti Denavad	Lunawada	Panch Mahals
Nani Denavad	Lunawada	Panch Mahals
Chavadiya	Lunawada	Panch Mahals
Tanachhia	Lunawada	Panch Mahals
Dholi	Lunawada	Panch Mahals
Vanta	Lunawada	Panch Mahals
Pagiyawad	Lunawada	Panch Mahals
Kakachiya	Lunawada	Panch Mahals
Champeli	Lunawada	Panch Mahals
Jitpur	Lunawada	Panch Mahals
Ved	Lunawada	Panch Mahals
Bhuval	Lunawada	Panch Mahals
Lakdi Poyda	Lunawada	Panch Mahals
Kalyanpura	Lunawada	Panch Mahals
Kadachhala	Lunawada	Panch Mahals
Chapatiya	Lunawada	Panch Mahals
Chhapri-2 (Vardhari)	Lunawada	Panch Mahals
Bhimpur	Lunawada	Panch Mahals
Vardhari	Lunawada	Panch Mahals
Dhesiya	Lunawada	Panch Mahals
Dalwai Savali	Lunawada	Panch Mahals
Tarnocha	Lunawada	Panch Mahals
Panch Mahudi	Lunawada	Panch Mahals
Jhara	Lunawada	Panch Mahals
Jagapagina Muvada	Lunawada	Panch Mahals
Nalna Muvada	Lunawada	Panch Mahals
Dokelav	Lunawada	Panch Mahals
Panam Palla	Lunawada	Panch Mahals
Mota Dokva	Lunawada	Panch Mahals
Moti Ghoda	Lunawada	Panch Mahals
Ambli Muvada	Lunawada	Panch Mahals
Dokaliyani Muvadi	Lunawada	Panch Mahals
Moti Charel	Lunawada	Panch Mahals
Pankhi	Lunawada	Panch Mahals
Nani Charel	Lunawada	Panch Mahals
Jesingpur	Lunawada	Panch Mahals
Karna Bariana Muvada	Lunawada	Panch Mahals
Ukedi	Lunawada	Panch Mahals
Rampatelna Muvada	Lunawada	Panch Mahals
Godna Muvada	Lunawada	Panch Mahals
Moti Zanzari	Lunawada	Panch Mahals
Nani Zanzari	Lunawada	Panch Mahals
Chandsar	Lunawada	Panch Mahals
Ghantav-1	Lunawada	Panch Mahals
Chopda	Lunawada	Panch Mahals
Nana Dokva	Lunawada	Panch Mahals
Sabalpur	Lunawada	Panch Mahals
Bhanpur	Lunawada	Panch Mahals
Kakana Chamariya	Lunawada	Panch Mahals
Sarkari Chamariya	Lunawada	Panch Mahals
Gokalpura(Ko)	Lunawada	Panch Mahals
Bhadakha	Lunawada	Panch Mahals
Verama	Lunawada	Panch Mahals
Haripura	Lunawada	Panch Mahals
Hadmatiya	Lunawada	Panch Mahals
Agarwada	Lunawada	Panch Mahals
Charangam (Namnar)	Lunawada	Panch Mahals
Namnar	Lunawada	Panch Mahals
Motipura(Vardhari)	Lunawada	Panch Mahals
Rabadiya	Lunawada	Panch Mahals
Jamana Muvada	Lunawada	Panch Mahals
Thana Savali	Lunawada	Panch Mahals
Valinath	Lunawada	Panch Mahals
Ladvel	Lunawada	Panch Mahals
Kunda	Lunawada	Panch Mahals
Khalaspur	Lunawada	Panch Mahals
Bamanwad	Lunawada	Panch Mahals
Viraniya	Lunawada	Panch Mahals
Sova	Lunawada	Panch Mahals
Bhaiyasar	Lunawada	Panch Mahals
Medajina Muvada	Lunawada	Panch Mahals
Nava Muvada	Lunawada	Panch Mahals
Khoda Amba	Lunawada	Panch Mahals
Sattalav	Lunawada	Panch Mahals
Juna Muvada	Lunawada	Panch Mahals
Ramavata	Lunawada	Panch Mahals
Vaviya Muvada	Lunawada	Panch Mahals
Bhatpur	Lunawada	Panch Mahals
Juni Singanali	Lunawada	Panch Mahals
Kantar	Lunawada	Panch Mahals
Jesola	Lunawada	Panch Mahals
Maliya Muvada	Lunawada	Panch Mahals
Khantana Muvada	Lunawada	Panch Mahals
Joshiona Muvada	Lunawada	Panch Mahals
Kothamba Palla	Lunawada	Panch Mahals
Guvaliya	Lunawada	Panch Mahals
Fatepura	Lunawada	Panch Mahals
Kharol	Lunawada	Panch Mahals
Rambariyana Muvada	Lunawada	Panch Mahals
Bhoja	Lunawada	Panch Mahals
Kothamba	Lunawada	Panch Mahals
Helkaledi	Lunawada	Panch Mahals
Kamalpur	Lunawada	Panch Mahals
Chhalabariana Muvada	Lunawada	Panch Mahals
Bediya	Lunawada	Panch Mahals
Navi Singanali	Lunawada	Panch Mahals
Jokha	Lunawada	Panch Mahals
Gugta	Lunawada	Panch Mahals
Shivrajpur	Lunawada	Panch Mahals
Kel	Lunawada	Panch Mahals
Dezar	Lunawada	Panch Mahals
Vaghoi	Lunawada	Panch Mahals
Chuladiya	Lunawada	Panch Mahals
Jetharibor	Lunawada	Panch Mahals
Gadh	Lunawada	Panch Mahals
Timba	Lunawada	Panch Mahals
Makhaliya	Lunawada	Panch Mahals
Dhamaniya	Lunawada	Panch Mahals
Kauchia	Lunawada	Panch Mahals
Tentoi	Lunawada	Panch Mahals
Erandana Muvada	Lunawada	Panch Mahals
Vantana Muvada	Lunawada	Panch Mahals
Kankaliya	Lunawada	Panch Mahals
Hathivan	Lunawada	Panch Mahals
Jhaidi	Lunawada	Panch Mahals
Sevaliya	Lunawada	Panch Mahals
Gugaliya	Lunawada	Panch Mahals
Simlet	Lunawada	Panch Mahals
Vahaka	Shehera	Panch Mahals
Bordi	Shehera	Panch Mahals
Bilitha	Shehera	Panch Mahals
Bhimthal	Shehera	Panch Mahals
Dharapur	Shehera	Panch Mahals
Guneli	Shehera	Panch Mahals
Bodidra khurd	Shehera	Panch Mahals
Sambhali	Shehera	Panch Mahals
Jalam Bariana Muvada	Shehera	Panch Mahals
Gaman Bariana Muvada	Shehera	Panch Mahals
Bhotava	Shehera	Panch Mahals
Boriya	Shehera	Panch Mahals
Khuntkhar	Shehera	Panch Mahals
Balujina Muvada (West)	Shehera	Panch Mahals
Ramjini Nal	Shehera	Panch Mahals
Undara	Shehera	Panch Mahals
Mor	Shehera	Panch Mahals
Kotha	Shehera	Panch Mahals
Juna Kheda	Shehera	Panch Mahals
Chari	Shehera	Panch Mahals
Asundariya	Shehera	Panch Mahals
Shekhpur	Shehera	Panch Mahals
Hanselav	Shehera	Panch Mahals
Vanta Vachhoda	Shehera	Panch Mahals
Mithapur	Shehera	Panch Mahals
Dhayaka	Shehera	Panch Mahals
Sadara	Shehera	Panch Mahals
Kharoli	Shehera	Panch Mahals
Nathujina Muvada	Shehera	Panch Mahals
Poyada	Shehera	Panch Mahals
Tarsanag	Shehera	Panch Mahals
Aniad	Shehera	Panch Mahals
Kharediya	Shehera	Panch Mahals
Palikhanda	Shehera	Panch Mahals
Hansapur	Shehera	Panch Mahals
Bhadrala	Shehera	Panch Mahals
Labhi	Shehera	Panch Mahals
Sadanpur	Shehera	Panch Mahals
Khatukpur	Shehera	Panch Mahals
Sagrada	Shehera	Panch Mahals
Chhogala	Shehera	Panch Mahals
Bhunidra	Shehera	Panch Mahals
Mahelan	Shehera	Panch Mahals
Sajivav	Shehera	Panch Mahals
Mirapur	Shehera	Panch Mahals
Gangadiya	Shehera	Panch Mahals
Nandarva	Shehera	Panch Mahals
Dhandhalpur	Shehera	Panch Mahals
Sureli	Shehera	Panch Mahals
Bhensal	Shehera	Panch Mahals
Zoz	Shehera	Panch Mahals
Varial	Shehera	Panch Mahals
Bamroli Bujarg	Shehera	Panch Mahals
Narsana	Shehera	Panch Mahals
Chhanip	Shehera	Panch Mahals
Morva	Shehera	Panch Mahals
Gokulpur	Shehera	Panch Mahals
Vadi	Shehera	Panch Mahals
Vallavpur	Shehera	Panch Mahals
Ujada	Shehera	Panch Mahals
Bhurkhal	Shehera	Panch Mahals
Bhatna Muvada	Shehera	Panch Mahals
Rena	Shehera	Panch Mahals
Limbodra	Shehera	Panch Mahals
Demli	Shehera	Panch Mahals
Tadava	Shehera	Panch Mahals
Dalvada	Shehera	Panch Mahals
Vijapur	Shehera	Panch Mahals
Mangaliana	Shehera	Panch Mahals
Mangalpur	Shehera	Panch Mahals
Chopda Khurd	Shehera	Panch Mahals
Khojalvasa	Shehera	Panch Mahals
Boriavi	Shehera	Panch Mahals
Nada	Shehera	Panch Mahals
Saradiya	Shehera	Panch Mahals
Matariya Vyas	Shehera	Panch Mahals
Padardi	Shehera	Panch Mahals
Navagam	Shehera	Panch Mahals
Dokva	Shehera	Panch Mahals
Umarpur	Shehera	Panch Mahals
Ambajati	Shehera	Panch Mahals
Bahi	Shehera	Panch Mahals
Khandiya	Shehera	Panch Mahals
Mithali	Shehera	Panch Mahals
Pasnal	Shehera	Panch Mahals
Dharola Khurd	Shehera	Panch Mahals
Dhamai	Shehera	Panch Mahals
Chalali	Shehera	Panch Mahals
Dhamnod	Shehera	Panch Mahals
Waghjipur	Shehera	Panch Mahals
Dumelav	Shehera	Panch Mahals
Hareda	Morwa (Hadaf)	Panch Mahals
Ratanpur (Metral)	Morwa (Hadaf)	Panch Mahals
Khatva	Morwa (Hadaf)	Panch Mahals
Vaneda	Morwa (Hadaf)	Panch Mahals
Chopada Khurd	Morwa (Hadaf)	Panch Mahals
Chopada Bujarg	Morwa (Hadaf)	Panch Mahals
Bhatha	Morwa (Hadaf)	Panch Mahals
Metral	Morwa (Hadaf)	Panch Mahals
Bhuwar	Morwa (Hadaf)	Panch Mahals
Valaiya	Morwa (Hadaf)	Panch Mahals
Viraniya	Morwa (Hadaf)	Panch Mahals
Alu	Morwa (Hadaf)	Panch Mahals
Mora	Morwa (Hadaf)	Panch Mahals
Suliyat	Morwa (Hadaf)	Panch Mahals
Deloch	Morwa (Hadaf)	Panch Mahals
Sagwada	Morwa (Hadaf)	Panch Mahals
Gajipur	Morwa (Hadaf)	Panch Mahals
Agarwada	Morwa (Hadaf)	Panch Mahals
Rajayata	Morwa (Hadaf)	Panch Mahals
Navagam	Morwa (Hadaf)	Panch Mahals
Bhandoi	Morwa (Hadaf)	Panch Mahals
Bilwaniya	Morwa (Hadaf)	Panch Mahals
Vandeli	Morwa (Hadaf)	Panch Mahals
Tajpuri	Morwa (Hadaf)	Panch Mahals
Mekhar	Morwa (Hadaf)	Panch Mahals
Bamana	Morwa (Hadaf)	Panch Mahals
Vadodar	Morwa (Hadaf)	Panch Mahals
Vansdeliya	Morwa (Hadaf)	Panch Mahals
Khudra	Morwa (Hadaf)	Panch Mahals
Chandpur	Morwa (Hadaf)	Panch Mahals
Khanpur	Morwa (Hadaf)	Panch Mahals
Kadadra	Morwa (Hadaf)	Panch Mahals
Kelod	Morwa (Hadaf)	Panch Mahals
Naglod	Morwa (Hadaf)	Panch Mahals
Morwa (Hadaf)	Morwa (Hadaf)	Panch Mahals
Parabiya	Morwa (Hadaf)	Panch Mahals
Kuwajar	Morwa (Hadaf)	Panch Mahals
Balukhedi	Morwa (Hadaf)	Panch Mahals
Ganesh Muvadi	Morwa (Hadaf)	Panch Mahals
Rampur (Kasanpur)	Morwa (Hadaf)	Panch Mahals
Dangariya	Morwa (Hadaf)	Panch Mahals
Matariya Vejma	Morwa (Hadaf)	Panch Mahals
Vejma	Morwa (Hadaf)	Panch Mahals
Mojari	Morwa (Hadaf)	Panch Mahals
Kasanpur	Morwa (Hadaf)	Panch Mahals
Rasulpur	Morwa (Hadaf)	Panch Mahals
Matariya Vadi	Morwa (Hadaf)	Panch Mahals
Natapur	Morwa (Hadaf)	Panch Mahals
Saliya	Morwa (Hadaf)	Panch Mahals
Khabda	Morwa (Hadaf)	Panch Mahals
Pathanpur	Morwa (Hadaf)	Panch Mahals
Nasirpur (Metral)	Morwa (Hadaf)	Panch Mahals
Nadisar	Godhra	Panch Mahals
Khajuri (Nandisar)	Godhra	Panch Mahals
Odidra	Godhra	Panch Mahals
Jaliya	Godhra	Panch Mahals
Dhanitra	Godhra	Panch Mahals
Rinchhrota	Godhra	Panch Mahals
Motal	Godhra	Panch Mahals
Sampa	Godhra	Panch Mahals
Bakhkhar	Godhra	Panch Mahals
Tarvadi	Godhra	Panch Mahals
Chhavad	Godhra	Panch Mahals
Pipaliya	Godhra	Panch Mahals
Bodidra Bujarg	Godhra	Panch Mahals
Dholi	Godhra	Panch Mahals
Vansiya	Godhra	Panch Mahals
Khajuri Sampa	Godhra	Panch Mahals
Mor Dungara	Godhra	Panch Mahals
Nasirpur	Godhra	Panch Mahals
Chhabanpur	Godhra	Panch Mahals
Samli	Godhra	Panch Mahals
Karsana	Godhra	Panch Mahals
Velvad	Godhra	Panch Mahals
Ichhapaginu Muvadu	Godhra	Panch Mahals
Ratanpur (Kantdi)	Godhra	Panch Mahals
Kabirpur	Godhra	Panch Mahals
Kabariya	Godhra	Panch Mahals
Juni Dhari	Godhra	Panch Mahals
Timba	Godhra	Panch Mahals
Gotavipura	Godhra	Panch Mahals
Pipaliya (Dhari)	Godhra	Panch Mahals
Moryo	Godhra	Panch Mahals
Kankanpur	Godhra	Panch Mahals
Padhiyar	Godhra	Panch Mahals
Vinzol	Godhra	Panch Mahals
Daruniya	Godhra	Panch Mahals
Dhanol(Jangle)	Godhra	Panch Mahals
Govindi	Godhra	Panch Mahals
Kanku Thambhla	Godhra	Panch Mahals
Chanchopa	Godhra	Panch Mahals
Kanajiya	Godhra	Panch Mahals
Orwada	Godhra	Panch Mahals
Kevadiya	Godhra	Panch Mahals
Chanchelav	Godhra	Panch Mahals
Erandi	Godhra	Panch Mahals
Kotda	Godhra	Panch Mahals
Bhamaiya	Godhra	Panch Mahals
Pandva	Godhra	Panch Mahals
Betiya	Godhra	Panch Mahals
Vavadi Khurd	Godhra	Panch Mahals
Veganpur	Godhra	Panch Mahals
Tuwa	Godhra	Panch Mahals
Moti Kantdi	Godhra	Panch Mahals
Gothada	Godhra	Panch Mahals
Gusar	Godhra	Panch Mahals
Goli	Godhra	Panch Mahals
Bhima	Godhra	Panch Mahals
Gavasi	Godhra	Panch Mahals
Harkundi	Godhra	Panch Mahals
Ambali	Godhra	Panch Mahals
Paravdi	Godhra	Panch Mahals
Chundadi	Godhra	Panch Mahals
Gadh	Godhra	Panch Mahals
Ladpur	Godhra	Panch Mahals
Vadelav	Godhra	Panch Mahals
Bhamaiya	Godhra	Panch Mahals
Sankali	Godhra	Panch Mahals
Angaliya	Godhra	Panch Mahals
Bamroli Khurd	Godhra	Panch Mahals
Gadukpur	Godhra	Panch Mahals
Dayal	Godhra	Panch Mahals
Lilesara	Godhra	Panch Mahals
Chikhodra	Godhra	Panch Mahals
Hamirpur	Godhra	Panch Mahals
Rupanpura	Godhra	Panch Mahals
Nani Kantadi	Godhra	Panch Mahals
Raisingpura	Godhra	Panch Mahals
Ranipura	Godhra	Panch Mahals
Chanchpur	Godhra	Panch Mahals
Ratanpur (Reliya)	Godhra	Panch Mahals
Kalyana	Godhra	Panch Mahals
Asardi	Godhra	Panch Mahals
Bhalodiya	Godhra	Panch Mahals
Reliya	Godhra	Panch Mahals
Ankadiya	Godhra	Panch Mahals
Veraiya	Godhra	Panch Mahals
Vatlav	Godhra	Panch Mahals
Tarboradi	Godhra	Panch Mahals
Pratappura	Godhra	Panch Mahals
Rampura (Jodka)	Godhra	Panch Mahals
Dhanol	Godhra	Panch Mahals
Isrodiya	Godhra	Panch Mahals
Mahelol	Godhra	Panch Mahals
Bhanpura	Godhra	Panch Mahals
Karanpura	Godhra	Panch Mahals
Popatpura	Godhra	Panch Mahals
Vanakpur	Godhra	Panch Mahals
Mahuliya	Godhra	Panch Mahals
Chhariya	Godhra	Panch Mahals
Kaliya Kuwa	Godhra	Panch Mahals
Sarsav	Godhra	Panch Mahals
Mirap	Godhra	Panch Mahals
Dahikot	Godhra	Panch Mahals
Gollav	Godhra	Panch Mahals
Rinchhiya	Godhra	Panch Mahals
Tajpur	Godhra	Panch Mahals
Thana Garjan	Godhra	Panch Mahals
Sarangpur	Godhra	Panch Mahals
Jitpura	Godhra	Panch Mahals
Bhalaniya	Godhra	Panch Mahals
Bhatpura	Godhra	Panch Mahals
Torna	Godhra	Panch Mahals
Ladupura	Godhra	Panch Mahals
Achhala	Godhra	Panch Mahals
Dayalkakara	Godhra	Panch Mahals
Sansoli	Kalol	Panch Mahals
Zerna Muvada	Kalol	Panch Mahals
Ambala	Kalol	Panch Mahals
Bhelidra	Kalol	Panch Mahals
Mokal	Kalol	Panch Mahals
Kanod	Kalol	Panch Mahals
Bhadroli Khurd	Kalol	Panch Mahals
Kalantra	Kalol	Panch Mahals
Chimanapura	Kalol	Panch Mahals
Nandarkha	Kalol	Panch Mahals
Rinichhia	Kalol	Panch Mahals
Karoli	Kalol	Panch Mahals
Chalali	Kalol	Panch Mahals
Navagam	Kalol	Panch Mahals
Vejalpur	Kalol	Panch Mahals
Kharasaliya	Kalol	Panch Mahals
Karada	Kalol	Panch Mahals
Bodidra	Kalol	Panch Mahals
Satamana	Kalol	Panch Mahals
Naranpura	Kalol	Panch Mahals
Jantral	Kalol	Panch Mahals
Khandoli	Kalol	Panch Mahals
Kanetiya	Kalol	Panch Mahals
Baletiya	Kalol	Panch Mahals
Pingali	Kalol	Panch Mahals
Jeli	Kalol	Panch Mahals
Nesda	Kalol	Panch Mahals
Khadki	Kalol	Panch Mahals
Bedhiya	Kalol	Panch Mahals
Sureli	Kalol	Panch Mahals
Ghusar	Kalol	Panch Mahals
Paruna	Kalol	Panch Mahals
Royan	Kalol	Panch Mahals
Fansi	Kalol	Panch Mahals
Chora dungri	Kalol	Panch Mahals
Alali	Kalol	Panch Mahals
Delol	Kalol	Panch Mahals
Khandeval	Kalol	Panch Mahals
Shamaldevi	Kalol	Panch Mahals
Derol	Kalol	Panch Mahals
Sama	Kalol	Panch Mahals
Bhadroli (Bujarg)	Kalol	Panch Mahals
Zardaka	Kalol	Panch Mahals
Palasa	Kalol	Panch Mahals
Ratanpura	Kalol	Panch Mahals
Bakrol	Kalol	Panch Mahals
Boru	Kalol	Panch Mahals
Katol	Kalol	Panch Mahals
Ghoda	Kalol	Panch Mahals
Kandach (Inami )	Kalol	Panch Mahals
Utarediya	Kalol	Panch Mahals
Rabod	Kalol	Panch Mahals
Devpura	Kalol	Panch Mahals
Vyasda	Kalol	Panch Mahals
Adadra	Kalol	Panch Mahals
Bhukhi	Kalol	Panch Mahals
Malav	Kalol	Panch Mahals
Alva	Kalol	Panch Mahals
Medapur	Kalol	Panch Mahals
Jetpur	Kalol	Panch Mahals
Alindra	Kalol	Panch Mahals
Barola	Kalol	Panch Mahals
Nevariya	Kalol	Panch Mahals
Madhvas	Kalol	Panch Mahals
Saliyav	Kalol	Panch Mahals
Varvada	Kalol	Panch Mahals
Eral	Kalol	Panch Mahals
Jorapura (Vangarva)	Ghoghamba	Panch Mahals
Vangarva	Ghoghamba	Panch Mahals
Shaniyada	Ghoghamba	Panch Mahals
Ranipura (Damavav)	Ghoghamba	Panch Mahals
Damavav	Ghoghamba	Panch Mahals
Khilodi	Ghoghamba	Panch Mahals
Rinchhwani	Ghoghamba	Panch Mahals
Albeta	Ghoghamba	Panch Mahals
Khan Patla	Ghoghamba	Panch Mahals
Sajora	Ghoghamba	Panch Mahals
Padedi	Ghoghamba	Panch Mahals
Simaliya	Ghoghamba	Panch Mahals
Jambuvaniya	Ghoghamba	Panch Mahals
Guneshiya	Ghoghamba	Panch Mahals
Kothayadi	Ghoghamba	Panch Mahals
Sherpura	Ghoghamba	Panch Mahals
Damanpura	Ghoghamba	Panch Mahals
Dantol	Ghoghamba	Panch Mahals
Bhilod	Ghoghamba	Panch Mahals
Gajipura (Kanpur)	Ghoghamba	Panch Mahals
Kantaveda	Ghoghamba	Panch Mahals
Bhojpura	Ghoghamba	Panch Mahals
Goya Sundal	Ghoghamba	Panch Mahals
Kothara	Ghoghamba	Panch Mahals
Vav kulli	Ghoghamba	Panch Mahals
Chathi	Ghoghamba	Panch Mahals
Bor	Ghoghamba	Panch Mahals
Chatha	Ghoghamba	Panch Mahals
Kantu	Ghoghamba	Panch Mahals
Malu	Ghoghamba	Panch Mahals
Kanpur	Ghoghamba	Panch Mahals
Navagam	Ghoghamba	Panch Mahals
Paroli	Ghoghamba	Panch Mahals
Vel Kotar	Ghoghamba	Panch Mahals
Kanbipalli	Ghoghamba	Panch Mahals
Jorapura (Davadra)	Ghoghamba	Panch Mahals
Davadra	Ghoghamba	Panch Mahals
Mulani Kapadi	Ghoghamba	Panch Mahals
Gajapura (Kantu)	Ghoghamba	Panch Mahals
Gundi	Ghoghamba	Panch Mahals
Khadpa	Ghoghamba	Panch Mahals
Gorada	Ghoghamba	Panch Mahals
Ambakhunt	Ghoghamba	Panch Mahals
Uncha Beda	Ghoghamba	Panch Mahals
Kharod	Ghoghamba	Panch Mahals
Boriya	Ghoghamba	Panch Mahals
Gamirpura	Ghoghamba	Panch Mahals
Math	Ghoghamba	Panch Mahals
Kumbhar Palli	Ghoghamba	Panch Mahals
Jagana Muvada	Ghoghamba	Panch Mahals
Lalpari	Ghoghamba	Panch Mahals
Farod	Ghoghamba	Panch Mahals
Valinath	Ghoghamba	Panch Mahals
Kharkhadi	Ghoghamba	Panch Mahals
Bhanpura	Ghoghamba	Panch Mahals
Ghoghamba	Ghoghamba	Panch Mahals
Goth	Ghoghamba	Panch Mahals
Rajgadh	Ghoghamba	Panch Mahals
Palla	Ghoghamba	Panch Mahals
Adepur	Ghoghamba	Panch Mahals
Gamani	Ghoghamba	Panch Mahals
Galibili	Ghoghamba	Panch Mahals
Godli	Ghoghamba	Panch Mahals
Vanskod	Ghoghamba	Panch Mahals
Nurapura	Ghoghamba	Panch Mahals
Ghogha	Ghoghamba	Panch Mahals
Zoz	Ghoghamba	Panch Mahals
Mol	Ghoghamba	Panch Mahals
Shamalkuva	Ghoghamba	Panch Mahals
Padhora	Ghoghamba	Panch Mahals
Savapura	Ghoghamba	Panch Mahals
Rayan Muvada	Ghoghamba	Panch Mahals
Jitpura	Ghoghamba	Panch Mahals
Nathkuva	Ghoghamba	Panch Mahals
Kankodakui	Ghoghamba	Panch Mahals
Chandra Nagar	Ghoghamba	Panch Mahals
Dudhapura	Ghoghamba	Panch Mahals
Dhaneshwar	Ghoghamba	Panch Mahals
Udva	Ghoghamba	Panch Mahals
Garmotiya	Ghoghamba	Panch Mahals
Labadadhara	Ghoghamba	Panch Mahals
Zinzari	Ghoghamba	Panch Mahals
Virapura	Ghoghamba	Panch Mahals
Ranjitnagar	Ghoghamba	Panch Mahals
Rinchhiya	Ghoghamba	Panch Mahals
Chelavada	Ghoghamba	Panch Mahals
Tadkundla	Ghoghamba	Panch Mahals
Kalsar	Ghoghamba	Panch Mahals
Zab (Vav)	Ghoghamba	Panch Mahals
Vav	Ghoghamba	Panch Mahals
Vankod	Ghoghamba	Panch Mahals
Bakrol	Ghoghamba	Panch Mahals
Nathpura	Ghoghamba	Panch Mahals
Sarasava	Ghoghamba	Panch Mahals
Poyali	Ghoghamba	Panch Mahals
Kahanpur	Ghoghamba	Panch Mahals
Muvala	Halol	Panch Mahals
Maghasar	Halol	Panch Mahals
Navaria	Halol	Panch Mahals
Maruva	Halol	Panch Mahals
Varsada (Govindpuri)	Halol	Panch Mahals
Arad	Halol	Panch Mahals
Muldhari	Halol	Panch Mahals
Tarkhanda	Halol	Panch Mahals
Chhabapura	Halol	Panch Mahals
Maswad	Halol	Panch Mahals
Sathrota	Halol	Panch Mahals
Kanjari (Part)	Halol	Panch Mahals
Chandrapura	Halol	Panch Mahals
Vitthalpura	Halol	Panch Mahals
Pratappura (Part)	Halol	Panch Mahals
Abhetwa	Halol	Panch Mahals
Intwadi	Halol	Panch Mahals
Zankhariya	Halol	Panch Mahals
Katadia	Halol	Panch Mahals
Rasulpur	Halol	Panch Mahals
Sultanpura	Halol	Panch Mahals
Gokalpura	Halol	Panch Mahals
Jepura	Halol	Panch Mahals
Mandvi	Halol	Panch Mahals
Timbi	Halol	Panch Mahals
Radhanpur	Halol	Panch Mahals
Sura Sultanpura	Halol	Panch Mahals
Jambudi	Halol	Panch Mahals
Rampura	Halol	Panch Mahals
Kota Maida	Halol	Panch Mahals
Baska	Halol	Panch Mahals
Nurpura	Halol	Panch Mahals
Gopipura	Halol	Panch Mahals
Champaner	Halol	Panch Mahals
Vadatalav	Halol	Panch Mahals
Moti Umarvan	Halol	Panch Mahals
Ved	Halol	Panch Mahals
Nani Umarvan	Halol	Panch Mahals
Dhinkva	Halol	Panch Mahals
Rayanvadia	Halol	Panch Mahals
Chhajdiwali	Halol	Panch Mahals
Ranipura	Halol	Panch Mahals
Chhatardivav	Halol	Panch Mahals
Jaliya Kuva	Halol	Panch Mahals
Navagam	Halol	Panch Mahals
Tajpura	Halol	Panch Mahals
Panelav	Halol	Panch Mahals
Amba Talav	Halol	Panch Mahals
Ujeti	Halol	Panch Mahals
Vanseti	Halol	Panch Mahals
Ghansar	Halol	Panch Mahals
Vav	Halol	Panch Mahals
Nathkuva	Halol	Panch Mahals
Kathola	Halol	Panch Mahals
Dhankuva	Halol	Panch Mahals
Kherap	Halol	Panch Mahals
Vavdi	Halol	Panch Mahals
Pandol	Halol	Panch Mahals
Talavdi	Halol	Panch Mahals
Dhariya	Halol	Panch Mahals
Kakalpur	Halol	Panch Mahals
Bamankuva	Halol	Panch Mahals
Palanpur	Halol	Panch Mahals
Kansarivav	Halol	Panch Mahals
Vankadia	Halol	Panch Mahals
Kakara Dungri	Halol	Panch Mahals
Hadabiya	Halol	Panch Mahals
Madar	Halol	Panch Mahals
Vintoj	Halol	Panch Mahals
Kadachala	Halol	Panch Mahals
Ambavadiya	Halol	Panch Mahals
Ravaliya	Halol	Panch Mahals
Gambhirpura	Halol	Panch Mahals
Mota Chadva	Halol	Panch Mahals
Amrapura	Halol	Panch Mahals
Kanteli	Halol	Panch Mahals
Shivrajpur	Halol	Panch Mahals
Bhat	Halol	Panch Mahals
Bapotiya	Halol	Panch Mahals
Bedhiyapura	Halol	Panch Mahals
Dabhan	Halol	Panch Mahals
Nana Chadva	Halol	Panch Mahals
Bhamariya	Halol	Panch Mahals
Khodiyar Pura	Halol	Panch Mahals
Hadamatia	Halol	Panch Mahals
Dholikui	Halol	Panch Mahals
Khareda	Halol	Panch Mahals
Takhatpura	Halol	Panch Mahals
Rameshra	Halol	Panch Mahals
Koprej	Halol	Panch Mahals
Bhagvanpura	Halol	Panch Mahals
Baliyadev	Halol	Panch Mahals
Ramjikhantna Muvada	Halol	Panch Mahals
Kesharpura	Halol	Panch Mahals
Kuberpura	Halol	Panch Mahals
Gariyal	Halol	Panch Mahals
Sudhara	Halol	Panch Mahals
Jimiyapura	Halol	Panch Mahals
Rinchhbar	Halol	Panch Mahals
Nani Ranbhet	Halol	Panch Mahals
Bhuva Dungri	Halol	Panch Mahals
Sonipur	Halol	Panch Mahals
Indral	Halol	Panch Mahals
Gajapura	Halol	Panch Mahals
Sonavinti	Halol	Panch Mahals
Gadit	Halol	Panch Mahals
Rasgagar	Halol	Panch Mahals
Badharpuri	Halol	Panch Mahals
Tadia	Halol	Panch Mahals
Mota Ankediya	Halol	Panch Mahals
Moti Ranbhet	Halol	Panch Mahals
Nana Handiya	Halol	Panch Mahals
Mota Handiya	Halol	Panch Mahals
Kohivav	Halol	Panch Mahals
Vaghbod	Halol	Panch Mahals
Galampura	Halol	Panch Mahals
Amrapuri	Halol	Panch Mahals
Desar	Halol	Panch Mahals
Panch Khobla	Halol	Panch Mahals
Singpur	Halol	Panch Mahals
Chhan Talavdi	Halol	Panch Mahals
Khareti	Halol	Panch Mahals
Bhinda	Halol	Panch Mahals
Ranjitpura	Jambughoda	Panch Mahals
Gondhra	Jambughoda	Panch Mahals
Poyali	Jambughoda	Panch Mahals
Dandiapura	Jambughoda	Panch Mahals
Zarva	Jambughoda	Panch Mahals
Chalvad	Jambughoda	Panch Mahals
Kohivav	Jambughoda	Panch Mahals
Borkach	Jambughoda	Panch Mahals
Bhuriya Kuva	Jambughoda	Panch Mahals
Vav	Jambughoda	Panch Mahals
Nizaran Faliya	Jambughoda	Panch Mahals
Nizaran Dilgam	Jambughoda	Panch Mahals
Vadek	Jambughoda	Panch Mahals
Jaban	Jambughoda	Panch Mahals
Mahudibor	Jambughoda	Panch Mahals
Malbar	Jambughoda	Panch Mahals
Narukot	Jambughoda	Panch Mahals
Hirapur	Jambughoda	Panch Mahals
Dipapura	Jambughoda	Panch Mahals
Garmula	Jambughoda	Panch Mahals
Vadiya	Jambughoda	Panch Mahals
Vajpur	Jambughoda	Panch Mahals
Udhavan	Jambughoda	Panch Mahals
Jotvad	Jambughoda	Panch Mahals
Nathpari	Jambughoda	Panch Mahals
Bhildungra	Jambughoda	Panch Mahals
Kanjipani	Jambughoda	Panch Mahals
Kara	Jambughoda	Panch Mahals
Rampura	Jambughoda	Panch Mahals
Kaliavav	Jambughoda	Panch Mahals
Jambughoda	Jambughoda	Panch Mahals
Kharedivav	Jambughoda	Panch Mahals
Fulpari	Jambughoda	Panch Mahals
Bhanpuri	Jambughoda	Panch Mahals
Bhanpura	Jambughoda	Panch Mahals
Khakhariya	Jambughoda	Panch Mahals
Sadada	Jambughoda	Panch Mahals
Dhanpuri	Jambughoda	Panch Mahals
Paniyara	Jambughoda	Panch Mahals
Katkoi	Jambughoda	Panch Mahals
Pipiya	Jambughoda	Panch Mahals
Keva	Jambughoda	Panch Mahals
Ghundivera	Jambughoda	Panch Mahals
Kolva	Jambughoda	Panch Mahals
Lafni	Jambughoda	Panch Mahals
Khodsal	Jambughoda	Panch Mahals
Masabar	Jambughoda	Panch Mahals
Deval Faliya	Jambughoda	Panch Mahals
Haveli	Jambughoda	Panch Mahals
Padideri	Jambughoda	Panch Mahals
Khuntiya	Jambughoda	Panch Mahals
Uchet	Jambughoda	Panch Mahals
Duma	Jambughoda	Panch Mahals
Dhanakiya	Jambughoda	Panch Mahals
Khandivav	Jambughoda	Panch Mahals
Gadra	Fatepura	Dohad
Zer	Fatepura	Dohad
Dungar	Fatepura	Dohad
Navagam	Fatepura	Dohad
Apatalai	Fatepura	Dohad
Patvel	Fatepura	Dohad
Jagola	Fatepura	Dohad
Barsaleda	Fatepura	Dohad
Piplara	Fatepura	Dohad
Vadvas	Fatepura	Dohad
Salara	Fatepura	Dohad
Karodiya Purva Fatepura)	Fatepura	Dohad
Fatepura Alias Valunda	Fatepura	Dohad
Chhalor	Fatepura	Dohad
Nava Talav	Fatepura	Dohad
Vandariya (East)	Fatepura	Dohad
Jalai	Fatepura	Dohad
Moti Charoli	Fatepura	Dohad
Nani Charoli	Fatepura	Dohad
Dungra	Fatepura	Dohad
Karmel	Fatepura	Dohad
Mor Mahudi	Fatepura	Dohad
Moti Shero	Fatepura	Dohad
Vavdi (East)	Fatepura	Dohad
Valundi	Fatepura	Dohad
Motirel (East)	Fatepura	Dohad
Limadiya	Fatepura	Dohad
Kupda	Fatepura	Dohad
Moti Nandukan	Fatepura	Dohad
Jatanana Muvada	Fatepura	Dohad
Nani Nandukan	Fatepura	Dohad
Kumana Muvada	Fatepura	Dohad
Ratanpur (Nes)	Fatepura	Dohad
Nana Saranaiya	Fatepura	Dohad
Bariyani Hathod	Fatepura	Dohad
Kankasiya	Fatepura	Dohad
Nanirel (East)	Fatepura	Dohad
Vatli	Fatepura	Dohad
Vangad	Fatepura	Dohad
Bhichor	Fatepura	Dohad
Ghughas	Fatepura	Dohad
Inta	Fatepura	Dohad
Dungrana Pani	Fatepura	Dohad
Dhadhela	Fatepura	Dohad
Fategadhi	Fatepura	Dohad
Madhva	Fatepura	Dohad
Vaghvadla	Fatepura	Dohad
Pipliya	Fatepura	Dohad
Bhat Muvadi	Fatepura	Dohad
Bavani Hathod	Fatepura	Dohad
Balaiya	Fatepura	Dohad
Gava Dungra	Fatepura	Dohad
Chikhali	Fatepura	Dohad
Sarsawa (East)	Fatepura	Dohad
Nindka (East)	Fatepura	Dohad
Tadhigoli	Fatepura	Dohad
Vansiya Kui	Fatepura	Dohad
Patisara	Fatepura	Dohad
Bhitodi	Fatepura	Dohad
Nani Bara	Fatepura	Dohad
Moti Bara	Fatepura	Dohad
Moti Dhadheli	Fatepura	Dohad
Nani Dhadheli	Fatepura	Dohad
Dablara	Fatepura	Dohad
Mota Natava	Fatepura	Dohad
Aspur	Fatepura	Dohad
Rupakheda	Fatepura	Dohad
Nes Damorni	Fatepura	Dohad
Padaliya	Fatepura	Dohad
Khakhariya	Fatepura	Dohad
Bachkariya (East)	Fatepura	Dohad
Raval Na Varuna	Fatepura	Dohad
Ghani Khunt	Fatepura	Dohad
Mota Borida	Fatepura	Dohad
Manawala Borida	Fatepura	Dohad
Nana Borida	Fatepura	Dohad
Kaliya (Lakhanpur)	Fatepura	Dohad
Ghata Vadiya (East)	Fatepura	Dohad
Lakhanpur	Fatepura	Dohad
Hadmat	Fatepura	Dohad
Makwana Na Varuna	Fatepura	Dohad
Sukhsar	Fatepura	Dohad
Bhojela	Fatepura	Dohad
Hindoliya	Fatepura	Dohad
Pati	Fatepura	Dohad
Affava	Fatepura	Dohad
Vankaner	Fatepura	Dohad
Khatarpur Na Muvada	Fatepura	Dohad
Jhab (East)	Fatepura	Dohad
Kundla	Fatepura	Dohad
Patadiya	Fatepura	Dohad
Hingla	Fatepura	Dohad
Kanthagar	Fatepura	Dohad
Sagdapada	Fatepura	Dohad
Margala	Fatepura	Dohad
Javesi	Fatepura	Dohad
Garadu	Jhalod	Dohad
Dhavadiya	Jhalod	Dohad
Bambela	Jhalod	Dohad
Rajadiya	Jhalod	Dohad
Kheda	Jhalod	Dohad
Amba Jharan	Jhalod	Dohad
Thunthi Kankasiya	Jhalod	Dohad
Mahudi	Jhalod	Dohad
Chhasiya	Jhalod	Dohad
Ghensva	Jhalod	Dohad
Maghanisar	Jhalod	Dohad
Hadmat Khunta	Jhalod	Dohad
Kharsana	Jhalod	Dohad
Anvarpura	Jhalod	Dohad
Sitavatli	Jhalod	Dohad
Rajpur	Jhalod	Dohad
Velpura	Jhalod	Dohad
Kaliya Talav	Jhalod	Dohad
Mun Khosla	Jhalod	Dohad
Shankarpura	Jhalod	Dohad
Fulpura	Jhalod	Dohad
Timachi	Jhalod	Dohad
Rampura	Jhalod	Dohad
Raypura	Jhalod	Dohad
Gamdi	Jhalod	Dohad
Jafarpura	Jhalod	Dohad
Chitrodiya	Jhalod	Dohad
Devjini Sarasvani	Jhalod	Dohad
Kaljini Sarsavani	Jhalod	Dohad
Jetpur	Jhalod	Dohad
Melaniya	Jhalod	Dohad
Therka	Jhalod	Dohad
Vagela	Jhalod	Dohad
Ghodiya	Jhalod	Dohad
Khakhariya	Jhalod	Dohad
Nansalai	Jhalod	Dohad
Bajarvada	Jhalod	Dohad
Kadval	Jhalod	Dohad
Hirola	Jhalod	Dohad
Kunda	Jhalod	Dohad
Dhalsimal	Jhalod	Dohad
Dhamena	Jhalod	Dohad
Jaror	Jhalod	Dohad
Bodiya Bhint	Jhalod	Dohad
Dhavdi Faliya	Jhalod	Dohad
Chakisana	Jhalod	Dohad
Vansiya	Jhalod	Dohad
Dungra	Jhalod	Dohad
Anika	Jhalod	Dohad
Lavara	Jhalod	Dohad
Trakda Mahudina Muvada	Jhalod	Dohad
Sarori	Jhalod	Dohad
Trakda Mahudi	Jhalod	Dohad
Jitpura	Jhalod	Dohad
Valunda	Jhalod	Dohad
Kanji Khedi	Jhalod	Dohad
Vaniya Ghanti	Jhalod	Dohad
Kakreli	Jhalod	Dohad
Bhaman	Jhalod	Dohad
Moli	Jhalod	Dohad
Itadi	Jhalod	Dohad
Govinda Talai	Jhalod	Dohad
Thala (Sanjeli)	Jhalod	Dohad
Kota	Jhalod	Dohad
Kadvana Pad	Jhalod	Dohad
Doka Talavdi	Jhalod	Dohad
Jasuni	Jhalod	Dohad
Galana Pad	Jhalod	Dohad
Nenki	Jhalod	Dohad
Zusa	Jhalod	Dohad
Dhedhiyano Nalo	Jhalod	Dohad
Dhedhiya	Jhalod	Dohad
Patela	Jhalod	Dohad
Doki	Jhalod	Dohad
Tisana Muvada	Jhalod	Dohad
Chamariya	Jhalod	Dohad
Nariyani Muvadi	Jhalod	Dohad
Lunjana Muvada	Jhalod	Dohad
Chandana Muvada	Jhalod	Dohad
Kavdana Muvada	Jhalod	Dohad
Kalyanpura	Jhalod	Dohad
Pichhoda	Jhalod	Dohad
Bachkariya	Jhalod	Dohad
Mandli	Jhalod	Dohad
Pratappura	Jhalod	Dohad
Gasali	Jhalod	Dohad
Nana Kaliya	Jhalod	Dohad
Mota Kaliya	Jhalod	Dohad
Bhamela	Jhalod	Dohad
Bhanpur	Jhalod	Dohad
Garadiya	Jhalod	Dohad
Boda Dungar	Jhalod	Dohad
Karamba	Jhalod	Dohad
Sarmariya	Jhalod	Dohad
Varod	Jhalod	Dohad
Sampoi	Jhalod	Dohad
Tandi	Jhalod	Dohad
Raniyar Kanbi	Jhalod	Dohad
Paniya	Jhalod	Dohad
Chakaliya	Jhalod	Dohad
Pethapur	Jhalod	Dohad
Mudaheda	Jhalod	Dohad
Lilva Pokar	Jhalod	Dohad
Raniyar Inami	Jhalod	Dohad
Lilva Thakor	Jhalod	Dohad
Nime Varod	Jhalod	Dohad
Kuni	Jhalod	Dohad
Simaliya	Jhalod	Dohad
Kharvani	Jhalod	Dohad
Vankol	Jhalod	Dohad
Limdi	Jhalod	Dohad
Lilva Deva	Jhalod	Dohad
Malvasi	Jhalod	Dohad
Piplet	Jhalod	Dohad
Kankara Kuva	Jhalod	Dohad
Kachaldhara	Jhalod	Dohad
Chatka	Jhalod	Dohad
Dhola Khakhara	Jhalod	Dohad
Kotda	Jhalod	Dohad
Sabli	Jhalod	Dohad
Raliyati Bhura	Jhalod	Dohad
Parthampur	Jhalod	Dohad
Rupakheda	Jhalod	Dohad
Karath	Jhalod	Dohad
Nani Handi	Jhalod	Dohad
Pareva	Jhalod	Dohad
Pipaliya	Jhalod	Dohad
Dungri	Jhalod	Dohad
Thala (Limdi)	Jhalod	Dohad
Mundha	Jhalod	Dohad
Golana	Jhalod	Dohad
Suthar Vasa	Jhalod	Dohad
Amba	Jhalod	Dohad
Bilwani	Jhalod	Dohad
Moti Handi	Jhalod	Dohad
Dageriya	Jhalod	Dohad
Vasti	Jhalod	Dohad
Pavdi (Inami)	Jhalod	Dohad
Mirakhedi	Jhalod	Dohad
Kaligam (Inami)	Jhalod	Dohad
Kaligam (Gujar)	Jhalod	Dohad
Dhara Dungar	Jhalod	Dohad
Tadhagola	Jhalod	Dohad
Dantiya	Jhalod	Dohad
Raliati Gujjar	Jhalod	Dohad
Gultora	Jhalod	Dohad
Tatariya	Jhalod	Dohad
Sharda	Jhalod	Dohad
Chhayan	Jhalod	Dohad
Methan	Limkheda	Dohad
Mota Ambaliya	Limkheda	Dohad
Surpur (Randhikpur)	Limkheda	Dohad
Parmarna Dungarpur	Limkheda	Dohad
Rathodna Dungarpur	Limkheda	Dohad
Bhutkhedi	Limkheda	Dohad
Nani Sanjeli	Limkheda	Dohad
Panta	Limkheda	Dohad
Navipuri	Limkheda	Dohad
Chachakpur	Limkheda	Dohad
Tarmi	Limkheda	Dohad
Agara (Randhikpur)	Limkheda	Dohad
Handi	Limkheda	Dohad
Nana Ambaliya	Limkheda	Dohad
Bhanpur (Randhikpur)	Limkheda	Dohad
Sakariya	Limkheda	Dohad
Malekpur	Limkheda	Dohad
Mander	Limkheda	Dohad
Chhapri	Limkheda	Dohad
Randhikpur	Limkheda	Dohad
Borgota	Limkheda	Dohad
Chunddi	Limkheda	Dohad
Dasa	Limkheda	Dohad
Singvad	Limkheda	Dohad
Baroda	Limkheda	Dohad
Anoppura	Limkheda	Dohad
Sudiya	Limkheda	Dohad
Karmadi	Limkheda	Dohad
Jamri	Limkheda	Dohad
Vadapipla	Limkheda	Dohad
Kelkuva	Limkheda	Dohad
Palla	Limkheda	Dohad
Matana Palla	Limkheda	Dohad
Pisoi	Limkheda	Dohad
Aroda	Limkheda	Dohad
Khunta	Limkheda	Dohad
Vala Gota	Limkheda	Dohad
Toyani	Limkheda	Dohad
Pipaliya	Limkheda	Dohad
Jetpur (R)	Limkheda	Dohad
Kaliya Gota	Limkheda	Dohad
Katarani Palli	Limkheda	Dohad
Choki	Limkheda	Dohad
Kaliyarai	Limkheda	Dohad
Sarjumi	Limkheda	Dohad
Dhamanbari	Limkheda	Dohad
Khudra	Limkheda	Dohad
Chhaparvad	Limkheda	Dohad
Hirapur	Limkheda	Dohad
Fofan	Limkheda	Dohad
Zaliya Pada	Limkheda	Dohad
Sangiya	Limkheda	Dohad
Munavani	Limkheda	Dohad
Singapur	Limkheda	Dohad
Fulpari	Limkheda	Dohad
Juna Vadiya	Limkheda	Dohad
Bara	Limkheda	Dohad
Padaliya	Limkheda	Dohad
Nani Vav	Limkheda	Dohad
Bhilpaniya	Limkheda	Dohad
Pahad	Limkheda	Dohad
Ranipura	Limkheda	Dohad
Panivela	Limkheda	Dohad
Vaghnala	Limkheda	Dohad
Barela	Limkheda	Dohad
Zarola (Randhikpur)	Limkheda	Dohad
Dhabudi	Limkheda	Dohad
Humadpur	Limkheda	Dohad
Vanjhariya	Limkheda	Dohad
Moti Vav	Limkheda	Dohad
Sati Faliya	Limkheda	Dohad
Dakara	Limkheda	Dohad
Fatepura	Limkheda	Dohad
Nava Vadiya	Limkheda	Dohad
Zerjitgadh	Limkheda	Dohad
Dungara	Limkheda	Dohad
Gumni (Du)	Limkheda	Dohad
Shasta	Limkheda	Dohad
Kothara	Limkheda	Dohad
Kesharpura	Limkheda	Dohad
Patangadi	Limkheda	Dohad
Limbodar	Limkheda	Dohad
Kumpur	Limkheda	Dohad
Machhelai	Limkheda	Dohad
Lukhawada	Limkheda	Dohad
Moti Bandibar	Limkheda	Dohad
Pipli	Limkheda	Dohad
Dudhiya	Limkheda	Dohad
Atarsumba	Limkheda	Dohad
Bhimpura	Limkheda	Dohad
Hathiyavan	Limkheda	Dohad
Moti Vasvani	Limkheda	Dohad
Nani Vasvani	Limkheda	Dohad
Piplapani	Limkheda	Dohad
Ninamani Vav	Limkheda	Dohad
Zarola (Du)	Limkheda	Dohad
Dhanpur (Du)	Limkheda	Dohad
Pada	Limkheda	Dohad
Dudhiyadhara	Limkheda	Dohad
Umedpura	Limkheda	Dohad
Jamadra	Limkheda	Dohad
Navagam	Limkheda	Dohad
Vadela	Limkheda	Dohad
Nani Bandibar	Limkheda	Dohad
Jetpur (Du)	Limkheda	Dohad
Chopat Palli	Limkheda	Dohad
Motamal	Limkheda	Dohad
Nana Mal	Limkheda	Dohad
Goriya	Limkheda	Dohad
Patdi	Limkheda	Dohad
Khadada (Umariya)	Limkheda	Dohad
Chatki	Limkheda	Dohad
Mangal Mahudi	Limkheda	Dohad
Dhadhela	Limkheda	Dohad
Kakri Dungari	Limkheda	Dohad
Nana Hathidhara	Limkheda	Dohad
Degawada	Limkheda	Dohad
Mota Hathidhara	Limkheda	Dohad
Dantiya	Limkheda	Dohad
Dabhada	Limkheda	Dohad
Valundi	Limkheda	Dohad
Polisimal	Limkheda	Dohad
Usra	Limkheda	Dohad
Kamboi	Limkheda	Dohad
Tunta Ghati	Limkheda	Dohad
Khirkhai	Limkheda	Dohad
Vateda	Limkheda	Dohad
Palli	Limkheda	Dohad
Pania	Limkheda	Dohad
Pratappura	Limkheda	Dohad
Parpata	Limkheda	Dohad
Andhari	Limkheda	Dohad
Kundha	Limkheda	Dohad
Devdhi	Limkheda	Dohad
Parmarna Kharkhariya	Limkheda	Dohad
Chaidiya	Limkheda	Dohad
Vislanga	Limkheda	Dohad
Padola	Limkheda	Dohad
Ninamana Khakhariya	Limkheda	Dohad
Agara (U)	Limkheda	Dohad
Kunlli	Limkheda	Dohad
Manlli	Limkheda	Dohad
Rai	Limkheda	Dohad
Bar	Limkheda	Dohad
Ambava	Limkheda	Dohad
Patwan	Limkheda	Dohad
Timba	Limkheda	Dohad
Ghuntiya	Limkheda	Dohad
Jada Kheriya	Limkheda	Dohad
Katholiya	Limkheda	Dohad
Chilakota	Limkheda	Dohad
Dungra	Dohad	Dohad
Doki	Dohad	Dohad
Chosala	Dohad	Dohad
Kharoda	Dohad	Dohad
Chhayan	Dohad	Dohad
Bhathiwada	Dohad	Dohad
Sakarda	Dohad	Dohad
Kharod	Dohad	Dohad
Rentiya	Dohad	Dohad
Khodva	Dohad	Dohad
Jekot	Dohad	Dohad
Rampura	Dohad	Dohad
Borwani	Dohad	Dohad
Khajuri	Dohad	Dohad
Chhapri	Dohad	Dohad
Usarvan (Part)	Dohad	Dohad
Delsar	Dohad	Dohad
Rajpur	Dohad	Dohad
Kherdi	Dohad	Dohad
Ranapur Bujarg	Dohad	Dohad
Ranapur Khurd	Dohad	Dohad
Navagam	Dohad	Dohad
Ravali Kheda	Dohad	Dohad
Salapada	Dohad	Dohad
Zari Khurd	Dohad	Dohad
Tanda	Dohad	Dohad
Kotda Bujarg	Dohad	Dohad
Junapani	Dohad	Dohad
Tanachhiya	Dohad	Dohad
Bordi Khurd	Dohad	Dohad
Bordi Inami	Dohad	Dohad
Karamchandnu Khedun	Dohad	Dohad
Kotda Khurd	Dohad	Dohad
Dhamarda	Dohad	Dohad
Mandavav	Dohad	Dohad
Dungarpur	Dohad	Dohad
Ukardi	Dohad	Dohad
Kali Talai	Dohad	Dohad
Rozam	Dohad	Dohad
Muwalia	Dohad	Dohad
Rabdal	Dohad	Dohad
Nimnalia	Dohad	Dohad
Nasirpur	Dohad	Dohad
Punsri	Dohad	Dohad
Jalat	Dohad	Dohad
Vanbhori	Dohad	Dohad
Bhambhori	Dohad	Dohad
Tarvadia Himat	Dohad	Dohad
Khut Kheda	Dohad	Dohad
Gundi Kheda	Dohad	Dohad
Himala	Dohad	Dohad
Udar	Dohad	Dohad
Kheng	Dohad	Dohad
Rachharda	Dohad	Dohad
Timarda	Dohad	Dohad
Itawa	Dohad	Dohad
Tarvadiya Vaja	Dohad	Dohad
Tarvadiya Bhau	Dohad	Dohad
Gamla	Dohad	Dohad
Moti Kharaj	Dohad	Dohad
Naghrala	Dohad	Dohad
Gadoi	Dohad	Dohad
Bavka	Dohad	Dohad
Chandawada	Dohad	Dohad
Vijagadh	Dohad	Dohad
Brahmkheda	Dohad	Dohad
Nani Kharaj	Dohad	Dohad
Borkheda	Dohad	Dohad
Lilar	Dohad	Dohad
Katwara	Dohad	Dohad
Chandwana	Dohad	Dohad
Kathla	Dohad	Dohad
Bandibar	Dohad	Dohad
Limdabara	Dohad	Dohad
Uchavaniya	Dohad	Dohad
Vadbara	Dohad	Dohad
Khangela	Dohad	Dohad
Bhutodi	Dohad	Dohad
Dasla	Dohad	Dohad
Nani Lachheli	Dohad	Dohad
Moti Lachheli	Dohad	Dohad
Vankiya	Dohad	Dohad
Simaliya Khurd	Dohad	Dohad
Khapariya	Dohad	Dohad
Agawada	Dohad	Dohad
Ramdungara	Dohad	Dohad
Matwa	Garbada	Dohad
Vajelav	Garbada	Dohad
Nelsur	Garbada	Dohad
Jesawada	Garbada	Dohad
Abhlod	Garbada	Dohad
Pandadi	Garbada	Dohad
Devdha	Garbada	Dohad
Panchwada	Garbada	Dohad
Sahada	Garbada	Dohad
Tunki Anop	Garbada	Dohad
Nadhelav	Garbada	Dohad
Vadva	Garbada	Dohad
Ambli	Garbada	Dohad
Chharchhoda	Garbada	Dohad
Bhe	Garbada	Dohad
Patiya	Garbada	Dohad
Dadur	Garbada	Dohad
Nandva	Garbada	Dohad
Bharsada	Garbada	Dohad
Tunki Vaju	Garbada	Dohad
Nalwai	Garbada	Dohad
Simaliya Bujarg	Garbada	Dohad
Boriyala	Garbada	Dohad
Gangarda	Garbada	Dohad
Gulbar	Garbada	Dohad
Jambua	Garbada	Dohad
Nimach	Garbada	Dohad
Garbada	Garbada	Dohad
Gangardi	Garbada	Dohad
Chandla	Garbada	Dohad
Minakyar	Garbada	Dohad
Bhutardi	Garbada	Dohad
Patiya Zol	Garbada	Dohad
Zari Bujarg	Garbada	Dohad
Vadodar	Devgadbaria	Dohad
Saliya	Devgadbaria	Dohad
Guna	Devgadbaria	Dohad
Toyani	Devgadbaria	Dohad
Panchela	Devgadbaria	Dohad
Asayadi	Devgadbaria	Dohad
Gamdi	Devgadbaria	Dohad
Bhathwada	Devgadbaria	Dohad
Rebari	Devgadbaria	Dohad
Piplod	Devgadbaria	Dohad
Hindoliya	Devgadbaria	Dohad
Moti Zari	Devgadbaria	Dohad
Kaliya Kota	Devgadbaria	Dohad
Rama	Devgadbaria	Dohad
Nathudi	Devgadbaria	Dohad
Megha Muvadi	Devgadbaria	Dohad
Chenpur	Devgadbaria	Dohad
Nani Zari	Devgadbaria	Dohad
Bhular	Devgadbaria	Dohad
Antela	Devgadbaria	Dohad
Ruvabari	Devgadbaria	Dohad
Dangariya	Devgadbaria	Dohad
Koyada	Devgadbaria	Dohad
Biliya	Devgadbaria	Dohad
Ranipura (Ratadiya)	Devgadbaria	Dohad
Ratadiya	Devgadbaria	Dohad
Uchvan	Devgadbaria	Dohad
Udhavala	Devgadbaria	Dohad
Moti Khajuri	Devgadbaria	Dohad
Bhuval	Devgadbaria	Dohad
Abhlod	Devgadbaria	Dohad
Sagarama	Devgadbaria	Dohad
Kali Dungari	Devgadbaria	Dohad
Bhadbha	Devgadbaria	Dohad
Singedi	Devgadbaria	Dohad
Mendra	Devgadbaria	Dohad
Kolina Punvala	Devgadbaria	Dohad
Dukhali	Devgadbaria	Dohad
Nani Khajuri	Devgadbaria	Dohad
Degavada	Devgadbaria	Dohad
Zabiya	Devgadbaria	Dohad
Tidki	Devgadbaria	Dohad
Juna Bariya	Devgadbaria	Dohad
Bamroli	Devgadbaria	Dohad
Bamroli Mavuda	Devgadbaria	Dohad
Singor	Devgadbaria	Dohad
Virol	Devgadbaria	Dohad
Kakalpur	Devgadbaria	Dohad
Lavariya	Devgadbaria	Dohad
Dudhiya	Devgadbaria	Dohad
Ankali	Devgadbaria	Dohad
Kuva	Devgadbaria	Dohad
Baina	Devgadbaria	Dohad
Vandar	Devgadbaria	Dohad
Keliya	Devgadbaria	Dohad
Jambusar	Devgadbaria	Dohad
Vadbhet	Devgadbaria	Dohad
Nagvav	Devgadbaria	Dohad
Simlaghasi	Devgadbaria	Dohad
Timarva	Devgadbaria	Dohad
Redhana	Devgadbaria	Dohad
Jhab (Sagtala)	Devgadbaria	Dohad
Bhut Pagalan	Devgadbaria	Dohad
Nani Magoi	Devgadbaria	Dohad
Moti Magoi	Devgadbaria	Dohad
Pani Vagan	Devgadbaria	Dohad
Satkunda	Devgadbaria	Dohad
Khandaniya	Devgadbaria	Dohad
Kalia Kuwa	Devgadbaria	Dohad
Amli Zoz	Devgadbaria	Dohad
Nadatod	Devgadbaria	Dohad
Sevaniya	Devgadbaria	Dohad
Fangiya	Devgadbaria	Dohad
Madav	Devgadbaria	Dohad
Dabhva (Sagtala)	Devgadbaria	Dohad
Navi Bedi	Devgadbaria	Dohad
Rathva Muvada	Devgadbaria	Dohad
Kelkuva	Devgadbaria	Dohad
Bara	Devgadbaria	Dohad
Rampura Devi	Devgadbaria	Dohad
Amblipani Chhotra	Devgadbaria	Dohad
Chhasiya (Sadadiya)	Devgadbaria	Dohad
Juni Bedi	Devgadbaria	Dohad
Sagtala	Devgadbaria	Dohad
Diviya	Devgadbaria	Dohad
Zamran	Devgadbaria	Dohad
Ghodajar	Dhanpur	Dohad
Umariya	Dhanpur	Dohad
Budhpur	Dhanpur	Dohad
Bor	Dhanpur	Dohad
Mahunala	Dhanpur	Dohad
Surpur (Umariya)	Dhanpur	Dohad
Mandav	Dhanpur	Dohad
Dolariya	Dhanpur	Dohad
Kanzar	Dhanpur	Dohad
Agasvani	Dhanpur	Dohad
Pipodra	Dhanpur	Dohad
Chorbariya	Dhanpur	Dohad
Bedat	Dhanpur	Dohad
Bogadva	Dhanpur	Dohad
Nakti	Dhanpur	Dohad
Bhorva	Dhanpur	Dohad
Sajoi	Dhanpur	Dohad
Kaliyavad	Dhanpur	Dohad
Undar	Dhanpur	Dohad
Biliya	Dhanpur	Dohad
Kantu	Dhanpur	Dohad
Dudhamali	Dhanpur	Dohad
Adalwada	Dhanpur	Dohad
Kothariya	Dhanpur	Dohad
Rampur	Dhanpur	Dohad
Modhva	Dhanpur	Dohad
Nalu	Dhanpur	Dohad
Pav	Dhanpur	Dohad
Ambli Menpur	Dhanpur	Dohad
Kanakuwa	Dhanpur	Dohad
Sangasar	Dhanpur	Dohad
Zabu	Dhanpur	Dohad
Ulkadar	Dhanpur	Dohad
Raiyavan	Dhanpur	Dohad
Khokhbed	Dhanpur	Dohad
Ved	Dhanpur	Dohad
Ghada	Dhanpur	Dohad
Khokhra	Dhanpur	Dohad
Lukhadiya	Dhanpur	Dohad
Pipearo	Dhanpur	Dohad
Singawali	Dhanpur	Dohad
Dhanpur (To)	Dhanpur	Dohad
Rachhava	Dhanpur	Dohad
Khajuri	Dhanpur	Dohad
Harakhpur	Dhanpur	Dohad
Vakota	Dhanpur	Dohad
Kalakhunt	Dhanpur	Dohad
Navanagar	Dhanpur	Dohad
Kadval	Dhanpur	Dohad
Khadada (Na)	Dhanpur	Dohad
Ambakach	Dhanpur	Dohad
Leliya Amba	Dhanpur	Dohad
Sankarpura	Dhanpur	Dohad
Nanimalu	Dhanpur	Dohad
Gohelvaga	Dhanpur	Dohad
Punakota	Dhanpur	Dohad
Kotambi	Dhanpur	Dohad
Ladva Vad	Dhanpur	Dohad
Dumka	Dhanpur	Dohad
Simamoi	Dhanpur	Dohad
Vakasiya	Dhanpur	Dohad
Kundawada	Dhanpur	Dohad
Taramkach	Dhanpur	Dohad
Dabhava	Dhanpur	Dohad
Lakhana Gojiya	Dhanpur	Dohad
Tokarva	Dhanpur	Dohad
Dungarpur (To)	Dhanpur	Dohad
Nan Salai	Dhanpur	Dohad
Chari	Dhanpur	Dohad
Khalta Garabdi	Dhanpur	Dohad
Moti Malu	Dhanpur	Dohad
Vasiya Dungari	Dhanpur	Dohad
Dhanarpatiya	Dhanpur	Dohad
Gangardi Faliya	Dhanpur	Dohad
Kakad Khila	Dhanpur	Dohad
Mandor	Dhanpur	Dohad
Kanseta	Dhanpur	Dohad
Bhanpur (Kakadkhila)	Dhanpur	Dohad
Bhindol	Dhanpur	Dohad
Kanjeta	Dhanpur	Dohad
Limdi Medhari	Dhanpur	Dohad
Pipariya (To)	Dhanpur	Dohad
Gadvel	Dhanpur	Dohad
Andarpura	Dhanpur	Dohad
Gumli (Dho)	Dhanpur	Dohad
Udhal Mahuda	Dhanpur	Dohad
Pipargota	Dhanpur	Dohad
Panam	Dhanpur	Dohad
Alindra	Dhanpur	Dohad
Bhuvera	Dhanpur	Dohad
Udalpur	Savli	Vadodara
Tulsigam	Savli	Vadodara
Vachchhesar	Savli	Vadodara
Jambu Goral	Savli	Vadodara
Varsada	Savli	Vadodara
Waghpura	Savli	Vadodara
Tansiya	Savli	Vadodara
Himmatpura	Savli	Vadodara
Dungripura(I)	Savli	Vadodara
Intvad	Savli	Vadodara
Nani Varnoli (Vanto)	Savli	Vadodara
Desar	Savli	Vadodara
Valavav	Savli	Vadodara
Vejpur	Savli	Vadodara
Jesar Gopari	Savli	Vadodara
Vaktapura	Savli	Vadodara
Kadachhala	Savli	Vadodara
Manekla	Savli	Vadodara
Moti Varnoli	Savli	Vadodara
Nani Varnoli	Savli	Vadodara
Chhalier	Savli	Vadodara
Vankaneda	Savli	Vadodara
Ghemalpura	Savli	Vadodara
Dolatpura	Savli	Vadodara
Pipalchhat Vanto	Savli	Vadodara
Rampuri-Narpuri	Savli	Vadodara
Vadiya (Pandu)	Savli	Vadodara
Rajupura	Savli	Vadodara
Limdanu Muvadu	Savli	Vadodara
Kalyan Patelnu Muvadu	Savli	Vadodara
Rajpur	Savli	Vadodara
Pratappura	Savli	Vadodara
Shihora	Savli	Vadodara
Gorsan	Savli	Vadodara
Vaghanu Muvadu	Savli	Vadodara
Raipura Chhatrapura	Savli	Vadodara
Bhila	Savli	Vadodara
Pandu	Savli	Vadodara
Pipalchhat	Savli	Vadodara
Sanpiya	Savli	Vadodara
Mokampura	Savli	Vadodara
Kaslapura	Savli	Vadodara
Vansiya	Savli	Vadodara
Ghanta	Savli	Vadodara
Andrakhiya	Savli	Vadodara
Limdi	Savli	Vadodara
Latva	Savli	Vadodara
Vav	Savli	Vadodara
Sandhasal	Savli	Vadodara
Gutardi	Savli	Vadodara
Nhara	Savli	Vadodara
Gulabpura (Shihora)	Savli	Vadodara
Ajabpura	Savli	Vadodara
Amarapura	Savli	Vadodara
Kalupura	Savli	Vadodara
Parthampura (Shihora)	Savli	Vadodara
Gokalpura Ganeshpura	Savli	Vadodara
Zumkha	Savli	Vadodara
Dipapura	Savli	Vadodara
Ankaliya	Savli	Vadodara
Dhantej	Savli	Vadodara
Narpura	Savli	Vadodara
Mevli	Savli	Vadodara
Vitoj	Savli	Vadodara
Samantpura	Savli	Vadodara
Gangadiyapura	Savli	Vadodara
Dungripura (Shihora)	Savli	Vadodara
Rasawadi	Savli	Vadodara
Lachhanpura	Savli	Vadodara
Rupankui	Savli	Vadodara
Kanoda	Savli	Vadodara
Rasulpur	Savli	Vadodara
Dungrapura	Savli	Vadodara
Tulsipura	Savli	Vadodara
Kamalpura	Savli	Vadodara
Vasanpura	Savli	Vadodara
Muval	Savli	Vadodara
Sardarpura	Savli	Vadodara
Poicha (Kanoda)	Savli	Vadodara
Mevaliapura	Savli	Vadodara
Wankaner	Savli	Vadodara
Javla	Savli	Vadodara
Charanpura	Savli	Vadodara
Moti Bhadol	Savli	Vadodara
Vadiya(K)	Savli	Vadodara
Mal Ankaliya	Savli	Vadodara
Kambola	Savli	Vadodara
Khakhariya	Savli	Vadodara
Singaniya	Savli	Vadodara
Mudhela	Savli	Vadodara
Ghantiyal	Savli	Vadodara
Ranipura (Samlaya)	Savli	Vadodara
Nani Bhadol	Savli	Vadodara
Samlaya	Savli	Vadodara
Sherpura	Savli	Vadodara
Karachiya	Savli	Vadodara
Gothada	Savli	Vadodara
Ranchhodpura	Savli	Vadodara
Bahidhara Alias Natvarnagar	Savli	Vadodara
Bhadarva	Savli	Vadodara
Parthampura (Bhadarva)	Savli	Vadodara
Jalampura	Savli	Vadodara
Khandi	Savli	Vadodara
Poicha (Raniya)	Savli	Vadodara
Raniya	Savli	Vadodara
Mahapura	Savli	Vadodara
Ranipura(B)	Savli	Vadodara
Namisara	Savli	Vadodara
Bautha	Savli	Vadodara
Lasundra	Savli	Vadodara
Pasva	Savli	Vadodara
Motipura	Savli	Vadodara
Pratapnagar	Savli	Vadodara
Gangadiya	Savli	Vadodara
Lotna	Savli	Vadodara
Sadra	Savli	Vadodara
Adalwada	Savli	Vadodara
Vadadala	Savli	Vadodara
Chandranagar	Savli	Vadodara
Subhelav	Savli	Vadodara
Paldi	Savli	Vadodara
Tundav	Savli	Vadodara
Anjesar	Savli	Vadodara
Moksi	Savli	Vadodara
Kunpad	Savli	Vadodara
Manjusar	Savli	Vadodara
Lamdapura	Savli	Vadodara
Zumkal	Savli	Vadodara
Alindra	Savli	Vadodara
Pilol	Savli	Vadodara
Indrad	Savli	Vadodara
Khokhar	Savli	Vadodara
Vemar	Savli	Vadodara
Garadhiya	Savli	Vadodara
Dhanora	Savli	Vadodara
Haripura	Savli	Vadodara
Dodka	Vadodara	Vadodara
Rayaka	Vadodara	Vadodara
Sankarda	Vadodara	Vadodara
Vasna-Kotariya	Vadodara	Vadodara
Sokhda	Vadodara	Vadodara
Padmala	Vadodara	Vadodara
Fajalpur (Sankarda)	Vadodara	Vadodara
Anagadh	Vadodara	Vadodara
Ajod	Vadodara	Vadodara
Asoj	Vadodara	Vadodara
Virod	Vadodara	Vadodara
Sisva	Vadodara	Vadodara
Dhanora	Vadodara	Vadodara
Kotna	Vadodara	Vadodara
Dena	Vadodara	Vadodara
Sukhlipur	Vadodara	Vadodara
Amaliyara	Vadodara	Vadodara
Kotali	Vadodara	Vadodara
Ankodiya	Vadodara	Vadodara
Sherkhi	Vadodara	Vadodara
Sindhrot	Vadodara	Vadodara
Hinglot	Vadodara	Vadodara
Ampad	Vadodara	Vadodara
Mahapura	Vadodara	Vadodara
Khanpur	Vadodara	Vadodara
Ankhol	Vadodara	Vadodara
Khatamba	Vadodara	Vadodara
Raypura	Vadodara	Vadodara
Gokalpura	Vadodara	Vadodara
Samiyala	Vadodara	Vadodara
Shankarpura	Vadodara	Vadodara
Jobantekri	Vadodara	Vadodara
Ratanpur	Vadodara	Vadodara
Vadadla	Vadodara	Vadodara
Talsat	Vadodara	Vadodara
Chapad	Vadodara	Vadodara
Maretha	Vadodara	Vadodara
Chikhodara	Vadodara	Vadodara
Alhadpura	Vadodara	Vadodara
Navapura	Vadodara	Vadodara
Tatarpura	Vadodara	Vadodara
Sultanpura	Vadodara	Vadodara
Diwalipura	Vadodara	Vadodara
Hetampura	Vadodara	Vadodara
Kelanpur	Vadodara	Vadodara
Dhaniyavi	Vadodara	Vadodara
Vora Gamdi	Vadodara	Vadodara
Mujar Gamdi	Vadodara	Vadodara
Khalipur	Vadodara	Vadodara
Varnama	Vadodara	Vadodara
Sundarpura	Vadodara	Vadodara
Shahpura	Vadodara	Vadodara
Hansajipura	Vadodara	Vadodara
Raghavpura	Vadodara	Vadodara
Samaspura	Vadodara	Vadodara
Patarveni	Vadodara	Vadodara
Rabhipura	Vadodara	Vadodara
Fatepura	Vadodara	Vadodara
Karali	Vadodara	Vadodara
Itola	Vadodara	Vadodara
Vadsala	Vadodara	Vadodara
Untiya (Kajapur)	Vadodara	Vadodara
Kajapur	Vadodara	Vadodara
Hansapura	Vadodara	Vadodara
Mastupur Gamdi	Vadodara	Vadodara
Kandkoi	Vadodara	Vadodara
Meghakui	Vadodara	Vadodara
Salad	Vadodara	Vadodara
Ajitpura	Vadodara	Vadodara
Dolatpura	Vadodara	Vadodara
Por	Vadodara	Vadodara
Raman Gamdi	Vadodara	Vadodara
Gosindra	Vadodara	Vadodara
Untiya (Medhad)	Vadodara	Vadodara
Sarar	Vadodara	Vadodara
Kashipura	Vadodara	Vadodara
Ankhi	Vadodara	Vadodara
Fajalpur (Ankhi)	Vadodara	Vadodara
Ramnath	Vadodara	Vadodara
Rasulpur	Vadodara	Vadodara
Runvad	Vadodara	Vadodara
Samsabad	Vadodara	Vadodara
Bodidra	Vaghodia	Vadodara
Rajpura	Vaghodia	Vadodara
Sarnej	Vaghodia	Vadodara
Khandiwada	Vaghodia	Vadodara
Hansapura	Vaghodia	Vadodara
Asoj	Vaghodia	Vadodara
Paldi	Vaghodia	Vadodara
Amreshwar	Vaghodia	Vadodara
Kamrol	Vaghodia	Vadodara
Lilora	Vaghodia	Vadodara
Panch Devla	Vaghodia	Vadodara
Abhrampura	Vaghodia	Vadodara
Adiran	Vaghodia	Vadodara
Karmasiya Kheda	Vaghodia	Vadodara
Kodarvaya	Vaghodia	Vadodara
Vyankatpura	Vaghodia	Vadodara
Amrutpura	Vaghodia	Vadodara
Rahkui	Vaghodia	Vadodara
Ganeshpura	Vaghodia	Vadodara
Bhaniyara	Vaghodia	Vadodara
Bhaupura	Vaghodia	Vadodara
Kumetha	Vaghodia	Vadodara
Kotambi	Vaghodia	Vadodara
Sakariya	Vaghodia	Vadodara
Intoli	Vaghodia	Vadodara
Rasulabad	Vaghodia	Vadodara
Jafarpura	Vaghodia	Vadodara
Navgam	Vaghodia	Vadodara
Gutal	Vaghodia	Vadodara
Rayan Talavadi	Vaghodia	Vadodara
Morlipura	Vaghodia	Vadodara
Sikandarpura	Vaghodia	Vadodara
Jesangpura	Vaghodia	Vadodara
Nimetha	Vaghodia	Vadodara
Raval	Vaghodia	Vadodara
Sanoli	Vaghodia	Vadodara
Juna Rampura	Vaghodia	Vadodara
Nava Rampura	Vaghodia	Vadodara
Vesaniya	Vaghodia	Vadodara
Dundelav	Vaghodia	Vadodara
Valva	Vaghodia	Vadodara
Hamirpuri	Vaghodia	Vadodara
Dharola	Vaghodia	Vadodara
Chipat	Vaghodia	Vadodara
Gambhirpura	Vaghodia	Vadodara
Goraj	Vaghodia	Vadodara
Sangadol	Vaghodia	Vadodara
Madodhar	Vaghodia	Vadodara
Nava Ajva	Vaghodia	Vadodara
Khandha	Vaghodia	Vadodara
Chipad	Vaghodia	Vadodara
Navi Jambuvai	Vaghodia	Vadodara
Bakrol	Vaghodia	Vadodara
Hanumanpura	Vaghodia	Vadodara
Shripore Timbi	Vaghodia	Vadodara
Bhadol Khurd	Vaghodia	Vadodara
Gajadra	Vaghodia	Vadodara
Timbi	Vaghodia	Vadodara
Ghodadra	Vaghodia	Vadodara
Asha	Vaghodia	Vadodara
Vedpur	Vaghodia	Vadodara
Moti Manekpur	Vaghodia	Vadodara
Nani Manekpur	Vaghodia	Vadodara
Koba	Vaghodia	Vadodara
Saidal	Vaghodia	Vadodara
Vasvel	Vaghodia	Vadodara
Chandpur	Vaghodia	Vadodara
Ambali	Vaghodia	Vadodara
Dankheda	Vaghodia	Vadodara
Tavra	Vaghodia	Vadodara
Dattapura	Vaghodia	Vadodara
Kamlapura	Vaghodia	Vadodara
Alva	Vaghodia	Vadodara
Amodar	Vaghodia	Vadodara
Pavlepur	Vaghodia	Vadodara
Pipaliya	Vaghodia	Vadodara
Umarva	Vaghodia	Vadodara
Mastupura	Vaghodia	Vadodara
Ropa	Vaghodia	Vadodara
Limda	Vaghodia	Vadodara
Madheli	Vaghodia	Vadodara
Vejalpur	Vaghodia	Vadodara
Gugalpur	Vaghodia	Vadodara
Khervadi	Vaghodia	Vadodara
Kachhota	Vaghodia	Vadodara
Rustampura	Vaghodia	Vadodara
Ghoda	Vaghodia	Vadodara
Nurpuri	Vaghodia	Vadodara
Tarsva	Vaghodia	Vadodara
Jambuwada	Vaghodia	Vadodara
Vyara	Vaghodia	Vadodara
Falod	Vaghodia	Vadodara
Antoli	Vaghodia	Vadodara
Karamliya Pura	Vaghodia	Vadodara
Kanda	Jetpur Pavi	Vadodara
Borkanda	Jetpur Pavi	Vadodara
Chuli	Jetpur Pavi	Vadodara
Muvada	Jetpur Pavi	Vadodara
Jogpura (Gadh)	Jetpur Pavi	Vadodara
Gadh	Jetpur Pavi	Vadodara
Bhikhapura	Jetpur Pavi	Vadodara
Oliya Kalam	Jetpur Pavi	Vadodara
Mota Amadra (Kadval)	Jetpur Pavi	Vadodara
Nana Amadra (Kadval)	Jetpur Pavi	Vadodara
Kadval	Jetpur Pavi	Vadodara
Rajpur (Kadval)	Jetpur Pavi	Vadodara
Khatas	Jetpur Pavi	Vadodara
Jamba	Jetpur Pavi	Vadodara
Virpur	Jetpur Pavi	Vadodara
Samadi	Jetpur Pavi	Vadodara
Kadvapura	Jetpur Pavi	Vadodara
Kheda	Jetpur Pavi	Vadodara
Selva	Jetpur Pavi	Vadodara
Gundi	Jetpur Pavi	Vadodara
Zari	Jetpur Pavi	Vadodara
Kalikui	Jetpur Pavi	Vadodara
Bhabhar	Jetpur Pavi	Vadodara
Nani Khandi	Jetpur Pavi	Vadodara
Pani	Jetpur Pavi	Vadodara
Vadoth	Jetpur Pavi	Vadodara
Bar	Jetpur Pavi	Vadodara
Moti Khandi	Jetpur Pavi	Vadodara
Satun	Jetpur Pavi	Vadodara
Ghata	Jetpur Pavi	Vadodara
Kundal	Jetpur Pavi	Vadodara
Vasangadh	Jetpur Pavi	Vadodara
Udhaniya	Jetpur Pavi	Vadodara
Kevada	Jetpur Pavi	Vadodara
Jogpura (Dungar)	Jetpur Pavi	Vadodara
Intvada	Jetpur Pavi	Vadodara
Mudhiyari	Jetpur Pavi	Vadodara
Kathola	Jetpur Pavi	Vadodara
Zab (Valothi)	Jetpur Pavi	Vadodara
Narvaniya	Jetpur Pavi	Vadodara
Bhanpur	Jetpur Pavi	Vadodara
Hathipagla	Jetpur Pavi	Vadodara
Raypur	Jetpur Pavi	Vadodara
Lunaja	Jetpur Pavi	Vadodara
Dungarvant	Jetpur Pavi	Vadodara
Ghuntia	Jetpur Pavi	Vadodara
Ghutanvad	Jetpur Pavi	Vadodara
Gambhirpura	Jetpur Pavi	Vadodara
Nani Bej	Jetpur Pavi	Vadodara
Bhanpuri	Jetpur Pavi	Vadodara
Magiya	Jetpur Pavi	Vadodara
Kadvakuva	Jetpur Pavi	Vadodara
Limbani	Jetpur Pavi	Vadodara
Bamroli	Jetpur Pavi	Vadodara
Shivajipura	Jetpur Pavi	Vadodara
Valothi	Jetpur Pavi	Vadodara
Vajpur	Jetpur Pavi	Vadodara
Mota Kantva	Jetpur Pavi	Vadodara
Nana Kantva	Jetpur Pavi	Vadodara
Fatepura	Jetpur Pavi	Vadodara
Vanki	Jetpur Pavi	Vadodara
Moti Bej	Jetpur Pavi	Vadodara
Sajod	Jetpur Pavi	Vadodara
Umarva	Jetpur Pavi	Vadodara
Khandiya Amadara	Jetpur Pavi	Vadodara
Uchapan	Jetpur Pavi	Vadodara
Ghagharpura	Jetpur Pavi	Vadodara
Segvasimli	Jetpur Pavi	Vadodara
Fata	Jetpur Pavi	Vadodara
Koliyari	Jetpur Pavi	Vadodara
Vaghava	Jetpur Pavi	Vadodara
Paliya	Jetpur Pavi	Vadodara
Tarapur	Jetpur Pavi	Vadodara
Rampura	Jetpur Pavi	Vadodara
Vav	Jetpur Pavi	Vadodara
Pavi	Jetpur Pavi	Vadodara
Moti Rasli	Jetpur Pavi	Vadodara
Nani Rasli	Jetpur Pavi	Vadodara
Thalki	Jetpur Pavi	Vadodara
Dabherai	Jetpur Pavi	Vadodara
Gogadiya	Jetpur Pavi	Vadodara
Motipura (Gadoth)	Jetpur Pavi	Vadodara
Nani Bumdi	Jetpur Pavi	Vadodara
Lodhan	Jetpur Pavi	Vadodara
Mesara	Jetpur Pavi	Vadodara
Vankol	Jetpur Pavi	Vadodara
Sihod	Jetpur Pavi	Vadodara
Moti Bumdi	Jetpur Pavi	Vadodara
Patiya	Jetpur Pavi	Vadodara
Nana Butiyapura	Jetpur Pavi	Vadodara
Mota Butiyapura	Jetpur Pavi	Vadodara
Ranbhun	Jetpur Pavi	Vadodara
Amalpur	Jetpur Pavi	Vadodara
Gadoth	Jetpur Pavi	Vadodara
Moti Tejavav	Jetpur Pavi	Vadodara
Khandivav	Jetpur Pavi	Vadodara
Pratapnagar	Jetpur Pavi	Vadodara
Sithol	Jetpur Pavi	Vadodara
Aniyadri	Jetpur Pavi	Vadodara
Moti Amrol	Jetpur Pavi	Vadodara
Sengpur	Jetpur Pavi	Vadodara
Tamboliya	Jetpur Pavi	Vadodara
Chudel	Jetpur Pavi	Vadodara
Ambadi	Jetpur Pavi	Vadodara
Bhensavahi	Jetpur Pavi	Vadodara
Suskal	Jetpur Pavi	Vadodara
Nani Tejavav	Jetpur Pavi	Vadodara
Kukna	Jetpur Pavi	Vadodara
Chapargota	Jetpur Pavi	Vadodara
Jivanpura	Jetpur Pavi	Vadodara
Timbi	Jetpur Pavi	Vadodara
Pandhara	Jetpur Pavi	Vadodara
Visadi	Jetpur Pavi	Vadodara
Dholivav	Jetpur Pavi	Vadodara
Jabugam	Jetpur Pavi	Vadodara
Baravad	Jetpur Pavi	Vadodara
Harakhpur	Jetpur Pavi	Vadodara
Kohivav	Jetpur Pavi	Vadodara
Vavdi	Jetpur Pavi	Vadodara
Majigam	Jetpur Pavi	Vadodara
Chhotanagar	Jetpur Pavi	Vadodara
Ratanpur	Jetpur Pavi	Vadodara
Khandiyakuva	Jetpur Pavi	Vadodara
Polanpur	Jetpur Pavi	Vadodara
Muldhar	Jetpur Pavi	Vadodara
Tokarva	Jetpur Pavi	Vadodara
Chachak	Jetpur Pavi	Vadodara
Simaliya	Jetpur Pavi	Vadodara
Tadkachhala	Jetpur Pavi	Vadodara
Vanta	Jetpur Pavi	Vadodara
Vaddhari	Jetpur Pavi	Vadodara
Khadakla	Jetpur Pavi	Vadodara
Vadatalav	Jetpur Pavi	Vadodara
Gaidiya	Jetpur Pavi	Vadodara
Sakhandra	Jetpur Pavi	Vadodara
Devmori	Jetpur Pavi	Vadodara
Gajra	Jetpur Pavi	Vadodara
Bordha	Jetpur Pavi	Vadodara
Degla	Jetpur Pavi	Vadodara
Pandharva	Jetpur Pavi	Vadodara
Sajuli	Jetpur Pavi	Vadodara
Nani Amrol	Jetpur Pavi	Vadodara
Bandi	Jetpur Pavi	Vadodara
Kosum	Jetpur Pavi	Vadodara
Deriya	Jetpur Pavi	Vadodara
Kalarani	Jetpur Pavi	Vadodara
Vantada	Jetpur Pavi	Vadodara
Dharoliya (Sakhandra)	Jetpur Pavi	Vadodara
Kothiya	Jetpur Pavi	Vadodara
Sadadhari	Jetpur Pavi	Vadodara
Sherpura	Jetpur Pavi	Vadodara
Valpari	Jetpur Pavi	Vadodara
Undva	Jetpur Pavi	Vadodara
Haripura	Jetpur Pavi	Vadodara
Karsan	Jetpur Pavi	Vadodara
Rajpur (Karali)	Jetpur Pavi	Vadodara
Bhindol	Jetpur Pavi	Vadodara
Dharoliya Bhindol	Jetpur Pavi	Vadodara
Ambazati	Jetpur Pavi	Vadodara
Zab (Sajva)	Jetpur Pavi	Vadodara
Ghodiyala	Jetpur Pavi	Vadodara
Sadhali	Jetpur Pavi	Vadodara
Pratappura	Jetpur Pavi	Vadodara
Kavara	Jetpur Pavi	Vadodara
Chimli	Jetpur Pavi	Vadodara
Panibar	Jetpur Pavi	Vadodara
Saloj	Jetpur Pavi	Vadodara
Ghodaj	Jetpur Pavi	Vadodara
Mota Amadra (Chhatrali)	Jetpur Pavi	Vadodara
Chundheli	Jetpur Pavi	Vadodara
Kadachhala	Jetpur Pavi	Vadodara
Nana Amadra (Chhatrali)	Jetpur Pavi	Vadodara
Chhatrali	Jetpur Pavi	Vadodara
Karali	Jetpur Pavi	Vadodara
Thambhla	Jetpur Pavi	Vadodara
Sajva	Jetpur Pavi	Vadodara
Ambalag	Jetpur Pavi	Vadodara
Vankala	Jetpur Pavi	Vadodara
Karajvant	Jetpur Pavi	Vadodara
Jitnagar	Jetpur Pavi	Vadodara
Mora Dungari	Jetpur Pavi	Vadodara
Navi Rudhi	Jetpur Pavi	Vadodara
Ferkuva	Jetpur Pavi	Vadodara
Simal Ghoda	Jetpur Pavi	Vadodara
Khareda	Jetpur Pavi	Vadodara
Bhorda	Jetpur Pavi	Vadodara
Nani Vant	Jetpur Pavi	Vadodara
Vanadha	Jetpur Pavi	Vadodara
Juni Rudhi	Jetpur Pavi	Vadodara
Juna Timbarva	Jetpur Pavi	Vadodara
Nava Timbarva	Jetpur Pavi	Vadodara
Badaliya	Jetpur Pavi	Vadodara
Chalamali	Jetpur Pavi	Vadodara
Moti Vant	Jetpur Pavi	Vadodara
Rajvasana	Jetpur Pavi	Vadodara
Rajbodeli	Jetpur Pavi	Vadodara
Un	Jetpur Pavi	Vadodara
Navagam	Jetpur Pavi	Vadodara
Vadivada	Jetpur Pavi	Vadodara
Athavali	Jetpur Pavi	Vadodara
Mavali	Jetpur Pavi	Vadodara
Bhilvaniya	Jetpur Pavi	Vadodara
Zoz	Jetpur Pavi	Vadodara
Unada	Jetpur Pavi	Vadodara
Untkoi	Jetpur Pavi	Vadodara
Chethapur	Jetpur Pavi	Vadodara
Ambakhut	Jetpur Pavi	Vadodara
Motipura (Kadval)	Jetpur Pavi	Vadodara
Dhanpur	Jetpur Pavi	Vadodara
Chaina	Jetpur Pavi	Vadodara
Muthai	Jetpur Pavi	Vadodara
Sagadra	Jetpur Pavi	Vadodara
Kevdi	Chhota Udaipur	Vadodara
Marchipani	Chhota Udaipur	Vadodara
Singlaja	Chhota Udaipur	Vadodara
Kakadkund	Chhota Udaipur	Vadodara
Rinchhvel	Chhota Udaipur	Vadodara
Dhorkuva	Chhota Udaipur	Vadodara
Gadola	Chhota Udaipur	Vadodara
Kothara	Chhota Udaipur	Vadodara
Mithibor	Chhota Udaipur	Vadodara
Dobachapura	Chhota Udaipur	Vadodara
Dholisimel	Chhota Udaipur	Vadodara
Dungarbhint	Chhota Udaipur	Vadodara
Limbani	Chhota Udaipur	Vadodara
Ranikheda	Chhota Udaipur	Vadodara
Jamli (Jer)	Chhota Udaipur	Vadodara
Dun	Chhota Udaipur	Vadodara
Vadhvan	Chhota Udaipur	Vadodara
Mal	Chhota Udaipur	Vadodara
Dhadagam	Chhota Udaipur	Vadodara
Kumbhani	Chhota Udaipur	Vadodara
Navagam	Chhota Udaipur	Vadodara
Dolariya	Chhota Udaipur	Vadodara
Guda	Chhota Udaipur	Vadodara
Mandalva	Chhota Udaipur	Vadodara
Vachalibhint	Chhota Udaipur	Vadodara
Bandibhint	Chhota Udaipur	Vadodara
Alsipur	Chhota Udaipur	Vadodara
Virpur	Chhota Udaipur	Vadodara
Lagami	Chhota Udaipur	Vadodara
Ghoghadev	Chhota Udaipur	Vadodara
Jadiyana	Chhota Udaipur	Vadodara
Sanada	Chhota Udaipur	Vadodara
Koli	Chhota Udaipur	Vadodara
Ukhalvant	Chhota Udaipur	Vadodara
Khodvaniya	Chhota Udaipur	Vadodara
Zoz	Chhota Udaipur	Vadodara
Zinzarvani	Chhota Udaipur	Vadodara
Khos	Chhota Udaipur	Vadodara
Kikawada	Chhota Udaipur	Vadodara
Palsanda	Chhota Udaipur	Vadodara
Siloj	Chhota Udaipur	Vadodara
Malu	Chhota Udaipur	Vadodara
Bhilpur	Chhota Udaipur	Vadodara
Chorvana	Chhota Udaipur	Vadodara
Ozadi	Chhota Udaipur	Vadodara
Baroj	Chhota Udaipur	Vadodara
Kachhel (Kanavant)	Chhota Udaipur	Vadodara
Antroli	Chhota Udaipur	Vadodara
Chiliyavant (Antroli)	Chhota Udaipur	Vadodara
Vagalwada	Chhota Udaipur	Vadodara
Mithali	Chhota Udaipur	Vadodara
Gunata	Chhota Udaipur	Vadodara
Kol	Chhota Udaipur	Vadodara
Bokadiya	Chhota Udaipur	Vadodara
Kokadpa	Chhota Udaipur	Vadodara
Mota Rampura	Chhota Udaipur	Vadodara
Nana Rampura	Chhota Udaipur	Vadodara
Odhi	Chhota Udaipur	Vadodara
Bandala	Chhota Udaipur	Vadodara
Balavant	Chhota Udaipur	Vadodara
Rajuvant	Chhota Udaipur	Vadodara
Diyavant	Chhota Udaipur	Vadodara
Koliyathar	Chhota Udaipur	Vadodara
Katarvant	Chhota Udaipur	Vadodara
Bedvi	Chhota Udaipur	Vadodara
Chanduvant	Chhota Udaipur	Vadodara
Kanavant	Chhota Udaipur	Vadodara
Potiya	Chhota Udaipur	Vadodara
Ode	Chhota Udaipur	Vadodara
Achheta	Chhota Udaipur	Vadodara
Achhala	Chhota Udaipur	Vadodara
Chichod	Chhota Udaipur	Vadodara
Rozkuva	Chhota Udaipur	Vadodara
Devaliya	Chhota Udaipur	Vadodara
Tejgadh	Chhota Udaipur	Vadodara
Gungawada	Chhota Udaipur	Vadodara
Jaloda	Chhota Udaipur	Vadodara
Vijol	Chhota Udaipur	Vadodara
Chilarvant	Chhota Udaipur	Vadodara
Zer	Chhota Udaipur	Vadodara
Dadigam	Chhota Udaipur	Vadodara
Chathawada	Chhota Udaipur	Vadodara
Padaliya	Chhota Udaipur	Vadodara
Lehvant	Chhota Udaipur	Vadodara
Hansda	Chhota Udaipur	Vadodara
Timla	Chhota Udaipur	Vadodara
Kanas	Chhota Udaipur	Vadodara
Bhordali	Chhota Udaipur	Vadodara
Bilvant	Chhota Udaipur	Vadodara
Rozva	Chhota Udaipur	Vadodara
Bhorda	Chhota Udaipur	Vadodara
Simalkuva	Chhota Udaipur	Vadodara
Khadakwada	Chhota Udaipur	Vadodara
Rangpur (Zoz)	Chhota Udaipur	Vadodara
Nani Sadhli	Chhota Udaipur	Vadodara
Chisadiya	Chhota Udaipur	Vadodara
Harpalpura	Chhota Udaipur	Vadodara
Nakamli	Chhota Udaipur	Vadodara
Ambala	Chhota Udaipur	Vadodara
Vanar	Chhota Udaipur	Vadodara
Malaja	Chhota Udaipur	Vadodara
Khajuriya	Chhota Udaipur	Vadodara
Dumali	Chhota Udaipur	Vadodara
Talav Faliya	Chhota Udaipur	Vadodara
Raysingpura (Harvant)	Chhota Udaipur	Vadodara
Maldhi	Chhota Udaipur	Vadodara
Puniyavant	Chhota Udaipur	Vadodara
Ekalbara	Chhota Udaipur	Vadodara
Kasara	Chhota Udaipur	Vadodara
Jamla	Chhota Udaipur	Vadodara
Surkheda	Chhota Udaipur	Vadodara
Dhamodi	Chhota Udaipur	Vadodara
Sursi	Chhota Udaipur	Vadodara
Moti Sadhli	Chhota Udaipur	Vadodara
Judavant	Chhota Udaipur	Vadodara
Ferkuva	Chhota Udaipur	Vadodara
Khadkhad	Chhota Udaipur	Vadodara
Bodgam	Chhota Udaipur	Vadodara
Tundva	Chhota Udaipur	Vadodara
Kachhel	Chhota Udaipur	Vadodara
Vasedi	Chhota Udaipur	Vadodara
Khuntaliya	Chhota Udaipur	Vadodara
Dhandhoda	Chhota Udaipur	Vadodara
Dharmaj	Chhota Udaipur	Vadodara
Harvant	Chhota Udaipur	Vadodara
Simal Faliya	Chhota Udaipur	Vadodara
Padharvant	Chhota Udaipur	Vadodara
Oliamba	Chhota Udaipur	Vadodara
Ghelvant	Chhota Udaipur	Vadodara
Runvad	Chhota Udaipur	Vadodara
Juna Udaipur	Chhota Udaipur	Vadodara
Gabadiya	Chhota Udaipur	Vadodara
Manka (Chhota Udaipur)	Chhota Udaipur	Vadodara
Nalej	Chhota Udaipur	Vadodara
Bopa	Chhota Udaipur	Vadodara
Chokdi	Chhota Udaipur	Vadodara
Bhensa	Chhota Udaipur	Vadodara
Gondariya	Chhota Udaipur	Vadodara
Piplej	Chhota Udaipur	Vadodara
Ganthiya	Chhota Udaipur	Vadodara
Singla	Chhota Udaipur	Vadodara
Luni	Chhota Udaipur	Vadodara
Badvav	Chhota Udaipur	Vadodara
Tenaliya	Chhota Udaipur	Vadodara
Panvad	Kavant	Vadodara
Sinhada	Kavant	Vadodara
Palasda	Kavant	Vadodara
Raychha	Kavant	Vadodara
Chikhli	Kavant	Vadodara
Goddha	Kavant	Vadodara
Gugaliya	Kavant	Vadodara
Kanalva	Kavant	Vadodara
Tava	Kavant	Vadodara
Raypur	Kavant	Vadodara
Morangana	Kavant	Vadodara
Asar	Kavant	Vadodara
Zanzarjol	Kavant	Vadodara
Singalkuva	Kavant	Vadodara
Bagaliya	Kavant	Vadodara
Lalpur	Kavant	Vadodara
Magala Vant	Kavant	Vadodara
Mundamor	Kavant	Vadodara
Rangpur (Kavant)	Kavant	Vadodara
Kherka	Kavant	Vadodara
Jhilava	Kavant	Vadodara
Khatiyavant	Kavant	Vadodara
Manavant	Kavant	Vadodara
Kaidavant	Kavant	Vadodara
Dhanpur	Kavant	Vadodara
Vantda	Kavant	Vadodara
Rumadiya	Kavant	Vadodara
Bhumaswada	Kavant	Vadodara
Kochvad	Kavant	Vadodara
Bediya	Kavant	Vadodara
Roddha	Kavant	Vadodara
Karajvant	Kavant	Vadodara
Dhanpari	Kavant	Vadodara
Nani Tokri	Kavant	Vadodara
Nani Ghodi	Kavant	Vadodara
Mota Ghoda	Kavant	Vadodara
Narukot	Kavant	Vadodara
Mankodi	Kavant	Vadodara
Mota Vanta	Kavant	Vadodara
Jaroi	Kavant	Vadodara
Mandvada	Kavant	Vadodara
Sodhvad	Kavant	Vadodara
Uncheda	Kavant	Vadodara
Khandaniya	Kavant	Vadodara
Vijli	Kavant	Vadodara
Chipan	Kavant	Vadodara
Deri	Kavant	Vadodara
Baladgam	Kavant	Vadodara
Moti Tokri	Kavant	Vadodara
Dungargam	Kavant	Vadodara
Keldhara	Kavant	Vadodara
Pipaldi	Kavant	Vadodara
Pipalda	Kavant	Vadodara
Titod	Kavant	Vadodara
Muset (Jamali)	Kavant	Vadodara
Undva	Kavant	Vadodara
Bordha	Kavant	Vadodara
Moti Sankal	Kavant	Vadodara
Chiliyavant (Kavant)	Kavant	Vadodara
Devadh	Kavant	Vadodara
Kanabeda	Kavant	Vadodara
Jamba	Kavant	Vadodara
Bhekhadiya	Kavant	Vadodara
Nalvant	Kavant	Vadodara
Gajalavant	Kavant	Vadodara
Nakvindhiya	Kavant	Vadodara
Katkavant	Kavant	Vadodara
Kharamda	Kavant	Vadodara
Athadungari	Kavant	Vadodara
Zalavant	Kavant	Vadodara
Amalvant	Kavant	Vadodara
Chapariya	Kavant	Vadodara
Jamli (Muset)	Kavant	Vadodara
Dhaniwada	Kavant	Vadodara
Samalvant	Kavant	Vadodara
Amsota	Kavant	Vadodara
Kasarvav	Kavant	Vadodara
Dhanivadi	Kavant	Vadodara
Khandibara	Kavant	Vadodara
Thadgam	Kavant	Vadodara
Gaidetha	Kavant	Vadodara
Thambhala	Kavant	Vadodara
Patadiya	Kavant	Vadodara
Vankaner	Kavant	Vadodara
Usela	Kavant	Vadodara
Bildha	Kavant	Vadodara
Saidivasan	Kavant	Vadodara
Gelesar	Kavant	Vadodara
Raja Vant	Kavant	Vadodara
Kakanpur	Kavant	Vadodara
Julvaniya	Kavant	Vadodara
Gojariya	Kavant	Vadodara
Navalja	Kavant	Vadodara
Chichva	Kavant	Vadodara
Singalda	Kavant	Vadodara
Renda	Kavant	Vadodara
Bheretha	Kavant	Vadodara
Vagudan	Kavant	Vadodara
Jamali (Vagudan)	Kavant	Vadodara
Rendi	Kavant	Vadodara
Hamirpura	Kavant	Vadodara
Palas Kuva	Kavant	Vadodara
Vajepur	Kavant	Vadodara
Nani Chikhli	Kavant	Vadodara
Aratiya	Kavant	Vadodara
Tadkachhala	Kavant	Vadodara
Moti Kadai	Kavant	Vadodara
Chhodvani	Kavant	Vadodara
Manka (Kavant)	Kavant	Vadodara
Nakhal	Kavant	Vadodara
Talav	Kavant	Vadodara
Hathithan	Kavant	Vadodara
Borchapda	Kavant	Vadodara
Umathi	Kavant	Vadodara
Nana Vanta	Kavant	Vadodara
Koshta	Kavant	Vadodara
Bunjar	Kavant	Vadodara
Raysingpura (Kavant)	Kavant	Vadodara
Mogra	Kavant	Vadodara
Jaduli	Kavant	Vadodara
Bhundmariya	Kavant	Vadodara
Padvani	Kavant	Vadodara
Karvi	Kavant	Vadodara
Khasra	Kavant	Vadodara
Moti Chikhli	Kavant	Vadodara
Kadipani	Kavant	Vadodara
Ambadungar	Kavant	Vadodara
Khandla	Kavant	Vadodara
Kotbi	Kavant	Vadodara
Turkheda	Kavant	Vadodara
Hanf	Kavant	Vadodara
Pandhariya	Kavant	Vadodara
Chosalpura	Nasvadi	Vadodara
Dajipura	Nasvadi	Vadodara
Kothiya	Nasvadi	Vadodara
Kalidori	Nasvadi	Vadodara
Kesarpura	Nasvadi	Vadodara
Damoli	Nasvadi	Vadodara
Hamirpura	Nasvadi	Vadodara
Ambapura	Nasvadi	Vadodara
Bhaka	Nasvadi	Vadodara
Sindhadiya	Nasvadi	Vadodara
Khadakiya	Nasvadi	Vadodara
Khareda	Nasvadi	Vadodara
Choramal	Nasvadi	Vadodara
Modhala	Nasvadi	Vadodara
Dedkiamli	Nasvadi	Vadodara
Timba	Nasvadi	Vadodara
Kolamba	Nasvadi	Vadodara
Velari	Nasvadi	Vadodara
Vaghiyamahuda	Nasvadi	Vadodara
Sindhikuva (Chametha)	Nasvadi	Vadodara
Bhagvanpura (Nasvadi)	Nasvadi	Vadodara
Chametha	Nasvadi	Vadodara
Intiya	Nasvadi	Vadodara
Mahebutpura	Nasvadi	Vadodara
Linda	Nasvadi	Vadodara
Payakoi	Nasvadi	Vadodara
Kamboya	Nasvadi	Vadodara
Rampuri	Nasvadi	Vadodara
Haripura (Nasvadi)	Nasvadi	Vadodara
Anandpuri	Nasvadi	Vadodara
Chunakhan	Nasvadi	Vadodara
Vegannar	Nasvadi	Vadodara
Kukavati	Nasvadi	Vadodara
Sukapura	Nasvadi	Vadodara
Piplaj	Nasvadi	Vadodara
Ratanpura	Nasvadi	Vadodara
Waghach	Nasvadi	Vadodara
Dani	Nasvadi	Vadodara
Pankhada (Khichadiya)	Nasvadi	Vadodara
Matora	Nasvadi	Vadodara
Khichadiya (Maldungra)	Nasvadi	Vadodara
Bhil Boriyad	Nasvadi	Vadodara
Khadakiya (Boriyad)	Nasvadi	Vadodara
Sodhaliya	Nasvadi	Vadodara
Palasani	Nasvadi	Vadodara
Jajva	Nasvadi	Vadodara
Sodat	Nasvadi	Vadodara
Tadkachhla	Nasvadi	Vadodara
Kandva	Nasvadi	Vadodara
Koyari	Nasvadi	Vadodara
Valpura	Nasvadi	Vadodara
Akona	Nasvadi	Vadodara
Pothlipura	Nasvadi	Vadodara
Dhamasiya	Nasvadi	Vadodara
Ghodisimel	Nasvadi	Vadodara
Bedikuva	Nasvadi	Vadodara
Rayasingpura	Nasvadi	Vadodara
Jitpura	Nasvadi	Vadodara
Nannupura	Nasvadi	Vadodara
Kelaniya	Nasvadi	Vadodara
Vadiya (Sodhaliya)	Nasvadi	Vadodara
Moradiya	Nasvadi	Vadodara
Kakadvani	Nasvadi	Vadodara
Khokhara	Nasvadi	Vadodara
Haripura (Boriyad)	Nasvadi	Vadodara
Koli Boriyad	Nasvadi	Vadodara
Raneda	Nasvadi	Vadodara
Kalkoch	Nasvadi	Vadodara
Borvani	Nasvadi	Vadodara
Vankla	Nasvadi	Vadodara
Patadiya	Nasvadi	Vadodara
Bofa	Nasvadi	Vadodara
Dhandhaniya	Nasvadi	Vadodara
Dhaniya Umarva	Nasvadi	Vadodara
Chhaktar Umarva	Nasvadi	Vadodara
Sengpur	Nasvadi	Vadodara
Saripani	Nasvadi	Vadodara
Kandha	Nasvadi	Vadodara
Rajpura	Nasvadi	Vadodara
Dholi Kotardi	Nasvadi	Vadodara
Thunpura	Nasvadi	Vadodara
Karamdi	Nasvadi	Vadodara
Vantda	Nasvadi	Vadodara
Pochamba	Nasvadi	Vadodara
Khodiya	Nasvadi	Vadodara
Palsar	Nasvadi	Vadodara
Pala	Nasvadi	Vadodara
Kolu	Nasvadi	Vadodara
Bharoswadi	Nasvadi	Vadodara
Vadiya	Nasvadi	Vadodara
Jemalgadh	Nasvadi	Vadodara
Kankuvasan	Nasvadi	Vadodara
Vadadli	Nasvadi	Vadodara
Zarkhali	Nasvadi	Vadodara
Amroli	Nasvadi	Vadodara
Sandhiya	Nasvadi	Vadodara
Khambhayta	Nasvadi	Vadodara
Navagam (Nani Navagami)	Nasvadi	Vadodara
Chandanpura	Nasvadi	Vadodara
Umarkoi	Nasvadi	Vadodara
Zer	Nasvadi	Vadodara
Borkhad	Nasvadi	Vadodara
Batupalasadi	Nasvadi	Vadodara
Kamlavasan	Nasvadi	Vadodara
Dabhen	Nasvadi	Vadodara
Simalkhadu	Nasvadi	Vadodara
Bagaliya	Nasvadi	Vadodara
Vaguma	Nasvadi	Vadodara
Ramapalasadi	Nasvadi	Vadodara
Ratakadav	Nasvadi	Vadodara
Jamli	Nasvadi	Vadodara
Ranipura	Nasvadi	Vadodara
Raypur	Nasvadi	Vadodara
Bharwada	Nasvadi	Vadodara
Baroli	Nasvadi	Vadodara
Khapariya	Nasvadi	Vadodara
Roziya	Nasvadi	Vadodara
Sindhikuva (Roziya)	Nasvadi	Vadodara
Botiyakuva	Nasvadi	Vadodara
Kadikuva	Nasvadi	Vadodara
Haripura(Vadeshiya)	Nasvadi	Vadodara
Chhaththiamli	Nasvadi	Vadodara
Bhutkhan	Nasvadi	Vadodara
Khushalpura	Nasvadi	Vadodara
Undakotar	Nasvadi	Vadodara
Vandriya	Nasvadi	Vadodara
Chhevat	Nasvadi	Vadodara
Hanlli	Nasvadi	Vadodara
Nana Vant	Nasvadi	Vadodara
Vasvani	Nasvadi	Vadodara
Chhalvant	Nasvadi	Vadodara
Nani Kadai	Nasvadi	Vadodara
Bari Mahuda	Nasvadi	Vadodara
Dughdha	Nasvadi	Vadodara
Ghutiya Amba	Nasvadi	Vadodara
Bhangiyavad	Nasvadi	Vadodara
Ratanpura (Kaprali)	Nasvadi	Vadodara
Nani Zari	Nasvadi	Vadodara
Bilgam	Nasvadi	Vadodara
Moti Zari	Nasvadi	Vadodara
Simel	Nasvadi	Vadodara
Gadh	Nasvadi	Vadodara
Samarpura	Nasvadi	Vadodara
Vadeshiya	Nasvadi	Vadodara
Pani Mahuda	Nasvadi	Vadodara
Sankal(Tankhala)	Nasvadi	Vadodara
Tankhala	Nasvadi	Vadodara
Shankarvav	Nasvadi	Vadodara
Kasumbiya	Nasvadi	Vadodara
Khokhra (Tankhala)	Nasvadi	Vadodara
Nakhalpur	Nasvadi	Vadodara
Jakshi	Nasvadi	Vadodara
Ghatasa	Nasvadi	Vadodara
Fatepur	Nasvadi	Vadodara
Goyavant (Rengani)	Nasvadi	Vadodara
Lavakoi	Nasvadi	Vadodara
Katkuva	Nasvadi	Vadodara
Fulwadi	Nasvadi	Vadodara
Ghoda	Nasvadi	Vadodara
Tarol	Nasvadi	Vadodara
Mediya	Nasvadi	Vadodara
Dhamaniya Amba	Nasvadi	Vadodara
Andhani	Nasvadi	Vadodara
Khermal	Nasvadi	Vadodara
Nani Jaduli	Nasvadi	Vadodara
Ghatamali	Nasvadi	Vadodara
Kaduli Mahudi	Nasvadi	Vadodara
Viyavant	Nasvadi	Vadodara
Reliya Amba	Nasvadi	Vadodara
Pisayata (Digneol)	Nasvadi	Vadodara
Hariyabar	Nasvadi	Vadodara
Bhagvanpura (Pankhada)	Nasvadi	Vadodara
Jitnagar	Nasvadi	Vadodara
Jamba (Jivanpura)	Nasvadi	Vadodara
Vanki Khakhar	Nasvadi	Vadodara
Jambughoda	Nasvadi	Vadodara
Kaliyapura	Nasvadi	Vadodara
Simaliya	Nasvadi	Vadodara
Suklivasan	Nasvadi	Vadodara
Ambada	Nasvadi	Vadodara
Pankhada (Jitnagar)	Nasvadi	Vadodara
Narda	Nasvadi	Vadodara
Kukarda	Nasvadi	Vadodara
Sankal	Nasvadi	Vadodara
Gheswadi	Nasvadi	Vadodara
Dekoch	Nasvadi	Vadodara
Chavariya	Nasvadi	Vadodara
Sindhipani	Nasvadi	Vadodara
Khetanbar	Nasvadi	Vadodara
Kevadi	Nasvadi	Vadodara
Sariyapani	Nasvadi	Vadodara
Radhani Pani	Nasvadi	Vadodara
Kantiyabar	Nasvadi	Vadodara
Kumetha	Nasvadi	Vadodara
Dharsimel	Nasvadi	Vadodara
Nishana	Nasvadi	Vadodara
Ranbor	Nasvadi	Vadodara
Budha Jaldhuni	Nasvadi	Vadodara
Matha Jaldhuni	Nasvadi	Vadodara
Amta	Nasvadi	Vadodara
Udet	Nasvadi	Vadodara
Harkhod	Nasvadi	Vadodara
Talav	Nasvadi	Vadodara
Kunda	Nasvadi	Vadodara
Ganiyar Bari	Nasvadi	Vadodara
Wadia (Lavakoi)	Nasvadi	Vadodara
Khokhra(Lavakoi)	Nasvadi	Vadodara
Dabba	Nasvadi	Vadodara
Piplvani	Nasvadi	Vadodara
Chhoti Umer	Nasvadi	Vadodara
Khenda	Nasvadi	Vadodara
Sankadibari	Nasvadi	Vadodara
Kuppa	Nasvadi	Vadodara
Dhumna	Nasvadi	Vadodara
Chharbara	Nasvadi	Vadodara
Antras	Nasvadi	Vadodara
Kadada (Girkheda)	Nasvadi	Vadodara
Ferkada (Kharkhada)	Nasvadi	Vadodara
Sagava	Sankheda	Vadodara
Zand	Sankheda	Vadodara
Lanbhiya	Sankheda	Vadodara
Mota Raska	Sankheda	Vadodara
Bobdakuva	Sankheda	Vadodara
Nani Raski	Sankheda	Vadodara
Kathiyari	Sankheda	Vadodara
Jesingpura	Sankheda	Vadodara
Motipura	Sankheda	Vadodara
Gajipura	Sankheda	Vadodara
Targol	Sankheda	Vadodara
Rajpari	Sankheda	Vadodara
Achhali	Sankheda	Vadodara
Vandarda	Sankheda	Vadodara
Khandiya	Sankheda	Vadodara
Kharakuva	Sankheda	Vadodara
Pachisgam	Sankheda	Vadodara
Bamkui	Sankheda	Vadodara
Morakhala	Sankheda	Vadodara
Ratanpur (Thana)	Sankheda	Vadodara
Kathmandva	Sankheda	Vadodara
Navapura	Sankheda	Vadodara
Rajkherva	Sankheda	Vadodara
Kherva	Sankheda	Vadodara
Zankharpura	Sankheda	Vadodara
Salpura	Sankheda	Vadodara
Samdhi	Sankheda	Vadodara
Garol	Sankheda	Vadodara
Kundiuncha Kalam	Sankheda	Vadodara
Laved	Sankheda	Vadodara
Sanoli	Sankheda	Vadodara
Fata	Sankheda	Vadodara
Khokhariveri	Sankheda	Vadodara
Malu	Sankheda	Vadodara
Kandevar	Sankheda	Vadodara
Dormar	Sankheda	Vadodara
Kundi Tappe Bahadarpur	Sankheda	Vadodara
Surya	Sankheda	Vadodara
Pitha	Sankheda	Vadodara
Patna	Sankheda	Vadodara
Bamroli	Sankheda	Vadodara
Kadila	Sankheda	Vadodara
Dhokaliya	Sankheda	Vadodara
Modasar	Sankheda	Vadodara
Ajali	Sankheda	Vadodara
Alhadpura	Sankheda	Vadodara
Mankani	Sankheda	Vadodara
Pichhuwada	Sankheda	Vadodara
Jojva	Sankheda	Vadodara
Bhadrali	Sankheda	Vadodara
Bhulvan	Sankheda	Vadodara
Undi	Sankheda	Vadodara
Lotiya	Sankheda	Vadodara
Kavitha	Sankheda	Vadodara
Hareshwar	Sankheda	Vadodara
Kasumbiya	Sankheda	Vadodara
Anandpura	Sankheda	Vadodara
Kanteshwar	Sankheda	Vadodara
Gola Gamdi	Sankheda	Vadodara
Manjrol	Sankheda	Vadodara
Chhuchhapura	Sankheda	Vadodara
Akhatyarpura	Sankheda	Vadodara
Nurpur	Sankheda	Vadodara
Vadeli	Sankheda	Vadodara
Biliya	Sankheda	Vadodara
Fafat	Sankheda	Vadodara
Ganeshvad	Sankheda	Vadodara
Vaniyadri	Sankheda	Vadodara
Saniyadari	Sankheda	Vadodara
Tandalja	Sankheda	Vadodara
Bhojpur	Sankheda	Vadodara
Patalpur	Sankheda	Vadodara
Ladhod	Sankheda	Vadodara
Fajalpur	Sankheda	Vadodara
Shekhanpur	Sankheda	Vadodara
Talakpur	Sankheda	Vadodara
Fatepur	Sankheda	Vadodara
Gojpur	Sankheda	Vadodara
Sankheda	Sankheda	Vadodara
Bahadarpur	Sankheda	Vadodara
Vadadli	Sankheda	Vadodara
Nagarwada	Sankheda	Vadodara
Akakheda	Sankheda	Vadodara
Dholi	Sankheda	Vadodara
Morad	Sankheda	Vadodara
Sunderpura	Sankheda	Vadodara
Ambapura	Sankheda	Vadodara
Dholpur	Sankheda	Vadodara
Jogipura	Sankheda	Vadodara
Dharoli	Sankheda	Vadodara
Chhatrapura	Sankheda	Vadodara
Geharpura	Sankheda	Vadodara
Khodiya	Sankheda	Vadodara
Vadadla (Chorangla)	Sankheda	Vadodara
Amroli	Sankheda	Vadodara
Ghoda (Chorangla)	Sankheda	Vadodara
Timbi	Sankheda	Vadodara
Sarsinda (Chhachha)	Sankheda	Vadodara
Hansapura	Sankheda	Vadodara
Manpur	Sankheda	Vadodara
Handod	Sankheda	Vadodara
Pipalsat	Sankheda	Vadodara
Aritha	Sankheda	Vadodara
Govindpura	Sankheda	Vadodara
Gundicha	Sankheda	Vadodara
Raipur	Sankheda	Vadodara
Pipaliya	Sankheda	Vadodara
Malpur	Sankheda	Vadodara
Gunder	Sankheda	Vadodara
Khandupura	Sankheda	Vadodara
Zampa	Sankheda	Vadodara
Vejaliya	Sankheda	Vadodara
Sarsinda (Jharvan)	Sankheda	Vadodara
Deroli	Sankheda	Vadodara
Sarsinda (Cho)	Sankheda	Vadodara
Kapadiya	Sankheda	Vadodara
Chhachhadra	Sankheda	Vadodara
Panej	Sankheda	Vadodara
Savjipura	Sankheda	Vadodara
Desan	Sankheda	Vadodara
Ramsingpura	Sankheda	Vadodara
Kuberpura	Sankheda	Vadodara
Chorangla	Sankheda	Vadodara
Vatvatiya	Sankheda	Vadodara
Kachhata	Sankheda	Vadodara
Bhatpur	Sankheda	Vadodara
Timba	Sankheda	Vadodara
Khunvad	Sankheda	Vadodara
Damapura	Sankheda	Vadodara
Saradiya	Sankheda	Vadodara
Kadvakui	Sankheda	Vadodara
Mobhiya	Sankheda	Vadodara
Ratanpur (Kamaraj)	Sankheda	Vadodara
Damoli	Sankheda	Vadodara
Kotali	Sankheda	Vadodara
Tanakhala	Sankheda	Vadodara
Divalipura	Sankheda	Vadodara
Rampura	Sankheda	Vadodara
Vadiya (Bihora)	Sankheda	Vadodara
Karali	Sankheda	Vadodara
Pratappura	Sankheda	Vadodara
Vadiya (Raipur)	Sankheda	Vadodara
Ghoda (Bo)	Sankheda	Vadodara
Bor Talav	Sankheda	Vadodara
Indral	Sankheda	Vadodara
Vaghetha	Sankheda	Vadodara
Sardarpura	Sankheda	Vadodara
Sargi	Sankheda	Vadodara
Kosindra	Sankheda	Vadodara
Chikhodra	Sankheda	Vadodara
Vasana	Sankheda	Vadodara
Vadadla	Sankheda	Vadodara
Lachhras	Sankheda	Vadodara
Ramsari	Sankheda	Vadodara
Sarangpur	Sankheda	Vadodara
Amarpur	Sankheda	Vadodara
Padvan	Sankheda	Vadodara
Kanakuva	Sankheda	Vadodara
Shree Gam Kanbi	Sankheda	Vadodara
Shreegam Dhanka	Sankheda	Vadodara
Garda	Sankheda	Vadodara
Ghelpur	Sankheda	Vadodara
Gaydiya	Sankheda	Vadodara
Nandpur	Sankheda	Vadodara
Bihora	Sankheda	Vadodara
Kashipura	Sankheda	Vadodara
Sajanpura	Sankheda	Vadodara
Chamarwada	Sankheda	Vadodara
Vasan (Sevada)	Sankheda	Vadodara
Angari	Sankheda	Vadodara
Gamdi Shekhlal	Sankheda	Vadodara
Katholi	Sankheda	Vadodara
Dudhpur	Sankheda	Vadodara
Virampura	Sankheda	Vadodara
Chandpur	Sankheda	Vadodara
Sanadhara	Sankheda	Vadodara
Velpur	Sankheda	Vadodara
Soytha	Sankheda	Vadodara
Songir	Sankheda	Vadodara
Kothiya	Sankheda	Vadodara
Ghantoli	Sankheda	Vadodara
Parvata	Sankheda	Vadodara
Taleti	Sankheda	Vadodara
Lunadra	Sankheda	Vadodara
Sinhadra	Sankheda	Vadodara
Mosampura	Dabhoi	Vadodara
Mahmadpura	Dabhoi	Vadodara
Palaswada	Dabhoi	Vadodara
Rasulpura	Dabhoi	Vadodara
Malharpura	Dabhoi	Vadodara
Saguwada	Dabhoi	Vadodara
Kunvarwada	Dabhoi	Vadodara
Vanadra	Dabhoi	Vadodara
Mavli	Dabhoi	Vadodara
Bhavpura	Dabhoi	Vadodara
Valipura	Dabhoi	Vadodara
Kundhela	Dabhoi	Vadodara
Baherampura	Dabhoi	Vadodara
Navapur	Dabhoi	Vadodara
Bhilapur	Dabhoi	Vadodara
Vayadpur	Dabhoi	Vadodara
Abdalapura	Dabhoi	Vadodara
Kaddharapura	Dabhoi	Vadodara
Kaddhara	Dabhoi	Vadodara
Dholar	Dabhoi	Vadodara
Karali	Dabhoi	Vadodara
Karalipura	Dabhoi	Vadodara
Naranpura	Dabhoi	Vadodara
Bamboj	Dabhoi	Vadodara
Amreshwar	Dabhoi	Vadodara
Lunadra	Dabhoi	Vadodara
Simaliya	Dabhoi	Vadodara
Sunvalja	Dabhoi	Vadodara
Dangiwada	Dabhoi	Vadodara
Pragpura	Dabhoi	Vadodara
Vasaipura	Dabhoi	Vadodara
Vasai	Dabhoi	Vadodara
Gojali	Dabhoi	Vadodara
Banaiya	Dabhoi	Vadodara
Rajli	Dabhoi	Vadodara
Anguthan	Dabhoi	Vadodara
Nariya	Dabhoi	Vadodara
Thuvavi	Dabhoi	Vadodara
Ambav	Dabhoi	Vadodara
Puda	Dabhoi	Vadodara
Hansapura	Dabhoi	Vadodara
Kajapur	Dabhoi	Vadodara
Morpura	Dabhoi	Vadodara
Pansoli	Dabhoi	Vadodara
Akotadar	Dabhoi	Vadodara
Gopalpura	Dabhoi	Vadodara
Vadhvana	Dabhoi	Vadodara
Samsherpura	Dabhoi	Vadodara
Kukad	Dabhoi	Vadodara
Timbi	Dabhoi	Vadodara
Tarsana	Dabhoi	Vadodara
Fartikui	Dabhoi	Vadodara
Vega	Dabhoi	Vadodara
Nada	Dabhoi	Vadodara
Borbar	Dabhoi	Vadodara
Thikariya	Dabhoi	Vadodara
Dangikuva	Dabhoi	Vadodara
Khanpur	Dabhoi	Vadodara
Chhatral	Dabhoi	Vadodara
Sejpura	Dabhoi	Vadodara
Vakhatpura	Dabhoi	Vadodara
Baripura	Dabhoi	Vadodara
Tharvasa	Dabhoi	Vadodara
Boriyad	Dabhoi	Vadodara
Karnet	Dabhoi	Vadodara
Bhimpura (Kukad)	Dabhoi	Vadodara
Juni Mangrol	Dabhoi	Vadodara
Navi Mangrol	Dabhoi	Vadodara
Dharmpuri	Dabhoi	Vadodara
Gamdi (Kanayada)	Dabhoi	Vadodara
Sathod	Dabhoi	Vadodara
Habipura	Dabhoi	Vadodara
Kothara	Dabhoi	Vadodara
Kunvarpura	Dabhoi	Vadodara
Menpura	Dabhoi	Vadodara
Puniyad	Dabhoi	Vadodara
Fofaliya	Dabhoi	Vadodara
Sultanpura	Dabhoi	Vadodara
Parikha	Dabhoi	Vadodara
Mandala	Dabhoi	Vadodara
Kanayada	Dabhoi	Vadodara
Sitpur	Dabhoi	Vadodara
Bhilodiya	Dabhoi	Vadodara
Dharmapura	Dabhoi	Vadodara
Para	Dabhoi	Vadodara
Surajghoda	Dabhoi	Vadodara
Asgol	Dabhoi	Vadodara
Araniya	Dabhoi	Vadodara
Nagdol	Dabhoi	Vadodara
Asodara	Dabhoi	Vadodara
Chanwada	Dabhoi	Vadodara
Ordi	Dabhoi	Vadodara
Vadaj	Dabhoi	Vadodara
Ten Talav	Dabhoi	Vadodara
Shirola	Dabhoi	Vadodara
Pisai	Dabhoi	Vadodara
Karmal	Dabhoi	Vadodara
Kayavarohan	Dabhoi	Vadodara
Lingsthali	Dabhoi	Vadodara
Bananj	Dabhoi	Vadodara
Manpur	Dabhoi	Vadodara
Rajpura	Dabhoi	Vadodara
Paragam	Dabhoi	Vadodara
Akoti	Dabhoi	Vadodara
Sompura	Dabhoi	Vadodara
Bhumasiya	Dabhoi	Vadodara
Gumanpura	Dabhoi	Vadodara
Sanor	Dabhoi	Vadodara
Mandva	Dabhoi	Vadodara
Fulwadi	Dabhoi	Vadodara
Jesangpura	Dabhoi	Vadodara
Bhalodra	Dabhoi	Vadodara
Baglipura	Dabhoi	Vadodara
Gamdi	Dabhoi	Vadodara
Chandod	Dabhoi	Vadodara
Bhimpura	Dabhoi	Vadodara
Nanderiya	Dabhoi	Vadodara
Karnali	Dabhoi	Vadodara
Mahmadpura	Padra	Vadodara
Jaspur	Padra	Vadodara
Sangma	Padra	Vadodara
Tajpura	Padra	Vadodara
Luna	Padra	Vadodara
Umaraya	Padra	Vadodara
Ekalbara	Padra	Vadodara
Mujpur	Padra	Vadodara
Sultanpura	Padra	Vadodara
Dabka	Padra	Vadodara
Pavda	Padra	Vadodara
Chokari	Padra	Vadodara
Tithor	Padra	Vadodara
Dudhwada	Padra	Vadodara
Karkhadi	Padra	Vadodara
Majatan	Padra	Vadodara
Somjipura	Padra	Vadodara
Narsipura	Padra	Vadodara
Dhobikuwa	Padra	Vadodara
Mahuvad	Padra	Vadodara
Dabhasa	Padra	Vadodara
Sokhdakhurd	Padra	Vadodara
Patod	Padra	Vadodara
Darapura	Padra	Vadodara
Ghayaj	Padra	Vadodara
Latipura	Padra	Vadodara
Ranu	Padra	Vadodara
Bhoj	Padra	Vadodara
Vadu	Padra	Vadodara
Vishrampura	Padra	Vadodara
Sandha	Padra	Vadodara
Chitral	Padra	Vadodara
Brahmanvasi	Padra	Vadodara
Masar	Padra	Vadodara
Gametha	Padra	Vadodara
Gavasad	Padra	Vadodara
Lola	Padra	Vadodara
Muval	Padra	Vadodara
Karnakuva	Padra	Vadodara
Vadadla	Padra	Vadodara
Pipli	Padra	Vadodara
Sejakuva	Padra	Vadodara
Goriyad	Padra	Vadodara
Sareja	Padra	Vadodara
Chansad	Padra	Vadodara
Madapur	Padra	Vadodara
Amla	Padra	Vadodara
Sadhi	Padra	Vadodara
Anti	Padra	Vadodara
Rajupura	Padra	Vadodara
Jalalpur	Padra	Vadodara
Kural	Padra	Vadodara
Kanzat	Padra	Vadodara
Abhol	Padra	Vadodara
Pindapa	Padra	Vadodara
Mobha	Padra	Vadodara
Sadra	Padra	Vadodara
Kalyankui	Padra	Vadodara
Ambada	Padra	Vadodara
Bhadara	Padra	Vadodara
Saras Vani	Padra	Vadodara
Shihor	Padra	Vadodara
Thikariya Mubarak	Padra	Vadodara
Virpur	Padra	Vadodara
Medhad	Padra	Vadodara
Husepur	Padra	Vadodara
Bhadari	Padra	Vadodara
Gayapura	Padra	Vadodara
Kanda	Padra	Vadodara
Shanpur	Padra	Vadodara
Sampla	Padra	Vadodara
Danoli	Padra	Vadodara
Bhanpur	Padra	Vadodara
Vanchhara	Padra	Vadodara
Kotna	Padra	Vadodara
Shahera	Padra	Vadodara
Thikariya Math	Padra	Vadodara
Sadad	Padra	Vadodara
Kothwada	Padra	Vadodara
Vasnaref	Padra	Vadodara
Nedra	Padra	Vadodara
Sokhdaraghu	Padra	Vadodara
Virjai	Karjan	Vadodara
Abhara	Karjan	Vadodara
Sambhoi	Karjan	Vadodara
Surwada	Karjan	Vadodara
Manpur	Karjan	Vadodara
Pingalwada	Karjan	Vadodara
Harsunda	Karjan	Vadodara
Bamangam	Karjan	Vadodara
Manglej	Karjan	Vadodara
Kherda	Karjan	Vadodara
Anastu	Karjan	Vadodara
Kurai	Karjan	Vadodara
Khandha	Karjan	Vadodara
Handod	Karjan	Vadodara
Kanabha	Karjan	Vadodara
Chorbhuj	Karjan	Vadodara
Umaj	Karjan	Vadodara
Sanpa	Karjan	Vadodara
Bodaka	Karjan	Vadodara
Kambola	Karjan	Vadodara
Karamadi	Karjan	Vadodara
Kandari	Karjan	Vadodara
Dhanora	Karjan	Vadodara
Gandhara	Karjan	Vadodara
Ganpatpura	Karjan	Vadodara
Vemardi	Karjan	Vadodara
Navi Jithardi	Karjan	Vadodara
Juni Jitharadi	Karjan	Vadodara
Miyagam	Karjan	Vadodara
Mangrol	Karjan	Vadodara
Dhamanja	Karjan	Vadodara
Lakodara	Karjan	Vadodara
Vadava	Karjan	Vadodara
Bharthana	Karjan	Vadodara
Bharthali	Karjan	Vadodara
Dhavat	Karjan	Vadodara
Kurali	Karjan	Vadodara
Vemar	Karjan	Vadodara
Kothav	Karjan	Vadodara
Kasampur	Karjan	Vadodara
Sandarna	Karjan	Vadodara
Osalam	Karjan	Vadodara
Dethan	Karjan	Vadodara
Valan	Karjan	Vadodara
Mesrad	Karjan	Vadodara
Mankan	Karjan	Vadodara
Divi	Karjan	Vadodara
Kiya	Karjan	Vadodara
Atali	Karjan	Vadodara
Bachar	Karjan	Vadodara
Choranda	Karjan	Vadodara
Nishaliya	Karjan	Vadodara
Methi	Karjan	Vadodara
Chhanchhva	Karjan	Vadodara
Kala	Karjan	Vadodara
Urad	Karjan	Vadodara
Koliyad	Karjan	Vadodara
Sansrod	Karjan	Vadodara
Haldarva	Karjan	Vadodara
Mantroj	Karjan	Vadodara
Saring	Karjan	Vadodara
Sanapura	Karjan	Vadodara
Saniyad	Karjan	Vadodara
Sarupur Timbi	Karjan	Vadodara
Latipur Timbi	Karjan	Vadodara
Kanthariya	Karjan	Vadodara
Simli	Karjan	Vadodara
Kothiya	Karjan	Vadodara
Ranapur	Karjan	Vadodara
Deroli	Karjan	Vadodara
Fatepur	Karjan	Vadodara
Samri	Karjan	Vadodara
Samra	Karjan	Vadodara
Sherpura	Karjan	Vadodara
Karan	Karjan	Vadodara
Pachhiyapura	Karjan	Vadodara
Delvada	Karjan	Vadodara
Somaj	Karjan	Vadodara
Arjanpura	Karjan	Vadodara
Oz	Karjan	Vadodara
Rarod	Karjan	Vadodara
Ropa	Karjan	Vadodara
Kahona	Karjan	Vadodara
Hirjipura	Karjan	Vadodara
Bakapur	Karjan	Vadodara
Lilod	Karjan	Vadodara
Sayar	Karjan	Vadodara
Malod	Karjan	Vadodara
Sagdol	Karjan	Vadodara
Pura	Karjan	Vadodara
Moti Koral	Karjan	Vadodara
Alampura	Karjan	Vadodara
Nani Koral	Karjan	Vadodara
Timbarva	Sinor	Vadodara
Nana Habipura	Sinor	Vadodara
Garadi	Sinor	Vadodara
Sandha	Sinor	Vadodara
Damnagar	Sinor	Vadodara
Nana Karala	Sinor	Vadodara
Vaniyad	Sinor	Vadodara
Anandi	Sinor	Vadodara
Puniyad	Sinor	Vadodara
Bhekhada	Sinor	Vadodara
Chhanbhoi	Sinor	Vadodara
Achisara	Sinor	Vadodara
Tarva	Sinor	Vadodara
Tinglod	Sinor	Vadodara
Bavaliya	Sinor	Vadodara
Utraj	Sinor	Vadodara
Sadhli	Sinor	Vadodara
Avakhal	Sinor	Vadodara
Malpur	Sinor	Vadodara
Segva	Sinor	Vadodara
Satisana	Sinor	Vadodara
Mota Karala	Sinor	Vadodara
Simli	Sinor	Vadodara
Kukas	Sinor	Vadodara
Tersa	Sinor	Vadodara
Manjrol	Sinor	Vadodara
Mindhol	Sinor	Vadodara
Diver	Sinor	Vadodara
Surasamal	Sinor	Vadodara
Damapura	Sinor	Vadodara
Mota Fofaliya	Sinor	Vadodara
Bithali	Sinor	Vadodara
Dariapura	Sinor	Vadodara
Moletha	Sinor	Vadodara
Ambali	Sinor	Vadodara
Kanjetha	Sinor	Vadodara
Sinor	Sinor	Vadodara
Mandva	Sinor	Vadodara
Malsar	Sinor	Vadodara
Zanzad	Sinor	Vadodara
Barkal	Sinor	Vadodara
Bujetha	Tilakwada	Narmada
Jalodra	Tilakwada	Narmada
Kareli	Tilakwada	Narmada
Sevada	Tilakwada	Narmada
Pindoli	Tilakwada	Narmada
Vora	Tilakwada	Narmada
Shahpura (Tedia)	Tilakwada	Narmada
Fatepur (Vanmala)	Tilakwada	Narmada
Vanmala	Tilakwada	Narmada
Namariya	Tilakwada	Narmada
Sahebpura	Tilakwada	Narmada
Udhai Mandava	Tilakwada	Narmada
Mangu	Tilakwada	Narmada
Limpura	Tilakwada	Narmada
Gamod	Tilakwada	Narmada
Utavali	Tilakwada	Narmada
Fatepur (Vajiriya)	Tilakwada	Narmada
Vajiriya	Tilakwada	Narmada
Umedpura	Tilakwada	Narmada
Amaliya	Tilakwada	Narmada
Kakadiya	Tilakwada	Narmada
Soikuva	Tilakwada	Narmada
Khushalpura	Tilakwada	Narmada
Agar	Tilakwada	Narmada
Himatpura	Tilakwada	Narmada
Jesingpura	Tilakwada	Narmada
Sindhiyapura	Tilakwada	Narmada
Kesarpura	Tilakwada	Narmada
Pichhipura	Tilakwada	Narmada
Nana Vora	Tilakwada	Narmada
Marundhiya	Tilakwada	Narmada
Moriya	Tilakwada	Narmada
Varvada	Tilakwada	Narmada
Nalgam	Tilakwada	Narmada
Mora	Tilakwada	Narmada
Odambiya	Tilakwada	Narmada
Kasotiya	Tilakwada	Narmada
Lilgadh	Tilakwada	Narmada
Dabhed	Tilakwada	Narmada
Dabhiya	Tilakwada	Narmada
Kharod	Tilakwada	Narmada
Limadiya	Tilakwada	Narmada
Kandlej	Tilakwada	Narmada
Surajipura	Tilakwada	Narmada
Ratudiya	Tilakwada	Narmada
Savli	Tilakwada	Narmada
Bandarpura	Tilakwada	Narmada
Namalpur	Tilakwada	Narmada
Zari	Tilakwada	Narmada
Vagheli	Tilakwada	Narmada
Rampuri	Tilakwada	Narmada
Hijdamahudi	Tilakwada	Narmada
Naliya	Tilakwada	Narmada
Chudeshwar	Tilakwada	Narmada
Gansinda	Tilakwada	Narmada
Navapura (Uchad)	Tilakwada	Narmada
Tekra Kamsoli	Tilakwada	Narmada
Hafispura	Tilakwada	Narmada
Rozanar (Dhamanghoda)	Tilakwada	Narmada
Khata Asitara	Tilakwada	Narmada
Zazpura	Tilakwada	Narmada
Puchhapura	Tilakwada	Narmada
Gambhirpura (Chosatiya)	Tilakwada	Narmada
Shira	Tilakwada	Narmada
Godham	Tilakwada	Narmada
Kasundar	Tilakwada	Narmada
Vankol	Tilakwada	Narmada
Navapura (Alva)	Tilakwada	Narmada
Gengadiya	Tilakwada	Narmada
Devaliya	Tilakwada	Narmada
Vandh	Tilakwada	Narmada
Gola Talavadi	Tilakwada	Narmada
Alampur	Tilakwada	Narmada
Tilakwada	Tilakwada	Narmada
Moti Kamsoli	Tilakwada	Narmada
Chitrakhadi	Tilakwada	Narmada
Alva	Tilakwada	Narmada
Indarman	Tilakwada	Narmada
Gochariya	Tilakwada	Narmada
Jetpur	Tilakwada	Narmada
Uchad	Tilakwada	Narmada
Vadiya Tekra	Tilakwada	Narmada
Vadiya (Kalaghoda)	Tilakwada	Narmada
Vasan	Tilakwada	Narmada
Marsan	Tilakwada	Narmada
Dhanikhod	Tilakwada	Narmada
Katkoi	Tilakwada	Narmada
Haripura	Tilakwada	Narmada
Kantharpura	Tilakwada	Narmada
Virpur	Tilakwada	Narmada
Rengan	Tilakwada	Narmada
Vyadhar	Tilakwada	Narmada
Surva	Tilakwada	Narmada
Koyari	Tilakwada	Narmada
Bhadarwa	Tilakwada	Narmada
Ruppura	Tilakwada	Narmada
Ferkuva	Tilakwada	Narmada
Narkhadi	Nandod	Narmada
Poicha	Nandod	Narmada
Kothara	Nandod	Narmada
Pati	Nandod	Narmada
Jior	Nandod	Narmada
Vandaria	Nandod	Narmada
Sondhaliya	Nandod	Narmada
Serav	Nandod	Narmada
Bilthana	Nandod	Narmada
Galupura	Nandod	Narmada
Bhekhadia	Nandod	Narmada
Vanznitad	Nandod	Narmada
Dhefa	Nandod	Narmada
Mithivav	Nandod	Narmada
Panisadadia	Nandod	Narmada
Dhaniala	Nandod	Narmada
Dhobisal	Nandod	Narmada
Mankuva	Nandod	Narmada
Navapara (Garudeshwar)	Nandod	Narmada
Bakhar	Nandod	Narmada
Pan Talavadi	Nandod	Narmada
Vaviala	Nandod	Narmada
Suka	Nandod	Narmada
Songam	Nandod	Narmada
Gunetha	Nandod	Narmada
Borutar	Nandod	Narmada
Chichadia	Nandod	Narmada
Sajanpara	Nandod	Narmada
Chhindiapara	Nandod	Narmada
Guvar	Nandod	Narmada
Tankari	Nandod	Narmada
Anodara	Nandod	Narmada
Rasela	Nandod	Narmada
Jesalpor	Nandod	Narmada
Rundh	Nandod	Narmada
Sisodara	Nandod	Narmada
Ori	Nandod	Narmada
Varkhad	Nandod	Narmada
Patna	Nandod	Narmada
Helambi	Nandod	Narmada
Dhamnacha	Nandod	Narmada
Dhanpor	Nandod	Narmada
Torna	Nandod	Narmada
Bhadam	Nandod	Narmada
Lachhras	Nandod	Narmada
Mangrol	Nandod	Narmada
Rampara (Mangrol)	Nandod	Narmada
Khadagada	Nandod	Narmada
Dhamadra	Nandod	Narmada
Zaria	Nandod	Narmada
Sandhia	Nandod	Narmada
Valpor	Nandod	Narmada
Nasri	Nandod	Narmada
Mankad Amba	Nandod	Narmada
Pinchhipara	Nandod	Narmada
Gadod	Nandod	Narmada
Kumbhia	Nandod	Narmada
Orpa	Nandod	Narmada
Undva	Nandod	Narmada
Samasherpura (Kareliwalu)	Nandod	Narmada
Vadi	Nandod	Narmada
Amadla	Nandod	Narmada
Gabhana	Nandod	Narmada
Garudeshwar	Nandod	Narmada
Akteshwar	Nandod	Narmada
Sanjroli	Nandod	Narmada
Thari	Nandod	Narmada
Rajpipla (Rural) (Kunvarpara)	Nandod	Narmada
Chitravadi	Nandod	Narmada
Hajarpara	Nandod	Narmada
Bhuchhad	Nandod	Narmada
Vaghetha	Nandod	Narmada
Pratappara	Nandod	Narmada
Amarpara	Nandod	Narmada
Navapara (Nikoli)	Nandod	Narmada
Nikoli	Nandod	Narmada
Kandroj	Nandod	Narmada
Varachha	Nandod	Narmada
Navra	Nandod	Narmada
Vaghodia	Nandod	Narmada
Akuvada	Nandod	Narmada
Lodhan	Nandod	Narmada
Virsangpura	Nandod	Narmada
Rampara (Patnawalu)	Nandod	Narmada
Dholivav	Nandod	Narmada
Ranipura	Nandod	Narmada
Bhacharvada	Nandod	Narmada
Karantha	Nandod	Narmada
Kali Makvana	Nandod	Narmada
Nana Zunda	Nandod	Narmada
Sengpara	Nandod	Narmada
Gambhirpara	Nandod	Narmada
Surajvad	Nandod	Narmada
Fulvadi	Nandod	Narmada
Vansla	Nandod	Narmada
Moti Raval	Nandod	Narmada
Nani Raval	Nandod	Narmada
Nana Piparia	Nandod	Narmada
Mota Piparia	Nandod	Narmada
Kothi	Nandod	Narmada
Bhumalia	Nandod	Narmada
Gadkoi	Nandod	Narmada
Naghatpor	Nandod	Narmada
Timrava	Nandod	Narmada
Kareli	Nandod	Narmada
Jetpor (Vaghrali)	Nandod	Narmada
Vaghrali	Nandod	Narmada
Panchla	Nandod	Narmada
Limkhetar	Nandod	Narmada
Mankad Khada	Nandod	Narmada
Gulvani	Nandod	Narmada
Vanazi	Nandod	Narmada
Haripura	Nandod	Narmada
Survani	Nandod	Narmada
Zer	Nandod	Narmada
Khalvani	Nandod	Narmada
Vagadia	Nandod	Narmada
Navagam (Limbdi)	Nandod	Narmada
Vasantpara	Nandod	Narmada
Gora	Nandod	Narmada
Boria	Nandod	Narmada
Indravarna	Nandod	Narmada
Bhanadra	Nandod	Narmada
Nava Vaghpara	Nandod	Narmada
Gopalpura	Nandod	Narmada
Vadia	Nandod	Narmada
Virpor	Nandod	Narmada
Kumasgam	Nandod	Narmada
Timbi	Nandod	Narmada
Rajuvadia	Nandod	Narmada
Rel	Nandod	Narmada
Umarva	Nandod	Narmada
Gamkuva	Nandod	Narmada
Khojalvasa	Nandod	Narmada
Dharikheda	Nandod	Narmada
Amletha	Nandod	Narmada
Taropa	Nandod	Narmada
Dholar	Nandod	Narmada
Ringni	Nandod	Narmada
Navagam (Ramgadh)	Nandod	Narmada
Verisalpara	Nandod	Narmada
Jetpor (Ramgadh)	Nandod	Narmada
Ramgadh	Nandod	Narmada
Nana Limatvada	Nandod	Narmada
Jitnagar	Nandod	Narmada
Vavdi	Nandod	Narmada
Junvad	Nandod	Narmada
Sakva	Nandod	Narmada
Bhilvashi	Nandod	Narmada
Limdi	Nandod	Narmada
Thavadia	Nandod	Narmada
Umarva (Joshivalu)	Nandod	Narmada
Mota Amba	Nandod	Narmada
Samaria	Nandod	Narmada
Velchhandi	Nandod	Narmada
Mota Raypara	Nandod	Narmada
Sundarpura	Nandod	Narmada
Jitgadh	Nandod	Narmada
Vanzar	Nandod	Narmada
Mota Limatvada	Nandod	Narmada
Nana Raipara	Nandod	Narmada
Khamar	Nandod	Narmada
Nana Haidva	Nandod	Narmada
Mota Haidva	Nandod	Narmada
Mayasi	Nandod	Narmada
Chitrol	Nandod	Narmada
Kanpor	Nandod	Narmada
Ghanta	Nandod	Narmada
Kakadva	Nandod	Narmada
Pratapnagar	Nandod	Narmada
Medgam	Nandod	Narmada
Baman Faliya	Nandod	Narmada
Mahudipada	Nandod	Narmada
Nani Chikhli	Nandod	Narmada
Boridra	Nandod	Narmada
Movi	Nandod	Narmada
Mandan (Gorvalun)	Nandod	Narmada
Dhirkhadi	Nandod	Narmada
Mokhdi	Nandod	Narmada
Zarvani	Nandod	Narmada
Junaraj	Nandod	Narmada
Kamodiya	Nandod	Narmada
Mandan (Gaditvalun)	Nandod	Narmada
Moti Chikhli	Nandod	Narmada
Namalgadh	Nandod	Narmada
Gagar	Nandod	Narmada
Amli	Nandod	Narmada
Gadit	Nandod	Narmada
Nani Daberi	Nandod	Narmada
Khunta Amba	Nandod	Narmada
Moji	Nandod	Narmada
Moti Bhamri	Nandod	Narmada
Palsi	Nandod	Narmada
Bitada	Nandod	Narmada
Gadher	Nandod	Narmada
Surpan	Nandod	Narmada
Chapat	Nandod	Narmada
Dadhvada	Nandod	Narmada
Handi	Nandod	Narmada
Dhochki	Nandod	Narmada
Datanambali	Nandod	Narmada
Kadavamahuda(gora)	Nandod	Narmada
Chhatawada	Nandod	Narmada
Galwada	Dediapada	Narmada
Undi	Dediapada	Narmada
Tukner	Dediapada	Narmada
Kanjal	Dediapada	Narmada
Kalvat	Dediapada	Narmada
Vav	Dediapada	Narmada
Chopdi	Dediapada	Narmada
Bogama	Dediapada	Narmada
Vaghumar	Dediapada	Narmada
Pankhala (Mathasar)	Dediapada	Narmada
Mathasar	Dediapada	Narmada
Vandri	Dediapada	Narmada
Kanji	Dediapada	Narmada
Dumkhal	Dediapada	Narmada
Kokam	Dediapada	Narmada
Piplod	Dediapada	Narmada
Sankli	Dediapada	Narmada
Gichad	Dediapada	Narmada
Bebar	Dediapada	Narmada
Fulsar	Dediapada	Narmada
Ladava	Dediapada	Narmada
Kabripathar	Dediapada	Narmada
Kutilpada	Dediapada	Narmada
Koliwada (Pangam)	Dediapada	Narmada
Mojra	Dediapada	Narmada
Gadh	Dediapada	Narmada
Kaltar	Dediapada	Narmada
Panchumar	Dediapada	Narmada
Gadi	Dediapada	Narmada
Bal	Dediapada	Narmada
Juna Mosda	Dediapada	Narmada
Patvali	Dediapada	Narmada
Mathavali	Dediapada	Narmada
Ingavadi	Dediapada	Narmada
Mohbudi	Dediapada	Narmada
Mal	Dediapada	Narmada
Vedchha	Dediapada	Narmada
Arethi	Dediapada	Narmada
Moti Singloti	Dediapada	Narmada
Nani Singloti	Dediapada	Narmada
Khatam	Dediapada	Narmada
Besna	Dediapada	Narmada
Khudadi	Dediapada	Narmada
Koliwada (Bogaj)	Dediapada	Narmada
Bogaj	Dediapada	Narmada
Kishmor	Dediapada	Narmada
Ghantoli	Dediapada	Narmada
Gajar Gota	Dediapada	Narmada
Pangam	Dediapada	Narmada
Soliya	Dediapada	Narmada
Magardev	Dediapada	Narmada
Dhanor	Dediapada	Narmada
Rambhava	Dediapada	Narmada
Khatkankhadi	Dediapada	Narmada
Rakhas Kundi	Dediapada	Narmada
Navagam (Dediapada)	Dediapada	Narmada
Pipla	Dediapada	Narmada
Pansar	Dediapada	Narmada
Chorkotar	Dediapada	Narmada
Babadokti	Dediapada	Narmada
Sukwal	Dediapada	Narmada
Morjadi	Dediapada	Narmada
Samot	Dediapada	Narmada
Hathvadiyo Vad	Dediapada	Narmada
Nani Morkhi	Dediapada	Narmada
Modalvav	Dediapada	Narmada
Goval Patdi	Dediapada	Narmada
Kanbudi	Dediapada	Narmada
Khokhra Umar (Zarnawadiwalu)	Dediapada	Narmada
Nivalda	Dediapada	Narmada
Timbapada	Dediapada	Narmada
Mota Suka Amba	Dediapada	Narmada
Nana Suka Amba	Dediapada	Narmada
Manchhipada	Dediapada	Narmada
Ghodi	Dediapada	Narmada
Baydi	Dediapada	Narmada
Samarpada (Thava)	Dediapada	Narmada
Sejpur	Dediapada	Narmada
Thapavi	Dediapada	Narmada
Moskuwa	Dediapada	Narmada
Jambar	Dediapada	Narmada
Nighat	Dediapada	Narmada
Zarnawadi	Dediapada	Narmada
Ghankhetar	Dediapada	Narmada
Gundva	Dediapada	Narmada
Medyusag	Dediapada	Narmada
Mathakalbi	Dediapada	Narmada
Konvav	Dediapada	Narmada
Nava Mosda	Dediapada	Narmada
Gundvan	Dediapada	Narmada
Saki	Dediapada	Narmada
Menamba	Dediapada	Narmada
Kutilshisha	Dediapada	Narmada
Gangapur	Dediapada	Narmada
Moti Kalbi	Dediapada	Narmada
Kakarpada	Dediapada	Narmada
Tatkhadi	Dediapada	Narmada
Vadivav	Dediapada	Narmada
Mosit	Dediapada	Narmada
Sorapada	Dediapada	Narmada
Shukni Umran	Dediapada	Narmada
Bandi Servan	Dediapada	Narmada
Siyali	Dediapada	Narmada
Gulda Alias Cham	Dediapada	Narmada
Kunbar	Dediapada	Narmada
Chuli	Dediapada	Narmada
Pomla Pada	Dediapada	Narmada
Almavadi	Dediapada	Narmada
Bhatpur	Dediapada	Narmada
Mandala	Dediapada	Narmada
Garda	Dediapada	Narmada
Khajali Dabda	Dediapada	Narmada
Kharchipada	Dediapada	Narmada
Panuda	Dediapada	Narmada
Navagam (Panuda)	Dediapada	Narmada
Rohda	Dediapada	Narmada
Bhukhran	Dediapada	Narmada
Amalipani	Dediapada	Narmada
Kalamkuva	Dediapada	Narmada
Jargam	Dediapada	Narmada
Kukadda	Dediapada	Narmada
Piparipada	Dediapada	Narmada
Kumbhkhadi	Dediapada	Narmada
Samarpada (Sidivalu)	Dediapada	Narmada
Haripura	Dediapada	Narmada
Jamni	Dediapada	Narmada
Tumdavadi	Dediapada	Narmada
Nana Machh	Dediapada	Narmada
Mota Machh	Dediapada	Narmada
Khaydi	Dediapada	Narmada
Gotkhadi	Dediapada	Narmada
Kevdi	Dediapada	Narmada
Kundiamba	Dediapada	Narmada
Ghankhet	Dediapada	Narmada
Nani Korvai	Dediapada	Narmada
Potiyapada	Dediapada	Narmada
Anjanvai	Dediapada	Narmada
Viguna	Dediapada	Narmada
Mulkapada	Dediapada	Narmada
Vadhva	Dediapada	Narmada
Babada	Dediapada	Narmada
Rukhal	Dediapada	Narmada
Khaidipada	Dediapada	Narmada
Boripitha	Dediapada	Narmada
Bharada (Bedada)	Dediapada	Narmada
Bhut Beda Alias Bhut Bangala	Dediapada	Narmada
Tabda	Dediapada	Narmada
Jhank	Dediapada	Narmada
Sajanvav	Dediapada	Narmada
Rojghat	Dediapada	Narmada
Bharada (Relva)	Dediapada	Narmada
Samarpada	Dediapada	Narmada
Lotamba	Dediapada	Narmada
Chikda	Dediapada	Narmada
Devipada	Dediapada	Narmada
Ambavadi	Dediapada	Narmada
Jorti	Dediapada	Narmada
Ihdlavi	Dediapada	Narmada
Relva	Dediapada	Narmada
Patdi	Dediapada	Narmada
Sabuti	Dediapada	Narmada
Moskut	Dediapada	Narmada
Tilipada	Dediapada	Narmada
Umran	Dediapada	Narmada
Vadpada	Dediapada	Narmada
Gopaliya	Dediapada	Narmada
Ambadevi Alias Siyali	Dediapada	Narmada
Barsan	Dediapada	Narmada
Bharada(Barasan)	Dediapada	Narmada
Moti Bedwan	Dediapada	Narmada
Khupar Barsan	Dediapada	Narmada
Nani Bedwan	Dediapada	Narmada
Piparvati	Dediapada	Narmada
Dabhavan	Dediapada	Narmada
Sorafali	Dediapada	Narmada
Samarpada (Devivalu)	Dediapada	Narmada
Sada	Dediapada	Narmada
Moti Daberi	Dediapada	Narmada
Nani Bhamari	Dediapada	Narmada
Khapar	Dediapada	Narmada
Singal Gabhan	Dediapada	Narmada
Namgir	Dediapada	Narmada
Duthar	Dediapada	Narmada
Pinglapada	Dediapada	Narmada
Zadoli	Dediapada	Narmada
Dabka	Dediapada	Narmada
Shisha	Dediapada	Narmada
Pankhala (Shisha)	Dediapada	Narmada
Mohbi	Dediapada	Narmada
Sagai	Dediapada	Narmada
Kelda	Dediapada	Narmada
Andu	Dediapada	Narmada
Boar	Dediapada	Narmada
Kathoh	Dediapada	Narmada
Kokati	Dediapada	Narmada
Dandawadi	Dediapada	Narmada
Shishkhuta	Dediapada	Narmada
Samarghat	Dediapada	Narmada
Ghanpipar	Dediapada	Narmada
Bantawadi	Dediapada	Narmada
Ralda	Dediapada	Narmada
Moti Korvai	Dediapada	Narmada
Olgam	Dediapada	Narmada
Kantipani	Dediapada	Narmada
Kham	Dediapada	Narmada
Khapar Buda	Dediapada	Narmada
Kanjai	Dediapada	Narmada
Khodaamba	Dediapada	Narmada
Golvan	Dediapada	Narmada
Sherwai	Dediapada	Narmada
Kamodvav	Dediapada	Narmada
Kartal	Dediapada	Narmada
Singalwan	Dediapada	Narmada
Moti Mogari	Sagbara	Narmada
Nani Mogari	Sagbara	Narmada
Pada	Sagbara	Narmada
Devmogra	Sagbara	Narmada
Nalakund	Sagbara	Narmada
Godada	Sagbara	Narmada
Kunvar Khadi	Sagbara	Narmada
Narvadi	Sagbara	Narmada
Dudhliver	Sagbara	Narmada
Amiyar	Sagbara	Narmada
Ghansera	Sagbara	Narmada
Chikali	Sagbara	Narmada
Pankhala	Sagbara	Narmada
Chitrakevdi	Sagbara	Narmada
Kodba	Sagbara	Narmada
Chopadvav	Sagbara	Narmada
Ranbuda	Sagbara	Narmada
Nana Kakdi Amba	Sagbara	Narmada
Nana Dor Amba	Sagbara	Narmada
Mota Dor Amba	Sagbara	Narmada
Sim Amli	Sagbara	Narmada
Kel	Sagbara	Narmada
Bhavari Savar	Sagbara	Narmada
Pat	Sagbara	Narmada
Kankhadi	Sagbara	Narmada
Gotpada	Sagbara	Narmada
Kuida	Sagbara	Narmada
Navagam (Selamba)	Sagbara	Narmada
Moravi	Sagbara	Narmada
Rozdev	Sagbara	Narmada
Kuvdavadi	Sagbara	Narmada
Makran	Sagbara	Narmada
Movi	Sagbara	Narmada
Khopi	Sagbara	Narmada
Bodvav	Sagbara	Narmada
Gonamba	Sagbara	Narmada
Datwada	Sagbara	Narmada
Panchpipri	Sagbara	Narmada
Khocharpada	Sagbara	Narmada
Navapada	Sagbara	Narmada
Khampada	Sagbara	Narmada
Khadkuni	Sagbara	Narmada
Pana	Sagbara	Narmada
Piparipada (Pana)	Sagbara	Narmada
Bhogwad	Sagbara	Narmada
Baktura	Sagbara	Narmada
Kolvan	Sagbara	Narmada
Ranipur	Sagbara	Narmada
Uman	Sagbara	Narmada
Navagam (Javli)	Sagbara	Narmada
Javli	Sagbara	Narmada
Langdi	Sagbara	Narmada
Rundhigavan	Sagbara	Narmada
Palaswada	Sagbara	Narmada
Umran	Sagbara	Narmada
Nevdiamba	Sagbara	Narmada
Kherpada	Sagbara	Narmada
Parodhi	Sagbara	Narmada
Nani Parodhi	Sagbara	Narmada
Bhadod	Sagbara	Narmada
Kodkhadi	Sagbara	Narmada
Dhavliver	Sagbara	Narmada
Pirmandala	Sagbara	Narmada
Rachhavada	Sagbara	Narmada
Nani Devrupan	Sagbara	Narmada
Ghodmung	Sagbara	Narmada
Umarkui	Sagbara	Narmada
Taval	Sagbara	Narmada
Pati	Sagbara	Narmada
Sorapada	Sagbara	Narmada
Nal	Sagbara	Narmada
Holi Ambli	Sagbara	Narmada
Pujarigadh	Sagbara	Narmada
Patanamau	Sagbara	Narmada
Tankani	Sagbara	Narmada
Bhoramli	Sagbara	Narmada
Kuyala	Sagbara	Narmada
Moti Devrupan	Sagbara	Narmada
Pathana	Sagbara	Narmada
Chatwad	Sagbara	Narmada
Ubhariya	Sagbara	Narmada
Mota Kakdi Amba	Sagbara	Narmada
Sorta	Sagbara	Narmada
Kakadpada	Sagbara	Narmada
Padi	Sagbara	Narmada
Dodhanvadi	Sagbara	Narmada
Chimbipani	Sagbara	Narmada
Piplapani	Sagbara	Narmada
Dabka	Sagbara	Narmada
Khadkimau	Sagbara	Narmada
Devsaki	Sagbara	Narmada
Sajanvav	Sagbara	Narmada
Gaysavar	Sagbara	Narmada
Mahupada	Sagbara	Narmada
Khota	Sagbara	Narmada
Pipripada	Sagbara	Narmada
Degam	Jambusar	Bharuch
Gulal	Jambusar	Bharuch
Mahamadpor Kamboi	Jambusar	Bharuch
Kavi	Jambusar	Bharuch
Nahar	Jambusar	Bharuch
Sarod	Jambusar	Bharuch
Valipore	Jambusar	Bharuch
Kareli	Jambusar	Bharuch
Kahanava	Jambusar	Bharuch
Piludara	Jambusar	Bharuch
Vedach	Jambusar	Bharuch
Uber	Jambusar	Bharuch
Nondhana	Jambusar	Bharuch
Amanpor Mota	Jambusar	Bharuch
Amanpor Nana	Jambusar	Bharuch
Samoj	Jambusar	Bharuch
Kavli	Jambusar	Bharuch
Aurangpor Timbi	Jambusar	Bharuch
Kangam	Jambusar	Bharuch
Runad	Jambusar	Bharuch
Hamadpor Kanthariya	Jambusar	Bharuch
Kimoj	Jambusar	Bharuch
Sigam	Jambusar	Bharuch
Muradpor Neja	Jambusar	Bharuch
Chandpor Marva	Jambusar	Bharuch
Zamdi	Jambusar	Bharuch
Salehpor Sangdi	Jambusar	Bharuch
Kaliari	Jambusar	Bharuch
Thanava	Jambusar	Bharuch
Vadadala	Jambusar	Bharuch
Kora	Jambusar	Bharuch
Tundaj	Jambusar	Bharuch
Bhodar	Jambusar	Bharuch
Nobar	Jambusar	Bharuch
Dabha	Jambusar	Bharuch
Gajera	Jambusar	Bharuch
Uchchhad	Jambusar	Bharuch
Vavli	Jambusar	Bharuch
Umra	Jambusar	Bharuch
Karmad	Jambusar	Bharuch
Rampore	Jambusar	Bharuch
Panchakada	Jambusar	Bharuch
Shambha	Jambusar	Bharuch
Jantran	Jambusar	Bharuch
Dahri	Jambusar	Bharuch
Chhidra	Jambusar	Bharuch
Molpore	Jambusar	Bharuch
Bhadkodaro	Jambusar	Bharuch
Madafar	Jambusar	Bharuch
Vad	Jambusar	Bharuch
Kava	Jambusar	Bharuch
Limaj	Jambusar	Bharuch
Koteshwar	Jambusar	Bharuch
Bhankhetar	Jambusar	Bharuch
Anakhi	Jambusar	Bharuch
Vahelam	Jambusar	Bharuch
Bojadra	Jambusar	Bharuch
Jafarpara	Jambusar	Bharuch
Nadiad	Jambusar	Bharuch
Chandpor Bara	Jambusar	Bharuch
Panchpipla	Jambusar	Bharuch
Kansagar	Jambusar	Bharuch
Sindhav	Jambusar	Bharuch
Devla	Jambusar	Bharuch
Thakore Talavdi	Jambusar	Bharuch
Asanvad	Jambusar	Bharuch
Bakarpor Timbi	Jambusar	Bharuch
Singarna	Jambusar	Bharuch
Sardarpura	Jambusar	Bharuch
Vanseta	Jambusar	Bharuch
Kalak	Jambusar	Bharuch
Magnad	Jambusar	Bharuch
Mahapara	Jambusar	Bharuch
Kundhal	Jambusar	Bharuch
Dolia	Jambusar	Bharuch
Tankari	Jambusar	Bharuch
Islampore	Jambusar	Bharuch
Kapuria	Jambusar	Bharuch
Nada	Jambusar	Bharuch
Asarsa	Jambusar	Bharuch
Khanpor Deh	Jambusar	Bharuch
Vadiya	Amod	Bharuch
Dadapor	Amod	Bharuch
Kobla	Amod	Bharuch
Manjola	Amod	Bharuch
Vasna	Amod	Bharuch
Matar	Amod	Bharuch
Ajamnagar	Amod	Bharuch
Vedcha	Amod	Bharuch
Chaklad	Amod	Bharuch
Adwala	Amod	Bharuch
Ranipura	Amod	Bharuch
Pursa	Amod	Bharuch
Denva	Amod	Bharuch
Valipor	Amod	Bharuch
Mangrol	Amod	Bharuch
Machhasara	Amod	Bharuch
Achhod	Amod	Bharuch
Bhimpura	Amod	Bharuch
Rodh	Amod	Bharuch
Sarbhan	Amod	Bharuch
Sunthodra	Amod	Bharuch
Ochhan	Amod	Bharuch
Karena	Amod	Bharuch
Ikhar	Amod	Bharuch
Telod	Amod	Bharuch
Danda	Amod	Bharuch
Malkinpura Alias Timbi	Amod	Bharuch
Ninam	Amod	Bharuch
Shrikothi	Amod	Bharuch
Sonama	Amod	Bharuch
Tegva	Amod	Bharuch
Nahier	Amod	Bharuch
Intola	Amod	Bharuch
Roza Tankariya	Amod	Bharuch
Kolavana	Amod	Bharuch
Buva	Amod	Bharuch
Kerwada	Amod	Bharuch
Bodka	Amod	Bharuch
Asnera	Amod	Bharuch
Anor	Amod	Bharuch
Ghamnad	Amod	Bharuch
Dora	Amod	Bharuch
Kothi Vantarsa	Amod	Bharuch
Amarpor Alias Simartha	Amod	Bharuch
Kurchan	Amod	Bharuch
Ranada	Amod	Bharuch
Tanchha	Amod	Bharuch
Samiala	Amod	Bharuch
Sudi	Amod	Bharuch
Keshlu	Amod	Bharuch
Vantarsa	Amod	Bharuch
Samani	Amod	Bharuch
Gandhar	Vagra	Bharuch
Muler	Vagra	Bharuch
Paldi	Vagra	Bharuch
Chanchvel	Vagra	Bharuch
Badalpura	Vagra	Bharuch
Vinchhiyad	Vagra	Bharuch
Khadkhandali	Vagra	Bharuch
Ora	Vagra	Bharuch
Vagra	Vagra	Bharuch
Sachan	Vagra	Bharuch
Pahaj	Vagra	Bharuch
Ochchhan	Vagra	Bharuch
Keshwan	Vagra	Bharuch
Trankal	Vagra	Bharuch
Aladar	Vagra	Bharuch
Harinagar	Vagra	Bharuch
Paniadara	Vagra	Bharuch
Goladara	Vagra	Bharuch
Ambhel	Vagra	Bharuch
Limdi	Vagra	Bharuch
Kalam	Vagra	Bharuch
Mosam	Vagra	Bharuch
Pisad	Vagra	Bharuch
Vastikhandali	Vagra	Bharuch
Rahad	Vagra	Bharuch
Vachhnad	Vagra	Bharuch
Saladara	Vagra	Bharuch
Ankot	Vagra	Bharuch
Juned	Vagra	Bharuch
Saran	Vagra	Bharuch
Sutrel	Vagra	Bharuch
Vahiyal	Vagra	Bharuch
Pipalia	Vagra	Bharuch
Pakhajan	Vagra	Bharuch
Nadarkha	Vagra	Bharuch
Narnavi	Vagra	Bharuch
Padariya	Vagra	Bharuch
Kadodara	Vagra	Bharuch
Vav	Vagra	Bharuch
Sambheti	Vagra	Bharuch
Janiadara	Vagra	Bharuch
Akhod	Vagra	Bharuch
Nandida	Vagra	Bharuch
Khojbal	Vagra	Bharuch
Sadathala	Vagra	Bharuch
Kothia	Vagra	Bharuch
Sayakha	Vagra	Bharuch
Bhersam	Vagra	Bharuch
Vorasamni	Vagra	Bharuch
Aragama	Vagra	Bharuch
Vilayat	Vagra	Bharuch
Bhensali	Vagra	Bharuch
Atali	Vagra	Bharuch
Galenda	Vagra	Bharuch
Samatpor	Vagra	Bharuch
Vadadla	Vagra	Bharuch
Dahej	Vagra	Bharuch
Lakhigam	Vagra	Bharuch
Luvara	Vagra	Bharuch
Jageshwar	Vagra	Bharuch
Ambheta	Vagra	Bharuch
Jolva	Vagra	Bharuch
Suva	Vagra	Bharuch
Rahiad	Vagra	Bharuch
Koliad	Vagra	Bharuch
Kaladara	Vagra	Bharuch
Vengani	Vagra	Bharuch
Aliabet	Vagra	Bharuch
Kamboli	Bharuch	Bharuch
Simalia	Bharuch	Bharuch
Kishnad	Bharuch	Bharuch
Ghodi	Bharuch	Bharuch
Thikaria	Bharuch	Bharuch
Tankariya	Bharuch	Bharuch
Padariya	Bharuch	Bharuch
Karela	Bharuch	Bharuch
Kelod	Bharuch	Bharuch
Pipalia	Bharuch	Bharuch
Parkhet	Bharuch	Bharuch
Adol	Bharuch	Bharuch
Varedia	Bharuch	Bharuch
Segva	Bharuch	Bharuch
Shahpura	Bharuch	Bharuch
Nand	Bharuch	Bharuch
Bharthana	Bharuch	Bharuch
Uparali	Bharuch	Bharuch
Manch	Bharuch	Bharuch
Kahan	Bharuch	Bharuch
Sitpon	Bharuch	Bharuch
Pariej	Bharuch	Bharuch
Dayadra	Bharuch	Bharuch
Tralsa	Bharuch	Bharuch
Hingalla	Bharuch	Bharuch
Bori	Bharuch	Bharuch
Kargat	Bharuch	Bharuch
Jhanghar	Bharuch	Bharuch
Bambusar	Bharuch	Bharuch
Samlod	Bharuch	Bharuch
Jhanor	Bharuch	Bharuch
Dabhali	Bharuch	Bharuch
Nabipur	Bharuch	Bharuch
Kuvadar	Bharuch	Bharuch
Kothi	Bharuch	Bharuch
Tralsi	Bharuch	Bharuch
Derol	Bharuch	Bharuch
Sarnar	Bharuch	Bharuch
Amleshwar	Bharuch	Bharuch
Cholad	Bharuch	Bharuch
Vansi	Bharuch	Bharuch
Vahalu	Bharuch	Bharuch
Mahudhala	Bharuch	Bharuch
Paguthan	Bharuch	Bharuch
Haldar	Bharuch	Bharuch
Asuria	Bharuch	Bharuch
Umara	Bharuch	Bharuch
Kavitha	Bharuch	Bharuch
Karmali	Bharuch	Bharuch
Sindhot	Bharuch	Bharuch
Angareshwar	Bharuch	Bharuch
Nikora	Bharuch	Bharuch
Mangleshwar	Bharuch	Bharuch
Karjan	Bharuch	Bharuch
Osara	Bharuch	Bharuch
Luwara	Bharuch	Bharuch
Vagusana	Bharuch	Bharuch
Kasad	Bharuch	Bharuch
Tham	Bharuch	Bharuch
Karmad	Bharuch	Bharuch
Kurala	Bharuch	Bharuch
Amdada	Bharuch	Bharuch
Sankhvad	Bharuch	Bharuch
Kesrol	Bharuch	Bharuch
Eksal	Bharuch	Bharuch
Navetha	Bharuch	Bharuch
Bhuva	Bharuch	Bharuch
Vesdada	Bharuch	Bharuch
Detral	Bharuch	Bharuch
Manubar	Bharuch	Bharuch
Kanthariya	Bharuch	Bharuch
Umraj	Bharuch	Bharuch
Chavaj	Bharuch	Bharuch
Vadadla	Bharuch	Bharuch
Haldarwa	Bharuch	Bharuch
Tavara	Bharuch	Bharuch
Shuklatirth	Bharuch	Bharuch
Rahadpor	Bharuch	Bharuch
Dahegam	Bharuch	Bharuch
Hinglot	Bharuch	Bharuch
Vadva	Bharuch	Bharuch
Bhadbhut	Bharuch	Bharuch
Kasva	Bharuch	Bharuch
Manad	Bharuch	Bharuch
Mahegam	Bharuch	Bharuch
Dashan	Bharuch	Bharuch
Verwada	Bharuch	Bharuch
Kukarwada	Bharuch	Bharuch
Borbhatha Bet	Bharuch	Bharuch
Mota Vasna	Jhagadia	Bharuch
Indore	Jhagadia	Bharuch
Panetha	Jhagadia	Bharuch
Nana Vasna	Jhagadia	Bharuch
Parvata	Jhagadia	Bharuch
Asha	Jhagadia	Bharuch
Velugam	Jhagadia	Bharuch
Tarsali	Jhagadia	Bharuch
Patar	Jhagadia	Bharuch
Ore	Jhagadia	Bharuch
Tothidara	Jhagadia	Bharuch
Rundh	Jhagadia	Bharuch
Krushnapuri	Jhagadia	Bharuch
Vadhavana	Jhagadia	Bharuch
Kakalpor	Jhagadia	Bharuch
Sarsad	Jhagadia	Bharuch
Fichwada (Sarkari)	Jhagadia	Bharuch
Dhundha	Jhagadia	Bharuch
Mahuvada	Jhagadia	Bharuch
Bamalla	Jhagadia	Bharuch
Umalla	Jhagadia	Bharuch
Roomalpura	Jhagadia	Bharuch
Jamboi	Jhagadia	Bharuch
Umadhara	Jhagadia	Bharuch
Kantidara	Jhagadia	Bharuch
Bhalod	Jhagadia	Bharuch
Prankad	Jhagadia	Bharuch
Jarsad	Jhagadia	Bharuch
Vanakpore	Jhagadia	Bharuch
Pipdara	Jhagadia	Bharuch
Sanjali	Jhagadia	Bharuch
Achhalia	Jhagadia	Bharuch
Shir	Jhagadia	Bharuch
Tavdi	Jhagadia	Bharuch
Vala	Jhagadia	Bharuch
Raisangpura	Jhagadia	Bharuch
Vaghpara (Dumala)	Jhagadia	Bharuch
Tejpor	Jhagadia	Bharuch
Uchchhab	Jhagadia	Bharuch
Haripara (Dumala)	Jhagadia	Bharuch
Sarsa	Jhagadia	Bharuch
Rajpardi	Jhagadia	Bharuch
Avidha	Jhagadia	Bharuch
Pora	Jhagadia	Bharuch
Limodara	Jhagadia	Bharuch
Karad	Jhagadia	Bharuch
Khadoli	Jhagadia	Bharuch
Madhavpara	Jhagadia	Bharuch
Boridara (Sarkari)	Jhagadia	Bharuch
Nana Sorva	Jhagadia	Bharuch
Rajpara	Jhagadia	Bharuch
Rupania	Jhagadia	Bharuch
Kapat	Jhagadia	Bharuch
Dabhal	Jhagadia	Bharuch
Vali	Jhagadia	Bharuch
Khalak	Jhagadia	Bharuch
Kesharva	Jhagadia	Bharuch
Umarkharda	Jhagadia	Bharuch
Koliapada	Jhagadia	Bharuch
Kantol	Jhagadia	Bharuch
Ambakhadi	Jhagadia	Bharuch
Mota Sorva	Jhagadia	Bharuch
Samarpara	Jhagadia	Bharuch
Malipipar	Jhagadia	Bharuch
Bhimpor	Jhagadia	Bharuch
Simdhara	Jhagadia	Bharuch
Jhagadia	Jhagadia	Bharuch
Mota Sanja	Jhagadia	Bharuch
Vaghpara (Sarkari)	Jhagadia	Bharuch
Haripara (Sarkari)	Jhagadia	Bharuch
Ratanpore	Jhagadia	Bharuch
Bhuri	Jhagadia	Bharuch
Maljipara	Jhagadia	Bharuch
Gundecha	Jhagadia	Bharuch
Kadwali	Jhagadia	Bharuch
Bilvada	Jhagadia	Bharuch
Razalwada	Jhagadia	Bharuch
Mandvi	Jhagadia	Bharuch
Vankol	Jhagadia	Bharuch
Pada	Jhagadia	Bharuch
Jamoli	Jhagadia	Bharuch
Dholi	Jhagadia	Bharuch
Pipalpan	Jhagadia	Bharuch
Choki	Jhagadia	Bharuch
Amalzar	Jhagadia	Bharuch
Amod	Jhagadia	Bharuch
Vankihathan	Jhagadia	Bharuch
Kunvarpara	Jhagadia	Bharuch
Sultanpura	Jhagadia	Bharuch
Ranipara	Jhagadia	Bharuch
Uchedia	Jhagadia	Bharuch
Govali Bet	Jhagadia	Bharuch
Govali	Jhagadia	Bharuch
Nana Sanja	Jhagadia	Bharuch
Vanthevad	Jhagadia	Bharuch
Kharia	Jhagadia	Bharuch
Dholakuva	Jhagadia	Bharuch
Andharkachhala	Jhagadia	Bharuch
Damlai	Jhagadia	Bharuch
Padvaniya	Jhagadia	Bharuch
Rampore	Jhagadia	Bharuch
Baleshwar	Jhagadia	Bharuch
Jespore	Jhagadia	Bharuch
Sajanvav	Jhagadia	Bharuch
Vadkhunta	Jhagadia	Bharuch
Machamadi	Jhagadia	Bharuch
Mungaj	Jhagadia	Bharuch
Movi	Jhagadia	Bharuch
Yal	Jhagadia	Bharuch
Kharetha	Jhagadia	Bharuch
Vandarveli	Jhagadia	Bharuch
Debar	Jhagadia	Bharuch
Dholekham	Jhagadia	Bharuch
Anjoli	Jhagadia	Bharuch
Ramkot	Jhagadia	Bharuch
Ashnavi	Jhagadia	Bharuch
Navapara	Jhagadia	Bharuch
Goratia	Jhagadia	Bharuch
Zazpor	Jhagadia	Bharuch
Padal	Jhagadia	Bharuch
Malpor (Dumala)	Jhagadia	Bharuch
Selod	Jhagadia	Bharuch
Fulwadi	Jhagadia	Bharuch
Kapalsadi	Jhagadia	Bharuch
Boridara (Dumala)	Jhagadia	Bharuch
Mulad	Jhagadia	Bharuch
Kharchi Bhilwada	Jhagadia	Bharuch
Kharchi	Jhagadia	Bharuch
Untia	Jhagadia	Bharuch
Sardarpura	Jhagadia	Bharuch
Dadheda	Jhagadia	Bharuch
Talodara	Jhagadia	Bharuch
Navagam Mota	Jhagadia	Bharuch
Rajpore	Jhagadia	Bharuch
Moran	Jhagadia	Bharuch
Shiyali	Jhagadia	Bharuch
Anadhara	Jhagadia	Bharuch
Kotiamau	Jhagadia	Bharuch
Kolivada	Jhagadia	Bharuch
Undi	Jhagadia	Bharuch
Kochbar	Jhagadia	Bharuch
Fichvada (Dumala)	Jhagadia	Bharuch
Valpore	Jhagadia	Bharuch
Galiba	Jhagadia	Bharuch
Timla	Jhagadia	Bharuch
Vadpan	Jhagadia	Bharuch
Kuri	Jhagadia	Bharuch
Gambhirpara	Jhagadia	Bharuch
Bhojpor	Jhagadia	Bharuch
Vasna	Jhagadia	Bharuch
Borjai	Jhagadia	Bharuch
Randedi	Jhagadia	Bharuch
Limet	Jhagadia	Bharuch
Panvadi	Jhagadia	Bharuch
Dharoli	Jhagadia	Bharuch
Ambos	Jhagadia	Bharuch
Mota Malpor	Jhagadia	Bharuch
Moriyana	Jhagadia	Bharuch
Fokdi	Jhagadia	Bharuch
Kantipada	Jhagadia	Bharuch
Shankoi	Jhagadia	Bharuch
Bilatha	Jhagadia	Bharuch
Rupghat	Jhagadia	Bharuch
Varkhadi	Jhagadia	Bharuch
Kakadpada	Jhagadia	Bharuch
Kund	Jhagadia	Bharuch
Zarna	Jhagadia	Bharuch
Dhanturiya	Anklesvar	Bharuch
Taria	Anklesvar	Bharuch
Matied	Anklesvar	Bharuch
Haripura	Anklesvar	Bharuch
Sakkarpor	Anklesvar	Bharuch
Sarfuddin	Anklesvar	Bharuch
Borbhatha	Anklesvar	Bharuch
Borbhatha Bet	Anklesvar	Bharuch
Chhapra	Anklesvar	Bharuch
Kansiya	Anklesvar	Bharuch
Mandvabuzarg	Anklesvar	Bharuch
Naugama	Anklesvar	Bharuch
Samor	Anklesvar	Bharuch
Surwadi	Anklesvar	Bharuch
Divi	Anklesvar	Bharuch
Diva	Anklesvar	Bharuch
Pungam	Anklesvar	Bharuch
Sajod	Anklesvar	Bharuch
Kanwa	Anklesvar	Bharuch
Nangal	Anklesvar	Bharuch
Boidara	Anklesvar	Bharuch
Motali	Anklesvar	Bharuch
Amrutpura	Anklesvar	Bharuch
Uchhali	Anklesvar	Bharuch
Kararvel	Anklesvar	Bharuch
Dadhal	Anklesvar	Bharuch
Piraman (Part)	Anklesvar	Bharuch
Amboli	Anklesvar	Bharuch
Adol	Anklesvar	Bharuch
Hajat	Anklesvar	Bharuch
Sarthan	Anklesvar	Bharuch
Motwan	Anklesvar	Bharuch
Telva	Anklesvar	Bharuch
Piludara	Anklesvar	Bharuch
Umarwada	Anklesvar	Bharuch
Kapodara	Anklesvar	Bharuch
Kosamadi	Anklesvar	Bharuch
Jitali	Anklesvar	Bharuch
Piprod	Anklesvar	Bharuch
Avadar	Anklesvar	Bharuch
Pardi Mokha	Anklesvar	Bharuch
Sangpor	Anklesvar	Bharuch
Bakrol	Anklesvar	Bharuch
Safipura	Anklesvar	Bharuch
Alonj	Anklesvar	Bharuch
Pardi Idris	Anklesvar	Bharuch
Karmali	Anklesvar	Bharuch
Panoli	Anklesvar	Bharuch
Kharod	Anklesvar	Bharuch
Bhadi	Anklesvar	Bharuch
Ravidra	Anklesvar	Bharuch
Adadara	Anklesvar	Bharuch
Sisodara	Anklesvar	Bharuch
Utiyadara	Anklesvar	Bharuch
Bharan	Anklesvar	Bharuch
Ambheta	Hansot	Bharuch
Pardi	Hansot	Bharuch
Hansot	Hansot	Bharuch
Utraj	Hansot	Bharuch
Shera	Hansot	Bharuch
Mothiya	Hansot	Bharuch
Digas	Hansot	Bharuch
Mangrol	Hansot	Bharuch
Asta	Hansot	Bharuch
Vansnoli	Hansot	Bharuch
Katpor	Hansot	Bharuch
Dantrai	Hansot	Bharuch
Badodara	Hansot	Bharuch
Sayan	Hansot	Bharuch
Alva	Hansot	Bharuch
Kalam	Hansot	Bharuch
Kathodara	Hansot	Bharuch
Rohid	Hansot	Bharuch
Valner	Hansot	Bharuch
Rayma	Hansot	Bharuch
Chhilodara	Hansot	Bharuch
Vaghwan	Hansot	Bharuch
Vamleshwar	Hansot	Bharuch
Jetpor	Hansot	Bharuch
Ankalva	Hansot	Bharuch
Dhamrad	Hansot	Bharuch
Bolav	Hansot	Bharuch
Malanpor	Hansot	Bharuch
Kudadara	Hansot	Bharuch
Ghodadara	Hansot	Bharuch
Parvat	Hansot	Bharuch
Aniyadara	Hansot	Bharuch
Balota	Hansot	Bharuch
Samli	Hansot	Bharuch
Kantiyajal	Hansot	Bharuch
Ilav	Hansot	Bharuch
Sunevkhurd	Hansot	Bharuch
Sunevkalla	Hansot	Bharuch
Pandavai	Hansot	Bharuch
Dungra	Hansot	Bharuch
Obha	Hansot	Bharuch
Asarma	Hansot	Bharuch
Sahol	Hansot	Bharuch
Panjroli	Hansot	Bharuch
Amod	Hansot	Bharuch
Koyalivav	Valia	Bharuch
Chiklota	Valia	Bharuch
Moriyana	Valia	Bharuch
Netrang	Valia	Bharuch
Borkhadi	Valia	Bharuch
Kup	Valia	Bharuch
Kodvav	Valia	Bharuch
Fulwadi	Valia	Bharuch
Ghanikhunt	Valia	Bharuch
Arethi	Valia	Bharuch
Bhangoria	Valia	Bharuch
Baladava	Valia	Bharuch
Chandravan	Valia	Bharuch
Kelvikuva	Valia	Bharuch
Bedoli	Valia	Bharuch
Datt Nagar	Valia	Bharuch
Bhens Khetar	Valia	Bharuch
Singalvan	Valia	Bharuch
Pathar	Valia	Bharuch
Dajipara	Valia	Bharuch
Chanderiya	Valia	Bharuch
Singla	Valia	Bharuch
Vagadkhol	Valia	Bharuch
Bhilod	Valia	Bharuch
Dholgam	Valia	Bharuch
Hirapor	Valia	Bharuch
Vatariya	Valia	Bharuch
Kondh	Valia	Bharuch
Dodwada	Valia	Bharuch
Naldhari	Valia	Bharuch
Valia	Valia	Bharuch
Daheli	Valia	Bharuch
Kesargam	Valia	Bharuch
Shir	Valia	Bharuch
Panchasim	Valia	Bharuch
Kambodiya	Valia	Bharuch
Sakva	Valia	Bharuch
Thava	Valia	Bharuch
Kakad Kui	Valia	Bharuch
Badakui	Valia	Bharuch
Motia	Valia	Bharuch
Atkhol	Valia	Bharuch
Chasvad	Valia	Bharuch
Zarna	Valia	Bharuch
Dolatpur	Valia	Bharuch
Itkala	Valia	Bharuch
Pithor	Valia	Bharuch
Desad	Valia	Bharuch
Kanerav	Valia	Bharuch
Dungari	Valia	Bharuch
Siludi	Valia	Bharuch
Ghoda	Valia	Bharuch
Gandhu	Valia	Bharuch
Pansoli	Valia	Bharuch
Karsad	Valia	Bharuch
Sinada	Valia	Bharuch
Sodgam	Valia	Bharuch
Tuna	Valia	Bharuch
Umargam	Valia	Bharuch
Vandariya	Valia	Bharuch
Jabugam	Valia	Bharuch
Navapara	Valia	Bharuch
Sevad	Valia	Bharuch
Chikhli	Valia	Bharuch
Kamaliya	Valia	Bharuch
Zarnavadi	Valia	Bharuch
Koyali Mandvi	Valia	Bharuch
Nana Jambuda	Valia	Bharuch
Mota Jambuda	Valia	Bharuch
Pingot	Valia	Bharuch
Mauza	Valia	Bharuch
Gundia	Valia	Bharuch
Rajpara	Valia	Bharuch
Choramla	Valia	Bharuch
Vitthalgam	Valia	Bharuch
Kosmadi	Valia	Bharuch
Luna	Valia	Bharuch
Joli	Valia	Bharuch
Mela	Valia	Bharuch
Kara	Valia	Bharuch
Dansoli	Valia	Bharuch
Rajagadh	Valia	Bharuch
Bharadiya	Valia	Bharuch
Patal	Valia	Bharuch
Nikoli	Valia	Bharuch
Hola Kotar	Valia	Bharuch
Bhamadiya	Valia	Bharuch
Mokhadi	Valia	Bharuch
Jamaniya	Valia	Bharuch
Rundha	Valia	Bharuch
Mirapor	Valia	Bharuch
Sabariya	Valia	Bharuch
Petiya	Valia	Bharuch
Kavachia	Valia	Bharuch
Bilothi	Valia	Bharuch
Rajwadi	Valia	Bharuch
Dardi	The Dangs	The Dangs
Sawarkhadi	The Dangs	The Dangs
Kosimda	The Dangs	The Dangs
Sajupada	The Dangs	The Dangs
Khokhari	The Dangs	The Dangs
Bardipada (Saja)	The Dangs	The Dangs
Bandhpada	The Dangs	The Dangs
Dhulda	The Dangs	The Dangs
Girmal	The Dangs	The Dangs
Burthadi	The Dangs	The Dangs
Gavdahad	The Dangs	The Dangs
Jamnyamal	The Dangs	The Dangs
Singana	The Dangs	The Dangs
Nishana	The Dangs	The Dangs
Kakshala	The Dangs	The Dangs
Jamla	The Dangs	The Dangs
Keshbandh	The Dangs	The Dangs
Timbarthawa	The Dangs	The Dangs
Biliamba	The Dangs	The Dangs
Jamansonda	The Dangs	The Dangs
Mokhamal	The Dangs	The Dangs
Jharan	The Dangs	The Dangs
Kadmal(Subir)	The Dangs	The Dangs
Kasadbari	The Dangs	The Dangs
Hadol	The Dangs	The Dangs
Kalibel	The Dangs	The Dangs
Bhujad	The Dangs	The Dangs
Bhenskatri	The Dangs	The Dangs
Enginpada (Kolbari)	The Dangs	The Dangs
Bhongdya	The Dangs	The Dangs
Wankan	The Dangs	The Dangs
Pandharmal	The Dangs	The Dangs
Tekpada	The Dangs	The Dangs
Bhalkhet	The Dangs	The Dangs
Khopri Amba	The Dangs	The Dangs
Divadyawan	The Dangs	The Dangs
Chikhala(Kalibelsaja)	The Dangs	The Dangs
Sawardakasad	The Dangs	The Dangs
Mahal	The Dangs	The Dangs
Dhongiamba	The Dangs	The Dangs
Iskhandi	The Dangs	The Dangs
Lahan Kasad	The Dangs	The Dangs
Daher	The Dangs	The Dangs
Subir	The Dangs	The Dangs
Behdun	The Dangs	The Dangs
Sawarpada	The Dangs	The Dangs
Amthawa	The Dangs	The Dangs
Gawhan	The Dangs	The Dangs
Pipaldahad	The Dangs	The Dangs
Bhondvihir	The Dangs	The Dangs
Karanjpada	The Dangs	The Dangs
Sepuamba	The Dangs	The Dangs
Jarsol	The Dangs	The Dangs
Kangariyamal	The Dangs	The Dangs
Karanjda (Lavchalisaja)	The Dangs	The Dangs
Uga(Lavchali)	The Dangs	The Dangs
Ghana	The Dangs	The Dangs
Moti Kasad	The Dangs	The Dangs
Masli	The Dangs	The Dangs
Khatal	The Dangs	The Dangs
Patli	The Dangs	The Dangs
Godadiya	The Dangs	The Dangs
Kakarda	The Dangs	The Dangs
Jamanpada	The Dangs	The Dangs
Jhavda	The Dangs	The Dangs
Vanzat Amba	The Dangs	The Dangs
Koylipada	The Dangs	The Dangs
Kusmal	The Dangs	The Dangs
Kalamkhet	The Dangs	The Dangs
Sodmal	The Dangs	The Dangs
Gaygothan	The Dangs	The Dangs
Lavchali	The Dangs	The Dangs
Ghubadia	The Dangs	The Dangs
Hanwatpada(Pipaldahadsaja)	The Dangs	The Dangs
Shivbara	The Dangs	The Dangs
Pandharpada	The Dangs	The Dangs
Lahan Jhadadar	The Dangs	The Dangs
Moti Jhadadar	The Dangs	The Dangs
Jogthawa	The Dangs	The Dangs
Chamarpada	The Dangs	The Dangs
Junner	The Dangs	The Dangs
Gurudiya	The Dangs	The Dangs
Mohpada (Pipaldahad)	The Dangs	The Dangs
Khambhla	The Dangs	The Dangs
Amsarpada	The Dangs	The Dangs
Bardipada(Naktyahanwatsaja)	The Dangs	The Dangs
Wahutiya	The Dangs	The Dangs
Bibupada	The Dangs	The Dangs
Kel	The Dangs	The Dangs
Badiganvtha	The Dangs	The Dangs
Barda(Khambhla Saja)	The Dangs	The Dangs
Khajurna	The Dangs	The Dangs
Bijurpada	The Dangs	The Dangs
Chinchvihir	The Dangs	The Dangs
Sawarda	The Dangs	The Dangs
Kherindra	The Dangs	The Dangs
Kirli	The Dangs	The Dangs
Padalkhadi	The Dangs	The Dangs
Chikhli (Lavchalisaja)	The Dangs	The Dangs
Gadhvi	The Dangs	The Dangs
Jamlapada(Gadhvisaja)	The Dangs	The Dangs
Diwan Tembrun	The Dangs	The Dangs
Sarwar	The Dangs	The Dangs
Gunjpeda	The Dangs	The Dangs
Ghodi	The Dangs	The Dangs
Dhodhalpada	The Dangs	The Dangs
Chikar (Jhavdasaja)	The Dangs	The Dangs
Borigaotha (Waghaisaja)	The Dangs	The Dangs
Gira	The Dangs	The Dangs
Dabdar (Waghai)	The Dangs	The Dangs
Kosimpatal	The Dangs	The Dangs
Kudkas	The Dangs	The Dangs
Kukadnakhi	The Dangs	The Dangs
Chichigaontha	The Dangs	The Dangs
Dhadhra	The Dangs	The Dangs
Hanwatchond	The Dangs	The Dangs
Sukmal	The Dangs	The Dangs
Kotba	The Dangs	The Dangs
Palsamal	The Dangs	The Dangs
Kakadvihir	The Dangs	The Dangs
Dholiyaumbar(Narayan devpada)	The Dangs	The Dangs
Ambur	The Dangs	The Dangs
Malga	The Dangs	The Dangs
Bilbari	The Dangs	The Dangs
Dumarya	The Dangs	The Dangs
Nakatia Hanwat	The Dangs	The Dangs
Jhari	The Dangs	The Dangs
Jamanya	The Dangs	The Dangs
Ahirpada	The Dangs	The Dangs
Satbabla	The Dangs	The Dangs
Chichpada (Vadpada)	The Dangs	The Dangs
Vadpada	The Dangs	The Dangs
Bokadmal	The Dangs	The Dangs
Pipalaidevi	The Dangs	The Dangs
Hindla	The Dangs	The Dangs
Dhuda	The Dangs	The Dangs
Dhavalidod	The Dangs	The Dangs
Ghubita	The Dangs	The Dangs
Chankhal	The Dangs	The Dangs
Jamanvihir	The Dangs	The Dangs
Isdar (Gadhvi)	The Dangs	The Dangs
Gaurya	The Dangs	The Dangs
Chikatiya	The Dangs	The Dangs
Nadagkhadi	The Dangs	The Dangs
Davdahad	The Dangs	The Dangs
Pimpri	The Dangs	The Dangs
Bhawadi	The Dangs	The Dangs
Jhariya (Dungarda)	The Dangs	The Dangs
Dodipada	The Dangs	The Dangs
BARDA	The Dangs	The Dangs
Dagadiamba	The Dangs	The Dangs
Malin	The Dangs	The Dangs
Dhulchond	The Dangs	The Dangs
Amsarwalan	The Dangs	The Dangs
Wangan	The Dangs	The Dangs
Bhavandagad	The Dangs	The Dangs
Sati	The Dangs	The Dangs
Mulchond	The Dangs	The Dangs
Ghoghli	The Dangs	The Dangs
Nilsakiya	The Dangs	The Dangs
Pipalyamal	The Dangs	The Dangs
Borkhet	The Dangs	The Dangs
Bhisya	The Dangs	The Dangs
Gondalvihir	The Dangs	The Dangs
Pipalghodi	The Dangs	The Dangs
Mahalpada	The Dangs	The Dangs
Sendriamba	The Dangs	The Dangs
Kalamvihir	The Dangs	The Dangs
Pipalpada	The Dangs	The Dangs
Vanzarghodi	The Dangs	The Dangs
Taklipada (Pipalaidevi)	The Dangs	The Dangs
Sadadvihir	The Dangs	The Dangs
Garkhadi	The Dangs	The Dangs
Wadiawan	The Dangs	The Dangs
Harpada	The Dangs	The Dangs
Ghaniamba	The Dangs	The Dangs
Thorpada	The Dangs	The Dangs
Kamdiawan	The Dangs	The Dangs
Vanzattembrun	The Dangs	The Dangs
Karanjdi(Gadadsaja)	The Dangs	The Dangs
Mogra	The Dangs	The Dangs
Pandva	The Dangs	The Dangs
Nandanpeda	The Dangs	The Dangs
Chaukiya	The Dangs	The Dangs
Chavadvel	The Dangs	The Dangs
Kasavdahad	The Dangs	The Dangs
Sunda	The Dangs	The Dangs
Golasta	The Dangs	The Dangs
Wawanda	The Dangs	The Dangs
Kutarnachiya	The Dangs	The Dangs
Bhendmal	The Dangs	The Dangs
Luharia	The Dangs	The Dangs
Borpada	The Dangs	The Dangs
Ambapada (Vaghai)	The Dangs	The Dangs
Uga(Rambhasaja)	The Dangs	The Dangs
Wanarchond	The Dangs	The Dangs
Dokpatal	The Dangs	The Dangs
Devipada	The Dangs	The Dangs
Jamalapada	The Dangs	The Dangs
Rambhas	The Dangs	The Dangs
Baj	The Dangs	The Dangs
Waghmal	The Dangs	The Dangs
Lahandabdar	The Dangs	The Dangs
Moti Dabdar	The Dangs	The Dangs
Khapri	The Dangs	The Dangs
Gaykhas	The Dangs	The Dangs
Ravchond	The Dangs	The Dangs
Isdar(Borkhalsaja)	The Dangs	The Dangs
Garmal	The Dangs	The Dangs
Javtala	The Dangs	The Dangs
Morzira	The Dangs	The Dangs
Gadad	The Dangs	The Dangs
Madalbari	The Dangs	The Dangs
Waidun	The Dangs	The Dangs
Kadmal(Gadadsaja)	The Dangs	The Dangs
Chinchdhara	The Dangs	The Dangs
Karadiamba	The Dangs	The Dangs
Gadvihir	The Dangs	The Dangs
Hanwatpada(Chinchlisaja)	The Dangs	The Dangs
Nimpada	The Dangs	The Dangs
Mahardar	The Dangs	The Dangs
Chinchli	The Dangs	The Dangs
Don	The Dangs	The Dangs
Anjankund	The Dangs	The Dangs
Kosabia	The Dangs	The Dangs
Linga	The Dangs	The Dangs
Borkhal	The Dangs	The Dangs
Tembrungartha	The Dangs	The Dangs
Songir	The Dangs	The Dangs
Wasurna	The Dangs	The Dangs
Shivarimal	The Dangs	The Dangs
Chikar(Rambhas Saja)	The Dangs	The Dangs
Barkhandhia	The Dangs	The Dangs
Bhurbhendi	The Dangs	The Dangs
Dagadpada	The Dangs	The Dangs
Khirmani	The Dangs	The Dangs
Susarda	The Dangs	The Dangs
Kunda	The Dangs	The Dangs
Sakarpatal	The Dangs	The Dangs
Sadadmal	The Dangs	The Dangs
Chikhalda	The Dangs	The Dangs
Nanapada	The Dangs	The Dangs
Kumarbandh	The Dangs	The Dangs
Aherdi	The Dangs	The Dangs
Ambapada (Chikhli Saja)	The Dangs	The Dangs
Chikhali (Samgahan Saja)	The Dangs	The Dangs
Borigaotha (Samgahan Saja)	The Dangs	The Dangs
Maharaychond	The Dangs	The Dangs
Umbarpada	The Dangs	The Dangs
Taklipada (Taklipada Saja)	The Dangs	The Dangs
Vihiramba	The Dangs	The Dangs
Bilmal	The Dangs	The Dangs
Kamad	The Dangs	The Dangs
Ukhatiya	The Dangs	The Dangs
Sinbandh	The Dangs	The Dangs
Wakarya	The Dangs	The Dangs
Motacharya	The Dangs	The Dangs
Lahancharya	The Dangs	The Dangs
Kahandolghodi	The Dangs	The Dangs
Nirgudmal	The Dangs	The Dangs
Moti Dabhas	The Dangs	The Dangs
Lahandabhas	The Dangs	The Dangs
Chirapada	The Dangs	The Dangs
Baripada	The Dangs	The Dangs
Bordahad	The Dangs	The Dangs
Dhangdi	The Dangs	The Dangs
Silotmal	The Dangs	The Dangs
Chinchod	The Dangs	The Dangs
Bhadarpada	The Dangs	The Dangs
Daguniya	The Dangs	The Dangs
Barda (Manmodisaja)	The Dangs	The Dangs
Supdahad	The Dangs	The Dangs
Gundvahal	The Dangs	The Dangs
Darapada	The Dangs	The Dangs
Bhapkhal	The Dangs	The Dangs
Bhurapani	The Dangs	The Dangs
Dhumkhal	The Dangs	The Dangs
Jakhana	The Dangs	The Dangs
Chinchpada (Galkundsaja)	The Dangs	The Dangs
Galkund	The Dangs	The Dangs
Pipalpada(Galkundsaja)	The Dangs	The Dangs
Mohpada(Galkundsaja)	The Dangs	The Dangs
Vanar	The Dangs	The Dangs
Ambalia	The Dangs	The Dangs
Umarya	The Dangs	The Dangs
Wanki	The Dangs	The Dangs
Payarpada	The Dangs	The Dangs
Jamdar	The Dangs	The Dangs
Samgahan	The Dangs	The Dangs
Ranpada	The Dangs	The Dangs
Murambi	The Dangs	The Dangs
Nadakchond	The Dangs	The Dangs
Ghodwahal	The Dangs	The Dangs
Nimbarpada	The Dangs	The Dangs
Bondarmal	The Dangs	The Dangs
Manmodi	The Dangs	The Dangs
Kanchanpada	The Dangs	The Dangs
Mota Malunga	The Dangs	The Dangs
Lahanmalunga	The Dangs	The Dangs
Humbapada	The Dangs	The Dangs
Sonuniya	The Dangs	The Dangs
Gundia	The Dangs	The Dangs
Barmiawad	The Dangs	The Dangs
Gotiyamal	The Dangs	The Dangs
Jogbari	The Dangs	The Dangs
Baradpani	The Dangs	The Dangs
Malegaon	The Dangs	The Dangs
Kotamdar	The Dangs	The Dangs
Asundar	Navsari	Navsari
Sarai	Navsari	Navsari
Dhaman	Navsari	Navsari
Parthan	Navsari	Navsari
Vejalpor	Navsari	Navsari
Telada	Navsari	Navsari
Sarona	Navsari	Navsari
Pera	Navsari	Navsari
Kurel	Navsari	Navsari
Supa	Navsari	Navsari
Pinsad	Navsari	Navsari
Padgha	Navsari	Navsari
Kadipor	Navsari	Navsari
Kasbapar	Navsari	Navsari
Amri	Navsari	Navsari
Amadpor	Navsari	Navsari
Moldhara	Navsari	Navsari
Tarsadi	Navsari	Navsari
Khergam	Navsari	Navsari
Vachharvad	Navsari	Navsari
Shahu	Navsari	Navsari
Singod	Navsari	Navsari
Dandesar	Navsari	Navsari
Onchi	Navsari	Navsari
Virwadi	Navsari	Navsari
Viraval	Navsari	Navsari
Dharagiri	Navsari	Navsari
Nasilpor	Navsari	Navsari
Bhattai	Navsari	Navsari
Munsad	Navsari	Navsari
Vasar	Navsari	Navsari
Ambada	Navsari	Navsari
Ugat	Navsari	Navsari
Navapara	Navsari	Navsari
Satem	Navsari	Navsari
Toli	Navsari	Navsari
Sadlav	Navsari	Navsari
Ashtagam	Navsari	Navsari
Un	Navsari	Navsari
Sisodra (Ganesh)	Navsari	Navsari
Tighra	Navsari	Navsari
Dantej	Navsari	Navsari
Italva	Navsari	Navsari
Wada (Sisodra)	Navsari	Navsari
Pardi	Navsari	Navsari
Sarpor	Navsari	Navsari
Dabhalai	Navsari	Navsari
Nagdhara	Navsari	Navsari
Kumbhar Faliya	Navsari	Navsari
Butlav	Navsari	Navsari
Kanbad	Navsari	Navsari
Bhula Faliya	Navsari	Navsari
Khadsupa	Navsari	Navsari
Kachhol	Navsari	Navsari
Adada	Navsari	Navsari
Partapor	Navsari	Navsari
Mogar	Navsari	Navsari
Chandravasan Supa	Navsari	Navsari
Boriach	Navsari	Navsari
Rajwada	Navsari	Navsari
Kambada	Navsari	Navsari
Bhunwadi	Navsari	Navsari
Mahudi	Navsari	Navsari
Puni	Navsari	Navsari
Arsan	Navsari	Navsari
Danti	Jalalpore	Navsari
Umbhrat	Jalalpore	Navsari
Bhatha	Jalalpore	Navsari
Magob	Jalalpore	Navsari
Karankhat	Jalalpore	Navsari
Parujan	Jalalpore	Navsari
Nadod	Jalalpore	Navsari
Maroli	Jalalpore	Navsari
Ponsara	Jalalpore	Navsari
Wada	Jalalpore	Navsari
Chokhad	Jalalpore	Navsari
Dabhel	Jalalpore	Navsari
Asana	Jalalpore	Navsari
Kalakachha	Jalalpore	Navsari
Ranodra	Jalalpore	Navsari
Pardi (Alak)	Jalalpore	Navsari
Sisodra (Alak)	Jalalpore	Navsari
Kuched	Jalalpore	Navsari
Sadodra	Jalalpore	Navsari
Alak	Jalalpore	Navsari
Vesma	Jalalpore	Navsari
Sandalpor	Jalalpore	Navsari
Simlak	Jalalpore	Navsari
Kolasana	Jalalpore	Navsari
Kadoli	Jalalpore	Navsari
Dalki	Jalalpore	Navsari
Mangrol	Jalalpore	Navsari
Parsoli	Jalalpore	Navsari
Nimlai	Jalalpore	Navsari
Dipla	Jalalpore	Navsari
Vansi	Jalalpore	Navsari
Bhinar	Jalalpore	Navsari
Delvada	Jalalpore	Navsari
Vadoli	Jalalpore	Navsari
Alura	Jalalpore	Navsari
Simalgam	Jalalpore	Navsari
Chhinam	Jalalpore	Navsari
Mirjapor	Jalalpore	Navsari
Sagra	Jalalpore	Navsari
Manekpor	Jalalpore	Navsari
Tankoli	Jalalpore	Navsari
Tavdi	Jalalpore	Navsari
Bodali	Jalalpore	Navsari
Borsi	Jalalpore	Navsari
Dandi	Jalalpore	Navsari
Samapor	Jalalpore	Navsari
Matwad	Jalalpore	Navsari
Karadi	Jalalpore	Navsari
Machhad	Jalalpore	Navsari
Pethan	Jalalpore	Navsari
Kothamadi	Jalalpore	Navsari
Ethan	Jalalpore	Navsari
Bhutsad	Jalalpore	Navsari
Eroo	Jalalpore	Navsari
Hansapor	Jalalpore	Navsari
Mandir	Jalalpore	Navsari
At	Jalalpore	Navsari
Khambhlav	Jalalpore	Navsari
Sultanpur	Jalalpore	Navsari
Kalthan	Jalalpore	Navsari
Abrama	Jalalpore	Navsari
Dambher	Jalalpore	Navsari
Vedchha	Jalalpore	Navsari
Karod Kothva	Jalalpore	Navsari
Sarav	Jalalpore	Navsari
Chijgam	Jalalpore	Navsari
Onjal	Jalalpore	Navsari
Krushnapur	Jalalpore	Navsari
Panar	Jalalpore	Navsari
Kharsad	Jalalpore	Navsari
Kanera	Jalalpore	Navsari
Mohanpur	Gandevi	Navsari
Kolva	Gandevi	Navsari
Salej	Gandevi	Navsari
Ichhapor	Gandevi	Navsari
Pinjra	Gandevi	Navsari
Vegam	Gandevi	Navsari
Vagalvad	Gandevi	Navsari
Matwad	Gandevi	Navsari
Gandeva	Gandevi	Navsari
Khapariya	Gandevi	Navsari
Pipaldhara	Gandevi	Navsari
Manekpor	Gandevi	Navsari
Gadat	Gandevi	Navsari
Sonwadi	Gandevi	Navsari
Ancheli	Gandevi	Navsari
Khakhwada	Gandevi	Navsari
Pathri	Gandevi	Navsari
Dhanori	Gandevi	Navsari
Endhal	Gandevi	Navsari
Duwada	Gandevi	Navsari
Vadsangal	Gandevi	Navsari
Rahej	Gandevi	Navsari
Ajrai	Gandevi	Navsari
Kachholi	Gandevi	Navsari
Ganghor	Gandevi	Navsari
Amalsad	Gandevi	Navsari
Vasan	Gandevi	Navsari
Kotha	Gandevi	Navsari
Masa	Gandevi	Navsari
Sarikhurd	Gandevi	Navsari
Saribujrang	Gandevi	Navsari
Dhamdachha	Gandevi	Navsari
Torangam	Gandevi	Navsari
Khergam	Gandevi	Navsari
Deshad	Gandevi	Navsari
Kalvach	Gandevi	Navsari
Ambheta	Gandevi	Navsari
Pati	Gandevi	Navsari
Valoti	Gandevi	Navsari
Devdha	Gandevi	Navsari
Chhapar	Gandevi	Navsari
Mendhar	Gandevi	Navsari
Morali	Gandevi	Navsari
Kalamtha	Gandevi	Navsari
Bhatha	Gandevi	Navsari
Dhakwada	Gandevi	Navsari
Kesali	Gandevi	Navsari
Nandarkha	Gandevi	Navsari
Vaghrech	Gandevi	Navsari
Bigri	Gandevi	Navsari
Govandi Bhathala	Gandevi	Navsari
Vangam	Gandevi	Navsari
Khaparwada	Gandevi	Navsari
Undach Luhar Faliya	Gandevi	Navsari
Undach Vaniya Faliya	Gandevi	Navsari
Nogama	Chikhli	Navsari
Saraiya	Chikhli	Navsari
Chitali	Chikhli	Navsari
Jogwad	Chikhli	Navsari
Kangvai	Chikhli	Navsari
Bodvank	Chikhli	Navsari
Tankal	Chikhli	Navsari
Minkachchh	Chikhli	Navsari
Barolia	Chikhli	Navsari
Sunthwad	Chikhli	Navsari
Degam	Chikhli	Navsari
Chasa	Chikhli	Navsari
Vanzna	Chikhli	Navsari
Ranverikalla	Chikhli	Navsari
Ranverikhurd	Chikhli	Navsari
Kharoli	Chikhli	Navsari
Kukeri	Chikhli	Navsari
Surkhai	Chikhli	Navsari
Rankuwa	Chikhli	Navsari
Undhwal	Chikhli	Navsari
Rethvania	Chikhli	Navsari
Alipor	Chikhli	Navsari
Manekpor	Chikhli	Navsari
Harangam	Chikhli	Navsari
Donja	Chikhli	Navsari
Sadadvel	Chikhli	Navsari
Bamanvel	Chikhli	Navsari
Khundh	Chikhli	Navsari
Thala	Chikhli	Navsari
Samaroli	Chikhli	Navsari
Majigam	Chikhli	Navsari
Ghekti	Chikhli	Navsari
Vankal	Chikhli	Navsari
Hond	Chikhli	Navsari
Malwada	Chikhli	Navsari
Sadakpor	Chikhli	Navsari
Khambhda	Chikhli	Navsari
Khudvel	Chikhli	Navsari
Fadvel	Chikhli	Navsari
Saravani	Chikhli	Navsari
Ambach	Chikhli	Navsari
Kanbhai	Chikhli	Navsari
Syada	Chikhli	Navsari
Kaliyari	Chikhli	Navsari
Bamanwada	Chikhli	Navsari
Amadhara	Chikhli	Navsari
Pipalgabhan	Chikhli	Navsari
Talavchora	Chikhli	Navsari
Balwada	Chikhli	Navsari
Tejlav	Chikhli	Navsari
Maliadhara	Chikhli	Navsari
Soldhara	Chikhli	Navsari
Mograwadi	Chikhli	Navsari
Gholar	Chikhli	Navsari
Godthal	Chikhli	Navsari
Velanpor	Chikhli	Navsari
Kakadvel	Chikhli	Navsari
Mandav Khadak	Chikhli	Navsari
Agasi	Chikhli	Navsari
Rumla	Chikhli	Navsari
Pananj	Chikhli	Navsari
Vad	Chikhli	Navsari
Ghej	Chikhli	Navsari
Chari	Chikhli	Navsari
Vav	Chikhli	Navsari
Achhavani	Chikhli	Navsari
Nadagdhari	Chikhli	Navsari
Dhama Dhuma	Chikhli	Navsari
Ghodvani	Chikhli	Navsari
Zari	Chikhli	Navsari
Dholumber	Chikhli	Navsari
Toranvera	Chikhli	Navsari
Panikhadak	Chikhli	Navsari
Jamanpada	Chikhli	Navsari
Debarpada	Chikhli	Navsari
Ruzvani	Chikhli	Navsari
Khergam	Chikhli	Navsari
Naranpor	Chikhli	Navsari
Nandhai	Chikhli	Navsari
Bhervi	Chikhli	Navsari
Peladi Bhervi	Chikhli	Navsari
Bahej	Chikhli	Navsari
Chimanpada	Chikhli	Navsari
Gauri	Chikhli	Navsari
Vadpada	Chikhli	Navsari
Kakadveri	Chikhli	Navsari
Pati	Chikhli	Navsari
Sindhai	Bansda	Navsari
Khambhaliya	Bansda	Navsari
Bartad (Unai)	Bansda	Navsari
Unai	Bansda	Navsari
Chadhav	Bansda	Navsari
Palgabhan	Bansda	Navsari
Bhinar	Bansda	Navsari
Kelkutch	Bansda	Navsari
Dharampuri	Bansda	Navsari
Kureliya	Bansda	Navsari
Nani Valzar	Bansda	Navsari
Singadh	Bansda	Navsari
Rupvel	Bansda	Navsari
Chapaldhara	Bansda	Navsari
Rajpur	Bansda	Navsari
Pratapnagar	Bansda	Navsari
Zari	Bansda	Navsari
Doldha	Bansda	Navsari
Kamboya	Bansda	Navsari
Limbarpada	Bansda	Navsari
Lakhawadi	Bansda	Navsari
Kandolpada	Bansda	Navsari
Kantasvel	Bansda	Navsari
Moti Valzar	Bansda	Navsari
Nani Bhamti	Bansda	Navsari
Hanumanbari	Bansda	Navsari
Kukda	Bansda	Navsari
Sara	Bansda	Navsari
Kharjai	Bansda	Navsari
Kala Amba	Bansda	Navsari
Vati	Bansda	Navsari
Sadad Devi	Bansda	Navsari
Ambabari	Bansda	Navsari
Kevdi	Bansda	Navsari
Mahuvas	Bansda	Navsari
Charanwada	Bansda	Navsari
Godhabari	Bansda	Navsari
Holipada	Bansda	Navsari
Moti Bhamti	Bansda	Navsari
Ranifaliya	Bansda	Navsari
Upsal	Bansda	Navsari
Vanarasi	Bansda	Navsari
Dubal Faliya	Bansda	Navsari
Dholumber	Bansda	Navsari
Vaghabari	Bansda	Navsari
Vandarvela	Bansda	Navsari
Kansariya	Bansda	Navsari
Rangpur	Bansda	Navsari
Vanskui	Bansda	Navsari
Limzar	Bansda	Navsari
Chikatiya	Bansda	Navsari
Jamaliya	Bansda	Navsari
Vasiya Talav	Bansda	Navsari
Sitapur	Bansda	Navsari
Navtad	Bansda	Navsari
Tadpada	Bansda	Navsari
Vaghai	Bansda	Navsari
Khambhala	Bansda	Navsari
Kapadvanj	Bansda	Navsari
Dhakmal	Bansda	Navsari
Manpur	Bansda	Navsari
Khadakiya	Bansda	Navsari
Navanagar	Bansda	Navsari
Mindhabari	Bansda	Navsari
Gangpur	Bansda	Navsari
Umarkui	Bansda	Navsari
Sukhabari	Bansda	Navsari
Kelia	Bansda	Navsari
Vadichondha	Bansda	Navsari
Kavdej	Bansda	Navsari
Lachhakadi	Bansda	Navsari
Boriachh	Bansda	Navsari
Zuj	Bansda	Navsari
Ambapani	Bansda	Navsari
Bilmoda	Bansda	Navsari
Vangan	Bansda	Navsari
Raybor	Bansda	Navsari
Khata Amba	Bansda	Navsari
Ghodmal	Bansda	Navsari
Pipalkhed	Bansda	Navsari
Ravaniya	Bansda	Navsari
Mankunia	Bansda	Navsari
Chorvani	Bansda	Navsari
Kanadha	Bansda	Navsari
Bedmal	Bansda	Navsari
Anklachh	Bansda	Navsari
Lakadbari	Bansda	Navsari
Bartad (Khanpur)	Bansda	Navsari
Khanpur	Bansda	Navsari
Satimal	Bansda	Navsari
Kamal Zari	Bansda	Navsari
Chondha	Bansda	Navsari
Mola Amba	Bansda	Navsari
Nirpan	Bansda	Navsari
Malvan	Valsad	Valsad
Kakwadi Danti	Valsad	Valsad
Untdi	Valsad	Valsad
Jespor	Valsad	Valsad
Olgam	Valsad	Valsad
Vasan	Valsad	Valsad
Vaghaldhara	Valsad	Valsad
Gorgam	Valsad	Valsad
Panchlai	Valsad	Valsad
Rola	Valsad	Valsad
Dungri	Valsad	Valsad
Dharasna	Valsad	Valsad
Dandi	Valsad	Valsad
Bhagal	Valsad	Valsad
Chharvada	Valsad	Valsad
Umarsadi	Valsad	Valsad
Shanker Talav	Valsad	Valsad
Bhanji Falia	Valsad	Valsad
Sonwada	Valsad	Valsad
Tighara	Valsad	Valsad
Dhanori	Valsad	Valsad
Endergota	Valsad	Valsad
Kundi	Valsad	Valsad
Sarodhi	Valsad	Valsad
Chikhla	Valsad	Valsad
Bhadeli Jagalala	Valsad	Valsad
Bhadeli Desai Party	Valsad	Valsad
Lilapore	Valsad	Valsad
Saron	Valsad	Valsad
Khajurdi	Valsad	Valsad
Palan	Valsad	Valsad
Fanaswada	Valsad	Valsad
Atgam	Valsad	Valsad
Segva	Valsad	Valsad
Muli	Valsad	Valsad
Kewada	Valsad	Valsad
Nandawala	Valsad	Valsad
Vejalpore	Valsad	Valsad
Gundlav	Valsad	Valsad
Gorwada	Valsad	Valsad
Ovada	Valsad	Valsad
Kochwada	Valsad	Valsad
Kalwada	Valsad	Valsad
Pitha	Valsad	Valsad
Marala	Valsad	Valsad
Sarangpur	Valsad	Valsad
Kanjan Ranchhod	Valsad	Valsad
Thakkarwada	Valsad	Valsad
Kanjan Hari	Valsad	Valsad
Jujwa	Valsad	Valsad
Ghadoi	Valsad	Valsad
Dhamdachi	Valsad	Valsad
Surwada	Valsad	Valsad
Segvi (Part)	Valsad	Valsad
Atak Pardi	Valsad	Valsad
Pathri	Valsad	Valsad
Gadaria	Valsad	Valsad
Kaparia	Valsad	Valsad
Dulsad	Valsad	Valsad
Bhutsar	Valsad	Valsad
Ronvel	Valsad	Valsad
Bhoma Pardi	Valsad	Valsad
Anjlav	Valsad	Valsad
Chanvai	Valsad	Valsad
Chichwada	Valsad	Valsad
Dived	Valsad	Valsad
Magod	Valsad	Valsad
Magod Dungri	Valsad	Valsad
Atar	Valsad	Valsad
Meh	Valsad	Valsad
Bhagod	Valsad	Valsad
Pardi Hariya	Valsad	Valsad
Hariya	Valsad	Valsad
Binwada	Valsad	Valsad
Rabada	Valsad	Valsad
Navera	Valsad	Valsad
Bodlai	Valsad	Valsad
Valandi	Valsad	Valsad
Vankal	Valsad	Valsad
Ozar	Valsad	Valsad
Kachigam	Valsad	Valsad
Kakadmati	Valsad	Valsad
Faldhara	Valsad	Valsad
Kosamkuwa	Valsad	Valsad
Velvach	Valsad	Valsad
Chinchai	Valsad	Valsad
Bhambha	Dharampur	Valsad
Maragmal	Dharampur	Valsad
Virval	Dharampur	Valsad
Rajpuri Talat	Dharampur	Valsad
Nani Dhol Dungari	Dharampur	Valsad
Moti Dhol Dungari	Dharampur	Valsad
Khatana	Dharampur	Valsad
Karanjveri	Dharampur	Valsad
Amba Talat	Dharampur	Valsad
Khanda	Dharampur	Valsad
Bhavada (Talat)	Dharampur	Valsad
Khamdahad	Dharampur	Valsad
Bopi	Dharampur	Valsad
Chasmandva	Dharampur	Valsad
Jagiri	Dharampur	Valsad
Tanachhiya	Dharampur	Valsad
Nadagdhari Jungle	Dharampur	Valsad
Sajani Barada	Dharampur	Valsad
Hathanbari	Dharampur	Valsad
Hanmatmal	Dharampur	Valsad
Luheri	Dharampur	Valsad
Kangvi	Dharampur	Valsad
Asura	Dharampur	Valsad
Ranpada	Dharampur	Valsad
Bamti	Dharampur	Valsad
Barsol	Dharampur	Valsad
Kharvel	Dharampur	Valsad
Tiskari Talat	Dharampur	Valsad
Baroliya	Dharampur	Valsad
Bilpudi	Dharampur	Valsad
Barumal	Dharampur	Valsad
Sidumber	Dharampur	Valsad
Avdha	Dharampur	Valsad
Rajpuri Jungle	Dharampur	Valsad
Gorakhada	Dharampur	Valsad
Sisumal	Dharampur	Valsad
Bhavthan Ambosi	Dharampur	Valsad
Bokaddhara	Dharampur	Valsad
Ganva	Dharampur	Valsad
Manaichondi	Dharampur	Valsad
Mama Bhacha	Dharampur	Valsad
Molveri	Dharampur	Valsad
Bildha	Dharampur	Valsad
Mordahad	Dharampur	Valsad
Vankhas	Dharampur	Valsad
Gadi	Dharampur	Valsad
Pipalpada	Dharampur	Valsad
Jamaliya	Dharampur	Valsad
Kosimpada	Dharampur	Valsad
Vathoda	Dharampur	Valsad
Pandav Khadak	Dharampur	Valsad
Upalpada	Dharampur	Valsad
Pangarbari	Dharampur	Valsad
Piprol	Dharampur	Valsad
Ukta	Dharampur	Valsad
Chichozar	Dharampur	Valsad
Zariya	Dharampur	Valsad
Kakadkuva	Dharampur	Valsad
Tanki	Dharampur	Valsad
Tumbi	Dharampur	Valsad
Kurgam	Dharampur	Valsad
Lakadmal	Dharampur	Valsad
Nani Vahiyal	Dharampur	Valsad
Fulwadi	Dharampur	Valsad
Bhensdara	Dharampur	Valsad
Kelvani	Dharampur	Valsad
Panva	Dharampur	Valsad
Titu Khadak	Dharampur	Valsad
Ranveri	Dharampur	Valsad
Pindval	Dharampur	Valsad
Vaghval	Dharampur	Valsad
Ulaspendi	Dharampur	Valsad
Sadadvera	Dharampur	Valsad
Samarsingi	Dharampur	Valsad
Sondar	Dharampur	Valsad
Murdad	Dharampur	Valsad
Madhuri	Dharampur	Valsad
Khadki	Dharampur	Valsad
Chavra	Dharampur	Valsad
Gundiya	Dharampur	Valsad
Paikhed	Dharampur	Valsad
Moti Kosbadi	Dharampur	Valsad
Bhanval	Dharampur	Valsad
Hedri	Dharampur	Valsad
Pirmal	Dharampur	Valsad
Dandval	Dharampur	Valsad
Makadban	Dharampur	Valsad
Dhamni	Dharampur	Valsad
Tamachhadi	Dharampur	Valsad
Pendha	Dharampur	Valsad
Vanjhalat	Dharampur	Valsad
Pondha Jungle	Dharampur	Valsad
Nani Kosbadi	Dharampur	Valsad
Bhavthan Jungle	Dharampur	Valsad
Tutarkhed	Dharampur	Valsad
Santvankal	Dharampur	Valsad
Khapatiya	Dharampur	Valsad
Avalkhandi	Dharampur	Valsad
Singarmal	Dharampur	Valsad
Moti Korval	Dharampur	Valsad
Nani Korval	Dharampur	Valsad
Dhakval	Dharampur	Valsad
Mohna Kavchali	Dharampur	Valsad
Vansda Jungle	Dharampur	Valsad
Mohpada	Dharampur	Valsad
Bhutrun	Dharampur	Valsad
Khoba	Dharampur	Valsad
Umarsadi	Pardi	Valsad
Balda	Pardi	Valsad
Kumbhariya	Pardi	Valsad
Sondhalwada	Pardi	Valsad
Parvasa	Pardi	Valsad
Kachwal	Pardi	Valsad
Mota Waghchhipa	Pardi	Valsad
Nana Waghchhipa	Pardi	Valsad
Sukhesh	Pardi	Valsad
Borlai	Pardi	Valsad
Sukhlav	Pardi	Valsad
Velparva	Pardi	Valsad
Khadki	Pardi	Valsad
Motiwada	Pardi	Valsad
Palsana	Pardi	Valsad
Kalsar	Pardi	Valsad
Udwada	Pardi	Valsad
Kolak	Pardi	Valsad
Kikarla	Pardi	Valsad
Rentlav	Pardi	Valsad
Dungri	Pardi	Valsad
Dashwada	Pardi	Valsad
Amli	Pardi	Valsad
Sonwada	Pardi	Valsad
Varai	Pardi	Valsad
Nimkhal	Pardi	Valsad
Panchlai	Pardi	Valsad
Lakhmapor	Pardi	Valsad
Nevri	Pardi	Valsad
Rabdi	Pardi	Valsad
Asma	Pardi	Valsad
Tarmaliya	Pardi	Valsad
Khuntej	Pardi	Valsad
Sarodhi	Pardi	Valsad
Saran	Pardi	Valsad
Tarakpardi	Pardi	Valsad
Vatar	Pardi	Valsad
Kunta	Pardi	Valsad
Morai	Pardi	Valsad
Bagwada	Pardi	Valsad
Tighara	Pardi	Valsad
Paria	Pardi	Valsad
Rohina	Pardi	Valsad
Samarpada	Pardi	Valsad
Dhagadmal	Pardi	Valsad
Daheli	Pardi	Valsad
Chival	Pardi	Valsad
Arnala	Pardi	Valsad
Pati	Pardi	Valsad
Goima	Pardi	Valsad
Barai	Pardi	Valsad
Dumalav	Pardi	Valsad
Tukwada	Pardi	Valsad
Ambach	Pardi	Valsad
Kherlav	Pardi	Valsad
Pandor	Pardi	Valsad
Rata	Pardi	Valsad
Chharwada	Pardi	Valsad
Namdha	Pardi	Valsad
Chandor	Pardi	Valsad
Kocharva	Pardi	Valsad
Vankachh	Pardi	Valsad
Koparli	Pardi	Valsad
Kaval	Pardi	Valsad
Karaya	Pardi	Valsad
Nani Tambadi	Pardi	Valsad
Degam	Pardi	Valsad
Moti Tambadi	Pardi	Valsad
Karamkhal	Pardi	Valsad
Chibhad Kachchh	Pardi	Valsad
Babarkhadak	Kaprada	Valsad
Vadkhambha	Kaprada	Valsad
Kharedi	Kaprada	Valsad
Moti Vahiyal	Kaprada	Valsad
Nali Madhani	Kaprada	Valsad
Arnai	Kaprada	Valsad
Amdha	Kaprada	Valsad
Panas	Kaprada	Valsad
Dhodhad kuva	Kaprada	Valsad
Sukhala	Kaprada	Valsad
Ambheti	Kaprada	Valsad
Kakadkopar	Kaprada	Valsad
Vajvad	Kaprada	Valsad
Balchondhi	Kaprada	Valsad
Nana Pondha	Kaprada	Valsad
Jogvel	Kaprada	Valsad
Khuntli	Kaprada	Valsad
Ozarda	Kaprada	Valsad
Kunda	Kaprada	Valsad
Veri Bhavada	Kaprada	Valsad
Mendha	Kaprada	Valsad
Mani	Kaprada	Valsad
Borpada	Kaprada	Valsad
Tokarpada	Kaprada	Valsad
Panchvera	Kaprada	Valsad
Keldha	Kaprada	Valsad
Piproti	Kaprada	Valsad
Bhavada Jagiri (Forest)	Kaprada	Valsad
Chichpada	Kaprada	Valsad
Nandgam	Kaprada	Valsad
Matuniya	Kaprada	Valsad
Chandvegan	Kaprada	Valsad
Varoli Talat	Kaprada	Valsad
Kajli	Kaprada	Valsad
Kothar	Kaprada	Valsad
Mota Pondha	Kaprada	Valsad
Ozar	Kaprada	Valsad
Bhandar Kutch	Kaprada	Valsad
Mandva	Kaprada	Valsad
Kaprada	Kaprada	Valsad
Dabkhal	Kaprada	Valsad
Dabhadi	Kaprada	Valsad
Chavshala	Kaprada	Valsad
Rahor	Kaprada	Valsad
Kasatveri	Kaprada	Valsad
Vavar	Kaprada	Valsad
Barpuda	Kaprada	Valsad
Huda	Kaprada	Valsad
Ghotan	Kaprada	Valsad
Amba Jungle	Kaprada	Valsad
Divsi	Kaprada	Valsad
Bilaniya	Kaprada	Valsad
Khadakval	Kaprada	Valsad
Rohiyal Talat	Kaprada	Valsad
Manala	Kaprada	Valsad
Vaddha	Kaprada	Valsad
Jam Gabhan	Kaprada	Valsad
Jirval	Kaprada	Valsad
Varna	Kaprada	Valsad
Andharpada	Kaprada	Valsad
Hedalbari	Kaprada	Valsad
Burla	Kaprada	Valsad
Varvath	Kaprada	Valsad
Lavkar	Kaprada	Valsad
Dixal	Kaprada	Valsad
Fali	Kaprada	Valsad
Sutharpada	Kaprada	Valsad
Kotalgam	Kaprada	Valsad
Girnara	Kaprada	Valsad
Narvad	Kaprada	Valsad
Dhaman Vegan	Kaprada	Valsad
Karjun	Kaprada	Valsad
Niloshi	Kaprada	Valsad
Sildha	Kaprada	Valsad
Astol	Kaprada	Valsad
Khatuniya	Kaprada	Valsad
Sukalbari	Kaprada	Valsad
Dahikhed	Kaprada	Valsad
Burvad	Kaprada	Valsad
Kastoniya	Kaprada	Valsad
Ketki	Kaprada	Valsad
Pendhardevi	Kaprada	Valsad
Eklera	Kaprada	Valsad
Singartati	Kaprada	Valsad
Sarvartati	Kaprada	Valsad
Kolvera	Kaprada	Valsad
Vadset	Kaprada	Valsad
Valveri	Kaprada	Valsad
Pipalset	Kaprada	Valsad
Viraxet	Kaprada	Valsad
Vadoli	Kaprada	Valsad
Aslona	Kaprada	Valsad
Shahuda	Kaprada	Valsad
Chepa	Kaprada	Valsad
Bamanvel	Kaprada	Valsad
Umli	Kaprada	Valsad
Karchond	Kaprada	Valsad
Fatepur	Kaprada	Valsad
Piproni	Kaprada	Valsad
Meghval	Kaprada	Valsad
Madhuban	Kaprada	Valsad
Raymal	Kaprada	Valsad
Nagar	Kaprada	Valsad
Varoli Jungle	Kaprada	Valsad
Tiskari Jungle	Kaprada	Valsad
Vadi	Kaprada	Valsad
Teri Chikhli	Kaprada	Valsad
Moti Palsan	Kaprada	Valsad
Rohiyal Jungle	Kaprada	Valsad
Nani Palsan	Kaprada	Valsad
Likhavad	Kaprada	Valsad
Biliya	Kaprada	Valsad
Malghar	Kaprada	Valsad
Ghotval	Kaprada	Valsad
Asalkanti	Kaprada	Valsad
Ghanveri	Kaprada	Valsad
Bhurval	Kaprada	Valsad
Umarpada	Kaprada	Valsad
Ghadvi	Kaprada	Valsad
Dharanmal	Kaprada	Valsad
Tukvada	Kaprada	Valsad
Bhatheri	Kaprada	Valsad
Kumbhset	Kaprada	Valsad
Malungi	Kaprada	Valsad
Titumal	Kaprada	Valsad
Nirval	Kaprada	Valsad
Dighi	Kaprada	Valsad
Suliya	Kaprada	Valsad
Fansa	Umbergaon	Valsad
Kalai	Umbergaon	Valsad
Pali Karambeli	Umbergaon	Valsad
Mohan	Umbergaon	Valsad
Jamburi	Umbergaon	Valsad
Pali	Umbergaon	Valsad
Kalgam	Umbergaon	Valsad
Punat	Umbergaon	Valsad
Eklahare	Umbergaon	Valsad
Nahuli	Umbergaon	Valsad
Valwada	Umbergaon	Valsad
Achchhari	Umbergaon	Valsad
Bhathi Karambeli	Umbergaon	Valsad
Angam	Umbergaon	Valsad
Maroli	Umbergaon	Valsad
Tadgam	Umbergaon	Valsad
Sarai	Umbergaon	Valsad
Manda	Umbergaon	Valsad
Boralai	Umbergaon	Valsad
Borigam	Umbergaon	Valsad
Kachigam	Umbergaon	Valsad
Dhanoli	Umbergaon	Valsad
Mamakwada	Umbergaon	Valsad
Seronda	Umbergaon	Valsad
Manekpur	Umbergaon	Valsad
Talwada	Umbergaon	Valsad
Nagwas	Umbergaon	Valsad
Zaroli	Umbergaon	Valsad
Nandigam	Umbergaon	Valsad
Malav	Umbergaon	Valsad
Vankas	Umbergaon	Valsad
Khattalwada	Umbergaon	Valsad
Ahu	Umbergaon	Valsad
Nargol	Umbergaon	Valsad
Tumb	Umbergaon	Valsad
Anklas	Umbergaon	Valsad
Ghimsa Kankariya	Umbergaon	Valsad
Tembhi	Umbergaon	Valsad
Palgam	Umbergaon	Valsad
Govada	Umbergaon	Valsad
Dahad	Umbergaon	Valsad
Humran	Umbergaon	Valsad
Karambele	Umbergaon	Valsad
Nesh	Olpad	Surat
Karanj	Olpad	Surat
Pardi Zankhri	Olpad	Surat
Kamroli	Olpad	Surat
Mandroi	Olpad	Surat
Thothab	Olpad	Surat
Koba	Olpad	Surat
Pardi Koba	Olpad	Surat
Kasad	Olpad	Surat
Kadrama	Olpad	Surat
Bhadol	Olpad	Surat
Vadoli	Olpad	Surat
Umrachhi	Olpad	Surat
Anita	Olpad	Surat
Bolav	Olpad	Surat
Kimamli	Olpad	Surat
Kathodra	Olpad	Surat
Simalthu	Olpad	Surat
Pardi Bhadoly	Olpad	Surat
Kanbhi	Olpad	Surat
Erthan	Olpad	Surat
Takarma	Olpad	Surat
Sarsana	Olpad	Surat
Sondamitha	Olpad	Surat
Asnad	Olpad	Surat
Naghoi	Olpad	Surat
Mindhi	Olpad	Surat
Jinod	Olpad	Surat
Mor	Olpad	Surat
Bhagwa	Olpad	Surat
Delasa	Olpad	Surat
Mirjapor	Olpad	Surat
Sondlakhara	Olpad	Surat
Hathisa	Olpad	Surat
Kumbhari	Olpad	Surat
Bhatgam	Olpad	Surat
Andhi	Olpad	Surat
Mahamedpor	Olpad	Surat
Gola	Olpad	Surat
Morthan	Olpad	Surat
Vihara	Olpad	Surat
Kachhab	Olpad	Surat
Syadla	Olpad	Surat
Mulad	Olpad	Surat
Kudsad	Olpad	Surat
Kareli	Olpad	Surat
Bharundi	Olpad	Surat
Obhla	Olpad	Surat
Kanthraj	Olpad	Surat
Sithan	Olpad	Surat
Achharan	Olpad	Surat
Atodra	Olpad	Surat
Olpad	Olpad	Surat
Saras	Olpad	Surat
Kapasi	Olpad	Surat
Dandi	Olpad	Surat
Kuvad	Olpad	Surat
Orma	Olpad	Surat
Jafrabad	Olpad	Surat
Asnabad	Olpad	Surat
Isanpor	Olpad	Surat
Karamla	Olpad	Surat
Sandhiyer	Olpad	Surat
Khalipor	Olpad	Surat
Madhar	Olpad	Surat
Paria	Olpad	Surat
Siwan	Olpad	Surat
Kanyasi	Olpad	Surat
Umra	Olpad	Surat
Delad	Olpad	Surat
Gothan	Olpad	Surat
Vaswari	Olpad	Surat
Segwasyadla	Olpad	Surat
Sherdi	Olpad	Surat
Kosam	Olpad	Surat
Vadod	Olpad	Surat
Talad	Olpad	Surat
Masma	Olpad	Surat
Balkas	Olpad	Surat
Sarol	Olpad	Surat
Veluk	Olpad	Surat
Kasla Bujrang	Olpad	Surat
Kasala Khurd	Olpad	Surat
Kachhol	Olpad	Surat
Kundiyana	Olpad	Surat
Admor	Olpad	Surat
Lavachha	Olpad	Surat
Bhandut	Olpad	Surat
Selut	Olpad	Surat
Narthan	Olpad	Surat
Ariyana	Olpad	Surat
Ambheta	Olpad	Surat
Sonsak	Olpad	Surat
Jothan	Olpad	Surat
Kanad	Olpad	Surat
Saroli	Olpad	Surat
Kunkni	Olpad	Surat
Dihen	Olpad	Surat
Pinjrat	Olpad	Surat
Tena	Olpad	Surat
Barbodhan	Olpad	Surat
Sithana	Olpad	Surat
Segwachhama	Olpad	Surat
Hathuran	Mangrol	Surat
Nana Borsara	Mangrol	Surat
Dhamdod	Mangrol	Surat
Nandav	Mangrol	Surat
Moti Pardi	Mangrol	Surat
Vansoli	Mangrol	Surat
Kantva	Mangrol	Surat
Dinod	Mangrol	Surat
Boridara	Mangrol	Surat
Ankdod	Mangrol	Surat
Gijram	Mangrol	Surat
Amnedara	Mangrol	Surat
Nani Pardi	Mangrol	Surat
Harsani	Mangrol	Surat
Timbarva	Mangrol	Surat
Bhilvada	Mangrol	Surat
Bhadkuva	Mangrol	Surat
Vad	Mangrol	Surat
Amarkui	Mangrol	Surat
Kevdi (Kund)	Mangrol	Surat
Isanpur	Mangrol	Surat
Lavet	Mangrol	Surat
Motifali	Mangrol	Surat
Khareda	Mangrol	Surat
Kargara	Mangrol	Surat
Mangrol	Mangrol	Surat
Mosali	Mangrol	Surat
Kanvada	Mangrol	Surat
Kosadi	Mangrol	Surat
Luvara	Mangrol	Surat
Asarma	Mangrol	Surat
Ghunti	Mangrol	Surat
Sava	Mangrol	Surat
Kathvada	Mangrol	Surat
Mahuej	Mangrol	Surat
Kumvarda	Mangrol	Surat
Siyalaj	Mangrol	Surat
Mota Borsara	Mangrol	Surat
Moti Naroli	Mangrol	Surat
Hathoda	Mangrol	Surat
Velachha	Mangrol	Surat
Limbada	Mangrol	Surat
Ranakpor	Mangrol	Surat
Simodara	Mangrol	Surat
Vadoli	Mangrol	Surat
Charetha	Mangrol	Surat
Shah	Mangrol	Surat
Gadkachh	Mangrol	Surat
Jhinora	Mangrol	Surat
Dholikui	Mangrol	Surat
Nani Fali	Mangrol	Surat
Nandola	Mangrol	Surat
Pataldevi	Mangrol	Surat
Kantvav	Mangrol	Surat
Jhankhvav	Mangrol	Surat
Selarpur	Mangrol	Surat
Mandan(Boria)	Mangrol	Surat
Jharni	Mangrol	Surat
Vankal	Mangrol	Surat
Ambavadi	Mangrol	Surat
Vasravi	Mangrol	Surat
Jhankharda	Mangrol	Surat
Vastan	Mangrol	Surat
Surali	Mangrol	Surat
Nogama	Mangrol	Surat
Ansodala	Mangrol	Surat
Shenthi	Mangrol	Surat
Panetha	Mangrol	Surat
Valesa	Mangrol	Surat
Kothva	Mangrol	Surat
Palod	Mangrol	Surat
Bhatkol	Mangrol	Surat
Pipodara	Mangrol	Surat
Lindiad	Mangrol	Surat
Chhamuchhal	Mangrol	Surat
Molvan	Mangrol	Surat
Limodara	Mangrol	Surat
Nani Naroli	Mangrol	Surat
Umelav	Mangrol	Surat
Dungri	Mangrol	Surat
Borsad	Mangrol	Surat
Ratola	Mangrol	Surat
Verakui	Mangrol	Surat
Kansali	Mangrol	Surat
Amkhuta	Mangrol	Surat
Ratoli	Mangrol	Surat
Boria	Mangrol	Surat
Ognisa	Mangrol	Surat
Sanadhara	Mangrol	Surat
Ghodbar	Mangrol	Surat
Umbhariya	Umarpada	Surat
Nasarpore	Umarpada	Surat
Zarpan	Umarpada	Surat
Sarvan Fokdi	Umarpada	Surat
Kali jaman	Umarpada	Surat
Charni	Umarpada	Surat
Sadadapani	Umarpada	Surat
Velavi	Umarpada	Surat
Sarda	Umarpada	Surat
Kevdi (Sharda)	Umarpada	Surat
Gondaliya	Umarpada	Surat
Chitalda	Umarpada	Surat
Umarkhadi	Umarpada	Surat
Umarjhar	Umarpada	Surat
Vadi	Umarpada	Surat
Gundikuva	Umarpada	Surat
Mandan(Pada)	Umarpada	Surat
Pada	Umarpada	Surat
Sampura	Umarpada	Surat
Kadvidadra	Umarpada	Surat
Govat	Umarpada	Surat
Bardi	Umarpada	Surat
Taval	Umarpada	Surat
Chavda	Umarpada	Surat
Nana Sutkhadka	Umarpada	Surat
Nava Chakra	Umarpada	Surat
Umarda	Umarpada	Surat
Moti Devrupan	Umarpada	Surat
Chakra	Umarpada	Surat
Chimipatal	Umarpada	Surat
Sevlan	Umarpada	Surat
Satvan	Umarpada	Surat
Khodamba	Umarpada	Surat
Panch Amba	Umarpada	Surat
Umarpada	Umarpada	Surat
Chandrapada	Umarpada	Surat
Unchvan	Umarpada	Surat
Gopalia	Umarpada	Surat
Khambha Bangli	Umarpada	Surat
Balalkuva	Umarpada	Surat
Amli Dabda	Umarpada	Surat
Vahar	Umarpada	Surat
Pinpur	Umarpada	Surat
Darda	Umarpada	Surat
Umargot	Umarpada	Surat
Ghanawad	Umarpada	Surat
Chokhvada	Umarpada	Surat
Bilvan	Umarpada	Surat
Bardipada	Umarpada	Surat
Rudhi Gavan	Umarpada	Surat
Dongripada	Umarpada	Surat
Vadgam	Umarpada	Surat
Zarawadi	Umarpada	Surat
Haldhari	Umarpada	Surat
Divtan	Umarpada	Surat
Haripura	Umarpada	Surat
Vadpada	Umarpada	Surat
Ranikund	Umarpada	Surat
Bijalwadi	Umarpada	Surat
Vakrant Amba	Umarpada	Surat
Ambadi	Umarpada	Surat
Jumawadi	Umarpada	Surat
Salli	Umarpada	Surat
Karanj	Mandvi	Surat
Varethi	Mandvi	Surat
Tadkeshvar	Mandvi	Surat
Togapur	Mandvi	Surat
Dharampor	Mandvi	Surat
Kolsana	Mandvi	Surat
Tuked	Mandvi	Surat
Patal	Mandvi	Surat
Kalmoi	Mandvi	Surat
Parvat	Mandvi	Surat
Ladkuva	Mandvi	Surat
Choramba	Mandvi	Surat
Isar	Mandvi	Surat
Balethi	Mandvi	Surat
Luharvad	Mandvi	Surat
Soli	Mandvi	Surat
Petarkui	Mandvi	Surat
Jamkui	Mandvi	Surat
Picharvan	Mandvi	Surat
Sarsi	Mandvi	Surat
Sarpada	Mandvi	Surat
Bundha	Mandvi	Surat
Devgiri	Mandvi	Surat
Amli	Mandvi	Surat
Limdha	Mandvi	Surat
Kolkhadi	Mandvi	Surat
Devgadh	Mandvi	Surat
Junvan	Mandvi	Surat
Kim Dungra	Mandvi	Surat
Dadakui	Mandvi	Surat
Regama	Mandvi	Surat
Khod Amba	Mandvi	Surat
Madharkui	Mandvi	Surat
Borigala	Mandvi	Surat
Kolakui	Mandvi	Surat
Ushker Ramkund	Mandvi	Surat
Rosvad	Mandvi	Surat
Virpor	Mandvi	Surat
Munjlav	Mandvi	Surat
Baudhan	Mandvi	Surat
Vadod	Mandvi	Surat
Nogama	Mandvi	Surat
Antroli	Mandvi	Surat
Fali	Mandvi	Surat
Chudel	Mandvi	Surat
Uteva	Mandvi	Surat
Titoi	Mandvi	Surat
Kalibel	Mandvi	Surat
Goddha	Mandvi	Surat
Fulvadi	Mandvi	Surat
Khareda	Mandvi	Surat
Maldha	Mandvi	Surat
Tarapor	Mandvi	Surat
Gangpor Devgadh	Mandvi	Surat
Andhatri Devgadh	Mandvi	Surat
Jhari Devgadh	Mandvi	Surat
Limbodi	Mandvi	Surat
Khimpor	Mandvi	Surat
Dhvajamba	Mandvi	Surat
Karvati	Mandvi	Surat
Katkuva	Mandvi	Surat
Lakhgam	Mandvi	Surat
Gamtalav Khurd	Mandvi	Surat
Umarkhadi	Mandvi	Surat
Tarsadakhurd	Mandvi	Surat
Moritha	Mandvi	Surat
Salaiya	Mandvi	Surat
Amba	Mandvi	Surat
Jhab	Mandvi	Surat
Jharpan	Mandvi	Surat
Areth	Mandvi	Surat
Kevadiya	Mandvi	Surat
Patna	Mandvi	Surat
Vareli	Mandvi	Surat
Vegi	Mandvi	Surat
Naren	Mandvi	Surat
Kasal	Mandvi	Surat
Pardi	Mandvi	Surat
Karvali	Mandvi	Surat
Valargadh	Mandvi	Surat
Ghantoli	Mandvi	Surat
Badtal	Mandvi	Surat
Sathvav	Mandvi	Surat
Makanjhar	Mandvi	Surat
Kalamkuva	Mandvi	Surat
Kevdi	Mandvi	Surat
Bhensi	Mandvi	Surat
Chhelvas	Mandvi	Surat
Karutha	Mandvi	Surat
Rundha	Mandvi	Surat
Gangpor Harshad	Mandvi	Surat
Dadhvada	Mandvi	Surat
Sarkui	Mandvi	Surat
Beddha	Mandvi	Surat
Bhatkhai	Mandvi	Surat
Vaghnera	Mandvi	Surat
Kakadva	Mandvi	Surat
Amalsadi	Mandvi	Surat
Godsamba	Mandvi	Surat
Bori	Mandvi	Surat
Nandpor	Mandvi	Surat
Gavachhi	Mandvi	Surat
Piparia	Mandvi	Surat
Khanjroli	Mandvi	Surat
Kamlapor	Mandvi	Surat
Kharoli	Mandvi	Surat
Umarsadi	Mandvi	Surat
Kosadi	Mandvi	Surat
Godavadi	Mandvi	Surat
Un	Mandvi	Surat
Gamtalav Bujrang	Mandvi	Surat
Puna	Mandvi	Surat
Khedpur	Mandvi	Surat
Ushker Khurd	Mandvi	Surat
Rupan	Mandvi	Surat
Kakdapar	Mandvi	Surat
Pipalvada	Mandvi	Surat
Gundvan	Mandvi	Surat
Rakhvav	Mandvi	Surat
Vankla	Mandvi	Surat
Vareth	Mandvi	Surat
Jakhla	Mandvi	Surat
Birama	Mandvi	Surat
Varjakhan	Mandvi	Surat
Tarsadabar Gam	Mandvi	Surat
Rataniya	Mandvi	Surat
Rajvad	Mandvi	Surat
Moti Cher	Mandvi	Surat
Nani Cher	Mandvi	Surat
Jamankuva Bar	Mandvi	Surat
Sadadi	Mandvi	Surat
Patavadi	Mandvi	Surat
Pipalvan	Mandvi	Surat
Khatradevi	Mandvi	Surat
Visdalya	Mandvi	Surat
Karanjvan	Mandvi	Surat
Dhvaj	Mandvi	Surat
Ambapor	Mandvi	Surat
Jhari Dadhvada	Mandvi	Surat
Rakhas Khadi	Mandvi	Surat
Jetpur	Mandvi	Surat
Haripura Kanghat	Mandvi	Surat
Amalchuni	Mandvi	Surat
Chandpor	Mandvi	Surat
Mahudi	Mandvi	Surat
Magatra	Mandvi	Surat
Balaltirth	Mandvi	Surat
Balanga	Mandvi	Surat
Amalvan	Mandvi	Surat
Vishala	Mandvi	Surat
Shekhpur	Kamrej	Surat
Ghaludi	Kamrej	Surat
Antroli	Kamrej	Surat
Tharoli	Kamrej	Surat
Navi Paradi	Kamrej	Surat
Akhakhol	Kamrej	Surat
Ghala	Kamrej	Surat
Karjan	Kamrej	Surat
Dhoran Paradi	Kamrej	Surat
Velanja	Kamrej	Surat
Kathor	Kamrej	Surat
Choryasi	Kamrej	Surat
Bhairav	Kamrej	Surat
Kholeshwar	Kamrej	Surat
Machhi	Kamrej	Surat
Dhatva	Kamrej	Surat
Jior	Kamrej	Surat
Dungra	Kamrej	Surat
Delad	Kamrej	Surat
Kamrej	Kamrej	Surat
Kholvad	Kamrej	Surat
Bhada	Kamrej	Surat
Abrama	Kamrej	Surat
Valak	Kamrej	Surat
Laskana	Kamrej	Surat
Navagam	Kamrej	Surat
Nansad	Kamrej	Surat
Koli Bharthana	Kamrej	Surat
Netrang	Kamrej	Surat
Digas	Kamrej	Surat
Timba	Kamrej	Surat
Sampura	Kamrej	Surat
Orna	Kamrej	Surat
Jat Bharthana	Kamrej	Surat
Dharutha	Kamrej	Surat
Vav	Kamrej	Surat
Pasodara	Kamrej	Surat
Khadsad	Kamrej	Surat
Kathodara	Kamrej	Surat
Simadi	Kamrej	Surat
Jokha	Kamrej	Surat
Asta	Kamrej	Surat
Sevni	Kamrej	Surat
Delad	Kamrej	Surat
Dethli	Kamrej	Surat
Vihan	Kamrej	Surat
Segva	Kamrej	Surat
Morthana	Kamrej	Surat
Kosamadi	Kamrej	Surat
Kosmada	Kamrej	Surat
Chhedchha	Kamrej	Surat
Oviyan	Kamrej	Surat
Ladvi	Kamrej	Surat
Valthan	Kamrej	Surat
Mankna	Kamrej	Surat
Valan	Kamrej	Surat
Alura	Kamrej	Surat
Vansdarundhi	Kamrej	Surat
Mirapur	Kamrej	Surat
Khanpur	Kamrej	Surat
Dungar	Kamrej	Surat
Nagod	Kamrej	Surat
Rundhvada	Kamrej	Surat
Pali	Kamrej	Surat
Parab	Kamrej	Surat
Umbhel	Kamrej	Surat
Haldharu	Kamrej	Surat
Chikhli	Kamrej	Surat
Vansva	Chorasi	Surat
Damka	Chorasi	Surat
Malgama	Chorasi	Surat
Bhesan	Chorasi	Surat
Okha	Chorasi	Surat
Chichi	Chorasi	Surat
Vanakala	Chorasi	Surat
Vihel	Chorasi	Surat
Asarma	Chorasi	Surat
Bhatlai	Chorasi	Surat
Rajgari	Chorasi	Surat
Sunvali	Chorasi	Surat
Saroli	Chorasi	Surat
Saniya Hemad	Chorasi	Surat
Vedchha	Chorasi	Surat
Sabargam	Chorasi	Surat
Kumbharia	Chorasi	Surat
Devadh	Chorasi	Surat
Hajira	Chorasi	Surat
Karadva	Chorasi	Surat
Dakhkhanvada	Chorasi	Surat
Deladva	Chorasi	Surat
Mohni	Chorasi	Surat
Timbarva	Chorasi	Surat
Goja	Chorasi	Surat
Khambhasla	Chorasi	Surat
Saniya Kanade	Chorasi	Surat
Eklera	Chorasi	Surat
Bhanodra	Chorasi	Surat
Kharvasa	Chorasi	Surat
Bonand	Chorasi	Surat
Ravla Alias Vaktana	Chorasi	Surat
Bhatia	Chorasi	Surat
Vanz	Chorasi	Surat
Umber	Chorasi	Surat
Lajpor	Chorasi	Surat
Popda	Chorasi	Surat
Kapletha	Chorasi	Surat
Kachholi	Chorasi	Surat
Samrod	Chorasi	Surat
Sedhav	Palsana	Surat
Niyol	Palsana	Surat
Antroli	Palsana	Surat
Haripura	Palsana	Surat
Jolva	Palsana	Surat
Dastan	Palsana	Surat
Kareli	Palsana	Surat
Bagumara	Palsana	Surat
Tantithaiya	Palsana	Surat
Vankaneda	Palsana	Surat
Kharbhasi	Palsana	Surat
Karala	Palsana	Surat
Karan	Palsana	Surat
Sanki	Palsana	Surat
Jetpor	Palsana	Surat
Barasadi	Palsana	Surat
Gangpor	Palsana	Surat
Soyani	Palsana	Surat
Tundi	Palsana	Surat
Tantizaghda	Palsana	Surat
Talodara	Palsana	Surat
Erthan	Palsana	Surat
Vadadala	Palsana	Surat
Baleshvar	Palsana	Surat
Bhutpor	Palsana	Surat
Ghaluda	Palsana	Surat
Dhamdod	Palsana	Surat
Pisad	Palsana	Surat
Vanesa	Palsana	Surat
Gotiya	Palsana	Surat
Ena	Palsana	Surat
Isroli	Palsana	Surat
Taraj	Palsana	Surat
Lingad	Palsana	Surat
Intalva	Palsana	Surat
Palsana	Palsana	Surat
Makhinga	Palsana	Surat
Kanav	Palsana	Surat
Vanzolia	Palsana	Surat
Amalsadi	Palsana	Surat
Malekpor	Palsana	Surat
Siyod	Palsana	Surat
Pardipata	Palsana	Surat
Puni	Palsana	Surat
Lakhanpor	Palsana	Surat
Ambheti	Palsana	Surat
Mota	Bardoli	Surat
Movachhi	Bardoli	Surat
Moti Falod	Bardoli	Surat
Bharampor	Bardoli	Surat
Vaghecha Kadod	Bardoli	Surat
Bhamaiya	Bardoli	Surat
Uchharel	Bardoli	Surat
Haripura	Bardoli	Surat
Kadod	Bardoli	Surat
Masad	Bardoli	Surat
Miyawadi	Bardoli	Surat
Rajwad	Bardoli	Surat
Nasura	Bardoli	Surat
Vadhvaniya	Bardoli	Surat
Singod	Bardoli	Surat
Bamni	Bardoli	Surat
Samthan	Bardoli	Surat
Kantali	Bardoli	Surat
Pardi Kadod	Bardoli	Surat
Ruwa	Bardoli	Surat
Varad	Bardoli	Surat
Isanpor	Bardoli	Surat
Kharvasa	Bardoli	Surat
Umrakh	Bardoli	Surat
Astan	Bardoli	Surat
Panada	Bardoli	Surat
Rajpura Lumbha	Bardoli	Surat
Rayam	Bardoli	Surat
Khoj	Bardoli	Surat
Palsod	Bardoli	Surat
Akoti	Bardoli	Surat
Orgam	Bardoli	Surat
Junvani	Bardoli	Surat
Balda	Bardoli	Surat
Vanskui	Bardoli	Surat
Bhensudla	Bardoli	Surat
Nani Bhatlav	Bardoli	Surat
Mangrolia	Bardoli	Surat
Sankri	Bardoli	Surat
Dhamdod Lumbha	Bardoli	Surat
Ten	Bardoli	Surat
Nadida	Bardoli	Surat
Khali	Bardoli	Surat
Tajpor Khurd	Bardoli	Surat
Utara	Bardoli	Surat
Vadhava	Bardoli	Surat
Timbarva	Bardoli	Surat
Pipariya	Bardoli	Surat
Madhi	Bardoli	Surat
Surali	Bardoli	Surat
Manekpor	Bardoli	Surat
Uva	Bardoli	Surat
Karachaka	Bardoli	Surat
Hindolia	Bardoli	Surat
Kikvad	Bardoli	Surat
Afva	Bardoli	Surat
Isroli	Bardoli	Surat
Tajpore Bujrang	Bardoli	Surat
Goji	Bardoli	Surat
Bamroli	Bardoli	Surat
Gotasa	Bardoli	Surat
Sarethi	Bardoli	Surat
Moti Bhatlav	Bardoli	Surat
Sejvad	Bardoli	Surat
Allu	Bardoli	Surat
Vankaner	Bardoli	Surat
Kanai	Bardoli	Surat
Ninat	Bardoli	Surat
Pathradiya	Bardoli	Surat
Nizar	Bardoli	Surat
Pardi Valod	Bardoli	Surat
Babla	Bardoli	Surat
Sarbhon	Bardoli	Surat
Bhuvasan	Bardoli	Surat
Zakharda	Bardoli	Surat
Ancheli	Bardoli	Surat
Vadoli	Bardoli	Surat
Naugama	Bardoli	Surat
Vaghech Sarbhon	Bardoli	Surat
Pardi Vagha	Bardoli	Surat
Tarbhon	Bardoli	Surat
Kuvadiya	Bardoli	Surat
Chhitra	Bardoli	Surat
Kharad	Bardoli	Surat
Tarsadi	Mahuva	Surat
Pathron	Mahuva	Surat
Boriya	Mahuva	Surat
Mahudi	Mahuva	Surat
Shankar Talavdi	Mahuva	Surat
Mahuva	Mahuva	Surat
Dhundhesa	Mahuva	Surat
Jol	Mahuva	Surat
Kani	Mahuva	Surat
Ranat	Mahuva	Surat
Amroli	Mahuva	Surat
Amchak	Mahuva	Surat
Ondach	Mahuva	Surat
Budhleshvar	Mahuva	Surat
Miyapur	Mahuva	Surat
Shekhpur	Mahuva	Surat
Mudat	Mahuva	Surat
Andhatri	Mahuva	Surat
Vadiya	Mahuva	Surat
Dungari	Mahuva	Surat
Naldhara	Mahuva	Surat
Kachhal	Mahuva	Surat
Kadiya	Mahuva	Surat
Khandal	Mahuva	Surat
Kodada	Mahuva	Surat
Narda	Mahuva	Surat
Kavitha	Mahuva	Surat
Sevasan	Mahuva	Surat
Nihali	Mahuva	Surat
Dholikui	Mahuva	Surat
Fulvadi	Mahuva	Surat
Vachhavad	Mahuva	Surat
Bartad	Mahuva	Surat
Karcheliya	Mahuva	Surat
Kadhaiya	Mahuva	Surat
Vanskui	Mahuva	Surat
Kharvan	Mahuva	Surat
Bilkhadi	Mahuva	Surat
Dedvasan	Mahuva	Surat
Gopla	Mahuva	Surat
Ghadoi	Mahuva	Surat
Vagheshvar	Mahuva	Surat
Jhervavra	Mahuva	Surat
Bamaniya	Mahuva	Surat
Vank	Mahuva	Surat
Algat	Mahuva	Surat
Butvada	Mahuva	Surat
Puna	Mahuva	Surat
Vasrai	Mahuva	Surat
Gunasvel	Mahuva	Surat
Velanpur	Mahuva	Surat
Sanvalla	Mahuva	Surat
Kankariya	Mahuva	Surat
Samba	Mahuva	Surat
Bhoriya	Mahuva	Surat
Valvada	Mahuva	Surat
Dhamkhadi	Mahuva	Surat
Machhisadada	Mahuva	Surat
Mahuvariya	Mahuva	Surat
Haladva	Mahuva	Surat
Umra	Mahuva	Surat
Kumkotar	Mahuva	Surat
Gangadiya	Mahuva	Surat
Lasanpor	Mahuva	Surat
Vaheval	Mahuva	Surat
Tarkani	Mahuva	Surat
Anaval	Mahuva	Surat
Kos	Mahuva	Surat
Angaldhara	Mahuva	Surat
Umja	Nizar	Tapi
Chokhiamli	Nizar	Tapi
Akkalutar	Nizar	Tapi
Borikuwa	Nizar	Tapi
Kevdamoi	Nizar	Tapi
Balambe	Nizar	Tapi
Rajpur	Nizar	Tapi
Tulse	Nizar	Tapi
Chirmati	Nizar	Tapi
Mataval	Nizar	Tapi
Amode Tarfe Talode	Nizar	Tapi
Aste Tarfe Budhaval	Nizar	Tapi
Kelani	Nizar	Tapi
Fulwadi	Nizar	Tapi
Modale	Nizar	Tapi
Medhpur	Nizar	Tapi
Taranda	Nizar	Tapi
Moramba	Nizar	Tapi
Varpada	Nizar	Tapi
Jhumkathi	Nizar	Tapi
Itwai	Nizar	Tapi
Ziribeda	Nizar	Tapi
Parod	Nizar	Tapi
Dabriamba	Nizar	Tapi
Gangtha	Nizar	Tapi
Ashapur	Nizar	Tapi
Ranaichi	Nizar	Tapi
Amode Tarfe Satone	Nizar	Tapi
Pati	Nizar	Tapi
Kukarmunda	Nizar	Tapi
Kondraj	Nizar	Tapi
Gorasa	Nizar	Tapi
Pimlas	Nizar	Tapi
Untavad	Nizar	Tapi
Ashrava	Nizar	Tapi
Hathode	Nizar	Tapi
Bahurupa	Nizar	Tapi
Nimbhore	Nizar	Tapi
Sadagvan	Nizar	Tapi
Pishavar	Nizar	Tapi
Ubhad	Nizar	Tapi
Bhamsal	Nizar	Tapi
Hol	Nizar	Tapi
Satola	Nizar	Tapi
Balde	Nizar	Tapi
Antruli	Nizar	Tapi
Kothli Budrak	Nizar	Tapi
Nevale	Nizar	Tapi
Gadid	Nizar	Tapi
Bej	Nizar	Tapi
Jhapampi-Alis Jhampa Amli	Nizar	Tapi
Patipada	Nizar	Tapi
Lekurvadi	Nizar	Tapi
Hathnur Digar	Nizar	Tapi
Adada	Nizar	Tapi
Mubarakpur	Nizar	Tapi
Vanka	Nizar	Tapi
Chinchoda	Nizar	Tapi
Shelu	Nizar	Tapi
Hingni-Digar	Nizar	Tapi
Sulvade	Nizar	Tapi
Vyaval	Nizar	Tapi
Piplod Tarfe -Nizar	Nizar	Tapi
Devala	Nizar	Tapi
Sarvale	Nizar	Tapi
Harduli Digar	Nizar	Tapi
Nizar	Nizar	Tapi
Kvelde	Nizar	Tapi
Khodada	Nizar	Tapi
Borde	Nizar	Tapi
Bhil Bhavali	Nizar	Tapi
Arkund	Nizar	Tapi
Deo-Mogra-Gaibiumar	Nizar	Tapi
Shale	Nizar	Tapi
Raygadh	Nizar	Tapi
Gujarpur	Nizar	Tapi
Gamdi	Nizar	Tapi
Lakshmi Kheda	Nizar	Tapi
Bhil Jamboli	Nizar	Tapi
Mogran	Uchchhal	Tapi
Ukai Resettlement Village No-2	Uchchhal	Tapi
Pati-Bandhara	Uchchhal	Tapi
Mohpada	Uchchhal	Tapi
Gavan	Uchchhal	Tapi
Ful-Umran	Uchchhal	Tapi
Karod	Uchchhal	Tapi
Sevti	Uchchhal	Tapi
Ukai Resettlement Village No-1	Uchchhal	Tapi
Mohini	Uchchhal	Tapi
Vaghsepa Mota	Uchchhal	Tapi
Vaghsepa Nana	Uchchhal	Tapi
Vadpada(Nesu)	Uchchhal	Tapi
Jamli	Uchchhal	Tapi
Chandapur	Uchchhal	Tapi
Chikhli	Uchchhal	Tapi
Thuti	Uchchhal	Tapi
Chhapti	Uchchhal	Tapi
Babarghat	Uchchhal	Tapi
Bhintkhurd	Uchchhal	Tapi
Vadpatal	Uchchhal	Tapi
Abhankuva	Uchchhal	Tapi
Parchuli	Uchchhal	Tapi
Pankhri	Uchchhal	Tapi
Mirkot	Uchchhal	Tapi
Selud	Uchchhal	Tapi
Jamki	Uchchhal	Tapi
Sase	Uchchhal	Tapi
Bhintbudrak	Uchchhal	Tapi
Haripur	Uchchhal	Tapi
Manekpur	Uchchhal	Tapi
Sundarpur	Uchchhal	Tapi
Khabda	Uchchhal	Tapi
Uchchhal	Uchchhal	Tapi
Dhaj	Uchchhal	Tapi
Sakarda	Uchchhal	Tapi
Bhad Bhunja	Uchchhal	Tapi
Anandpur	Uchchhal	Tapi
Jharanpada	Uchchhal	Tapi
Kataswan	Uchchhal	Tapi
Vadgam	Uchchhal	Tapi
Kanchli	Uchchhal	Tapi
Tavli	Uchchhal	Tapi
Vaghchhipa	Uchchhal	Tapi
Kumbhrad	Uchchhal	Tapi
Samarkuva	Songadh	Tapi
Singalvan	Songadh	Tapi
Otatokarva	Songadh	Tapi
Ukai Resettlement Village No-3	Songadh	Tapi
Borda	Songadh	Tapi
Jhari Amba	Songadh	Tapi
Gundi	Songadh	Tapi
Vajpur	Songadh	Tapi
Satkashi	Songadh	Tapi
Kuilivel	Songadh	Tapi
Amalpada	Songadh	Tapi
Bavli	Songadh	Tapi
Serulla	Songadh	Tapi
Limbi	Songadh	Tapi
Sar Jamli	Songadh	Tapi
Nindvada	Songadh	Tapi
Bhatvada	Songadh	Tapi
Khervada	Songadh	Tapi
Ghasiya Medha	Songadh	Tapi
Sisor	Songadh	Tapi
Panch Pipla	Songadh	Tapi
Bhanpur	Songadh	Tapi
Jamapur	Songadh	Tapi
Vekur	Songadh	Tapi
Bori Savar	Songadh	Tapi
Vadda P Bhensrot	Songadh	Tapi
Singal Khanch	Songadh	Tapi
Bundha	Songadh	Tapi
Silatvel	Songadh	Tapi
Patharda	Songadh	Tapi
Vadi Bhensrot	Songadh	Tapi
Singpur	Songadh	Tapi
Vaghnera	Songadh	Tapi
Dhajamba	Songadh	Tapi
Veljhar	Songadh	Tapi
Chikhli Bhensrot	Songadh	Tapi
Vajharda	Songadh	Tapi
Bedvan P Bhensrot	Songadh	Tapi
Ukhalda	Songadh	Tapi
Jhadpati	Songadh	Tapi
Galkhadi	Songadh	Tapi
Pipalkuva	Songadh	Tapi
Moti Khervan	Songadh	Tapi
Nani Khervan	Songadh	Tapi
Ghoda	Songadh	Tapi
Bhimpura	Songadh	Tapi
Vagda	Songadh	Tapi
Gunsada	Songadh	Tapi
Dumda	Songadh	Tapi
Amlipada	Songadh	Tapi
Kelai	Songadh	Tapi
Kavla	Songadh	Tapi
Amli	Songadh	Tapi
Bedi	Songadh	Tapi
Agasvan	Songadh	Tapi
Nishana	Songadh	Tapi
Achhalva	Songadh	Tapi
Sadadkuva	Songadh	Tapi
Bedvan Khadka	Songadh	Tapi
Rampura Kothar	Songadh	Tapi
Champavadi	Songadh	Tapi
Pokhran	Songadh	Tapi
Kikakui	Songadh	Tapi
Mandal	Songadh	Tapi
Chakalia	Songadh	Tapi
Khambhala	Songadh	Tapi
Dosvada	Songadh	Tapi
Kumkuva	Songadh	Tapi
Rupvada	Songadh	Tapi
Chapaldhara	Songadh	Tapi
Raniamba	Songadh	Tapi
Balamrai	Songadh	Tapi
Gaisavar	Songadh	Tapi
Chimkuva	Songadh	Tapi
Tokarva (Segupada)	Songadh	Tapi
Tokarva (Jamankuva)	Songadh	Tapi
Kakad Kuva	Songadh	Tapi
Ghanchikuva	Songadh	Tapi
Khanjar	Songadh	Tapi
Kharsi	Songadh	Tapi
Devalpada	Songadh	Tapi
Kanala	Songadh	Tapi
Chorvad	Songadh	Tapi
Chikhli Khadka	Songadh	Tapi
Dhamodi	Songadh	Tapi
Junvan	Songadh	Tapi
Galkuva	Songadh	Tapi
Bedpada	Songadh	Tapi
Kanadevi	Songadh	Tapi
Rampura Kanadevi	Songadh	Tapi
Nana Bandharpada	Songadh	Tapi
Jharali	Songadh	Tapi
Nani Bhurvan	Songadh	Tapi
Medhsingi	Songadh	Tapi
Khokhsa	Songadh	Tapi
Kanji	Songadh	Tapi
Don	Songadh	Tapi
Moti Bhurvan	Songadh	Tapi
Hiravadi	Songadh	Tapi
Amba	Songadh	Tapi
Kukradungri	Songadh	Tapi
Kukadjhar	Songadh	Tapi
Vadpada P Tokarva	Songadh	Tapi
Ghodchit	Songadh	Tapi
Bandharpada	Songadh	Tapi
Gatadi	Songadh	Tapi
Tichakia	Songadh	Tapi
Hanmantiya	Songadh	Tapi
Mahudi	Songadh	Tapi
Monghvan	Songadh	Tapi
Maiyali	Songadh	Tapi
Sandhkuva	Songadh	Tapi
Tarsadi	Songadh	Tapi
Kakad Kuva P Umarda	Songadh	Tapi
Bedvan P Umarda	Songadh	Tapi
Vadpada P Umarda	Songadh	Tapi
Jamkhadi	Songadh	Tapi
Medha	Songadh	Tapi
Golan	Songadh	Tapi
Nana Tarpada	Songadh	Tapi
Ojhar	Songadh	Tapi
Hindla	Songadh	Tapi
Khadi	Songadh	Tapi
Sadadvel	Songadh	Tapi
Bharadada	Songadh	Tapi
Gopalpura	Songadh	Tapi
Vanjhafali	Songadh	Tapi
Amalgundi	Songadh	Tapi
Chakvan	Songadh	Tapi
Borkuva	Songadh	Tapi
Kalaghat	Songadh	Tapi
Mota Satsila	Songadh	Tapi
Ghodi Ruvali	Songadh	Tapi
Ghuntvel	Songadh	Tapi
Vadpada P Umarda	Songadh	Tapi
Taparvada	Songadh	Tapi
Gunkhadi	Songadh	Tapi
Temka	Songadh	Tapi
Masanpada	Songadh	Tapi
Dardi	Songadh	Tapi
Umarda	Songadh	Tapi
Dhanmauli	Songadh	Tapi
Amthava	Songadh	Tapi
Shravaniya	Songadh	Tapi
Lavchali	Songadh	Tapi
Chimer	Songadh	Tapi
Kanti	Songadh	Tapi
Seljhar	Songadh	Tapi
Borpada	Songadh	Tapi
Khogal Gam	Songadh	Tapi
Mota Tarpada	Songadh	Tapi
Kapad Bandh	Songadh	Tapi
Siraspada	Songadh	Tapi
Vadirupgadh	Songadh	Tapi
Chikhalapada	Songadh	Tapi
Khapatia	Songadh	Tapi
Mohpada(Malangdev)	Songadh	Tapi
Virthava	Songadh	Tapi
Ekva Golan	Songadh	Tapi
Malangdev	Songadh	Tapi
Karvanda	Songadh	Tapi
Langad	Songadh	Tapi
Ghusargam	Songadh	Tapi
Bhorthava	Songadh	Tapi
Otta	Songadh	Tapi
Rasmati	Songadh	Tapi
Pahadada	Songadh	Tapi
Mal	Songadh	Tapi
Sadadun	Songadh	Tapi
Sinand	Songadh	Tapi
Amaldi	Songadh	Tapi
Ajvar	Songadh	Tapi
Mandvi Pani	Songadh	Tapi
Junai	Songadh	Tapi
Songir	Songadh	Tapi
Kanja	Vyara	Tapi
Kala Vyara	Vyara	Tapi
Bedkuva Dur	Vyara	Tapi
Khod Talav	Vyara	Tapi
Unchamala	Vyara	Tapi
Limbarda	Vyara	Tapi
Vadkui	Vyara	Tapi
Umarkuva	Vyara	Tapi
Ghata	Vyara	Tapi
Katiskuva Dur	Vyara	Tapi
Vanskui	Vyara	Tapi
Champavadi	Vyara	Tapi
Vaghpani	Vyara	Tapi
Sadadvan	Vyara	Tapi
Dungargam	Vyara	Tapi
Lotarva	Vyara	Tapi
Bhanavadi	Vyara	Tapi
Katasvan	Vyara	Tapi
Chikhalvav	Vyara	Tapi
Rampura Najik	Vyara	Tapi
Katiskuva Najik	Vyara	Tapi
Sarkuva	Vyara	Tapi
Katgadh	Vyara	Tapi
Bedkuva Najik	Vyara	Tapi
Indu	Vyara	Tapi
Khushalpura	Vyara	Tapi
Kohli	Vyara	Tapi
Borkhadi	Vyara	Tapi
Maypur	Vyara	Tapi
Tichakpura	Vyara	Tapi
Paniyari	Vyara	Tapi
Bhatpur	Vyara	Tapi
Panvadi	Vyara	Tapi
Kanpura	Vyara	Tapi
Tadkuva	Vyara	Tapi
Virpur	Vyara	Tapi
Chikhli	Vyara	Tapi
Vaghjhari	Vyara	Tapi
Chikhalda	Vyara	Tapi
Musa	Vyara	Tapi
Madav	Vyara	Tapi
Jetvadi	Vyara	Tapi
Kapura	Vyara	Tapi
Andharvadi Najik	Vyara	Tapi
Bhojpur Najik	Vyara	Tapi
Shahpur	Vyara	Tapi
Rupvada	Vyara	Tapi
Khanpur	Vyara	Tapi
Chhirma	Vyara	Tapi
Malotha	Vyara	Tapi
Dadakvan	Vyara	Tapi
Magarkui	Vyara	Tapi
Chhindia	Vyara	Tapi
Veldha	Vyara	Tapi
Saraiya	Vyara	Tapi
Pervad	Vyara	Tapi
Dolara	Vyara	Tapi
Meghpur	Vyara	Tapi
Sankli	Vyara	Tapi
Dhat	Vyara	Tapi
Kanjan	Vyara	Tapi
Umarkui	Vyara	Tapi
Kelkui	Vyara	Tapi
Gheriyavav	Vyara	Tapi
Kasvav	Vyara	Tapi
Ramkuva	Vyara	Tapi
Bamnamal Najik	Vyara	Tapi
Khuntadiya	Vyara	Tapi
Arkund	Vyara	Tapi
Kapadvan	Vyara	Tapi
Khurdi	Vyara	Tapi
Lakhali	Vyara	Tapi
Jhankhari	Vyara	Tapi
Nana Satsila	Vyara	Tapi
Dholia Umar	Vyara	Tapi
Chhevdi	Vyara	Tapi
Birbara	Vyara	Tapi
Bhurivel	Vyara	Tapi
Chichbardi	Vyara	Tapi
Mirpur	Vyara	Tapi
Karanjvel	Vyara	Tapi
Katkui	Vyara	Tapi
Balpur	Vyara	Tapi
Vandar Devi	Vyara	Tapi
Ambiya	Vyara	Tapi
Jesingpur	Vyara	Tapi
Umarkachchh	Vyara	Tapi
Dharampura	Vyara	Tapi
Kalakva	Vyara	Tapi
Beda Raypura	Vyara	Tapi
Bagalpur	Vyara	Tapi
Gangpur	Vyara	Tapi
Kamlapor	Vyara	Tapi
Bedchit	Vyara	Tapi
Gadat	Vyara	Tapi
Umarvav Najik	Vyara	Tapi
Mangalia	Vyara	Tapi
Dhamandevi	Vyara	Tapi
Valotha	Vyara	Tapi
Vadpada	Vyara	Tapi
Rani Amba	Vyara	Tapi
Dhongi Amba	Vyara	Tapi
Kelvan	Vyara	Tapi
Barmada	Vyara	Tapi
Ambapani	Vyara	Tapi
Chakdhara	Vyara	Tapi
Garvan	Vyara	Tapi
Palavadi	Vyara	Tapi
Dhanturi	Vyara	Tapi
Rampura Dur	Vyara	Tapi
Rengan Kachchh	Vyara	Tapi
Bhojpur Dur	Vyara	Tapi
Vankla	Vyara	Tapi
Ghani	Vyara	Tapi
Bamnamal Dur	Vyara	Tapi
Pati	Vyara	Tapi
Kumbhia	Vyara	Tapi
Palasia	Vyara	Tapi
Antapur	Vyara	Tapi
Kalamkui	Vyara	Tapi
Achhopalo	Vyara	Tapi
Amonia	Vyara	Tapi
Haripura	Vyara	Tapi
Dholka	Vyara	Tapi
Andharvadi Dur	Vyara	Tapi
Panchol	Vyara	Tapi
Dolvan	Vyara	Tapi
Kakadva	Vyara	Tapi
Kosamkuva	Vyara	Tapi
Pithadara	Vyara	Tapi
Jamalia	Vyara	Tapi
Bardipada	Vyara	Tapi
Pipalwada	Vyara	Tapi
Dhangdhar	Vyara	Tapi
Karanjkhed	Vyara	Tapi
Kandha	Vyara	Tapi
Garpani	Vyara	Tapi
Pathakwadi	Vyara	Tapi
Umarvav Dur	Vyara	Tapi
Varjakhan	Vyara	Tapi
Takiamba	Vyara	Tapi
Besaniya	Vyara	Tapi
Raygadh	Vyara	Tapi
Halmundi	Vyara	Tapi
Amania	Vyara	Tapi
Padam Dungari	Vyara	Tapi
Borkachchh	Vyara	Tapi
Chunawadi	Vyara	Tapi
Dungarda	Vyara	Tapi
Bedkuva	Valod	Tapi
Dhamodla	Valod	Tapi
Kalamkui	Valod	Tapi
Kaher	Valod	Tapi
Beldha	Valod	Tapi
Syadla	Valod	Tapi
Titva	Valod	Tapi
Kamalchhod	Valod	Tapi
Tokarva	Valod	Tapi
Khambhla	Valod	Tapi
Shiker	Valod	Tapi
Shahpor	Valod	Tapi
Nansad	Valod	Tapi
Inama	Valod	Tapi
Butwada	Valod	Tapi
Degama	Valod	Tapi
Ambach	Valod	Tapi
Vedchhi	Valod	Tapi
Valod	Valod	Tapi
Delwada	Valod	Tapi
Mordevi	Valod	Tapi
Bahej	Valod	Tapi
Kosambiya	Valod	Tapi
Nalotha	Valod	Tapi
Ranveri	Valod	Tapi
Kumbhiya	Valod	Tapi
Kanajod	Valod	Tapi
Bhimpor	Valod	Tapi
Golan	Valod	Tapi
Dadariya	Valod	Tapi
Hathuka	Valod	Tapi
Dumkhal	Valod	Tapi
Adyapor	Valod	Tapi
Jamaniya	Valod	Tapi
Algat	Valod	Tapi
Goddha	Valod	Tapi
Andhatri	Valod	Tapi
Buhari	Valod	Tapi
Pelad Buhari	Valod	Tapi
Virpor	Valod	Tapi
`;

export interface GujaratVillage {
  village: string;
  taluka: string;
  district: string;
}

export const GUJARAT_VILLAGES: GujaratVillage[] = RAW.trim()
  .split("\n")
  .map((line) => {
    const [village, taluka, district] = line.split("\t");
    return { village, taluka, district };
  });
