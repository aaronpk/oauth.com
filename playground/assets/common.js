
function generate_state() {
  return random_string(16);
}

function generate_auth_code() {
  return random_string(48);
}

function generate_code_verifier() {
  return random_string(48);
}

function generate_code_challenge(verifier) {
  return base64_urlencode(sha256bin(verifier));
}

function generate_client_id() {
  return random_string(24);
}

function generate_client_secret() {
  return random_string(48);
}

function generate_access_token() {
  return random_string(72);
}

function generate_refresh_token() {
  return random_string(24);
}

function generate_id_token() {
  var sig = 'ZoPvZPaomdOnnz2GFRGbgaW7PPWIMFDqSBp0gbN4An4a9F-Bc-4_T9EBGV8aGetyjZYAON0gjNV0p0NGFiwettePWKuxBzusuGCEd9iXWWUO9-WTF5e2AGr3_jkg34dbxfiFXy3KgH7m0czm809cMaiZ_ofLYgJHVD8lqMQoWifhoNhpjPqa19Svc3nCHzSYHUgTXQWvA56NmQvyVPh_OM7GMpc6zHopmihJqt3eREof8N-bOd7FL39jeam2-k1TFSDogyJE513aC0OssRADr_TWvtL8xoaPkXM_7bXYs9_7erXmzF9la0hvmOuasieetpLhOvFeoiOJWCU9xhxj4Q';
  var name = Cookies.get("user_login").split("@")[0].split("-").map(capitalize).join(" ");
  return base64_urlencode(JSON.stringify({
    "kid": "s16tqSm88pDJ8TfB_7kHKPRAPF85wUDTlmyo9ILTe7s",
    "alg": "RS256"
  }))+"."+base64_urlencode(JSON.stringify({
    "sub": Cookies.get("user_login"),
    "name": name,
    "email": Cookies.get("user_login"),
    "iss": "https://pk-demo.okta.com/oauth2/default",
    "aud": Cookies.get("client_id"),
    "iat": Math.round((new Date()).getTime()/1000),
    "exp": Math.round((new Date()).getTime()/1000)+(86400*30),
    "amr": [
      "pwd"
    ],
  }))+"."+sig;
}

var adjectives = 'adorable adventurous aggressive agreeable alert alive amused angry annoyed annoying anxious arrogant ashamed attractive average awful bad beautiful better bewildered black bloody blue blue-eyed blushing bored brainy brave breakable bright busy calm careful cautious charming cheerful clean clear clever cloudy clumsy colorful combative comfortable concerned condemned confused cooperative courageous crazy creepy crowded cruel curious cute dangerous dark dead defeated defiant delightful depressed determined different difficult disgusted distinct disturbed dizzy doubtful drab dull eager easy elated elegant embarrassed enchanting encouraging energetic enthusiastic envious evil excited expensive exuberant fair faithful famous fancy fantastic fierce filthy fine foolish fragile frail frantic friendly frightened funny gentle gifted glamorous gleaming glorious good gorgeous graceful grieving grotesque grumpy handsome happy healthy helpful helpless hilarious homeless homely horrible hungry hurt ill important impossible inexpensive innocent inquisitive itchy jealous jittery jolly joyous kind lazy light lively lonely long lovely lucky magnificent misty modern motionless muddy mushy mysterious nasty naughty nervous nice nutty obedient obnoxious odd old open outrageous outstanding panicky perfect plain pleasant poised poor powerful precious prickly proud puzzled quaint real relieved repulsive rich scary selfish shiny shy silly sleepy smiling smoggy sore sparkling splendid spotless stormy strange stupid successful super talented tame tender tense terrible testy thankful thoughtful thoughtless tired tough troubled ugliest ugly uninterested unsightly unusual upset uptight vast victorious vivacious wandering weary wicked wild witty worrisome worried wrong xenophobic xanthous xerothermic yawning yellowed yucky zany zealous';
var nouns = 'aardvark addax albatross alligator alpaca anaconda angelfish anteater antelope ant ape armadillo baboon badger barracuda bat batfish bear beaver bee beetle bird bison boar booby buffalo bug butterfly buzzard caiman camel capuchin capybara caracal cardinal caribou cassowary cat caterpillar centipede chamois cheetah chicken chimpanzee chinchilla chipmunk cicada civet cobra cockroach cod constrictor copperhead cormorant corncrake cottonmouth cowfish cow coyote crab crane crayfish crocodile crossbill curlew deer dingo dog dogfish dolphin donkey dormouse dotterel dove dragonfly duck dugong dunlin eagle earthworm echidna eel eland elephant elk emu falcon ferret finch fish flamingo flatworm fly fowl fox frog gannet gaur gazelle gecko gemsbok gentoo gerbil gerenuk gharial gibbon giraffe gnat gnu goat goldfinch goosander goose gorilla goshawk grasshopper grebe grivet grouse guanaco gull hamerkop hamster hare hawk hedgehog heron herring hippopotamus hoopoe hornet horse hummingbird hyena ibex ibis iguana impala jackal jaguar jay jellyfish kangaroo katipo kea kestrel kingfisher kinkajou kitten koala kookaburra kouprey kudu ladybird lapwing lark lemur leopard lion lizard llama lobster locust loris louse lynx lyrebird macaque macaw magpie mallard mamba manatee mandrill mantis manx markhor marten meerkat millipede mink mockingbird mole mongoose monkey moose mosquito moth mouse narwhal newt nightingale ocelot octopus okapi opossum orangutan oryx osprey ostrich otter owl ox oyster oystercatcher panda panther parrot partridge peacock peafowl peccary pelican penguin petrel pheasant pig pigeon pintail piranha platypus plover polecat pollan pony porcupine porpoise puffin puma pygmy quagga quail quelea quetzal quoll rabbit raccoon rat ratel rattlesnake raven ray reindeer rhinoceros rook sable salamander salmon sandpiper sardine scarab seahorse seal serval shark sheep shrew shrike skimmer skipper skunk skylark sloth snail snake spider squirrel stag starling stoat stork swan swiftlet tamarin tapir tarantula tarsier teira termite tern thrush tiger toad tortoise toucan trout tuatara turkey turtle unicorn vendace vicuña vole vulture wallaby walrus warbler wasp weasel weevil whale wildebeest willet wolf wolverine wombat worm wren wryneck xenomorph yacare yak zebra';


function generate_username() {
  return random_adjective()+'-'+random_noun()+'@example.com';
}

function generate_password() {
  return capitalize(random_adjective())+'-'+capitalize(random_noun())+'-'+(Math.floor(Math.random()*100));
}

function random_adjective() {
  var items = adjectives.split(' ');
  return items[Math.floor(Math.random() * items.length)];
}

function random_noun() {
  var items = nouns.split(' ');
  return items[Math.floor(Math.random() * items.length)];
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function completeStep(n) {
  $(".step-item:nth-child("+n+")").addClass("is-active").addClass("is-completed");
}

function moveToStep(n) {
  completeStep(n-1);
  $(".step-item:nth-child("+n+")").addClass("is-active");
}

function scrollAnimated(top) {
  top += $(".hero").outerHeight();
  $("html,body").animate({scrollTop: top});
}

function showError() {
  $("#progress-section").addClass("hidden");
  $("#error-section").removeClass("hidden");
}

var client_info = {};

$(function(){
  var heroHeight = $(".hero.is-primary").height();

  $(window).bind("scroll", function(e) {
    if($(window).scrollTop() > heroHeight) {
      $("body").addClass("sticky");
    } else {
      $("body").removeClass("sticky");
    }
  });

  $("#open-userinfo").click(function(e){
    window.open("user-info.html", "OAuth 2.0 Playground User Info", "width=400,height=200,scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no");
    e.preventDefault();
  });
});

function initializeClient(error, success) {
  if(Cookies.get("client_id")) {
    client_info.client_id = Cookies.get("client_id");
    client_info.client_secret = Cookies.get("client_secret");
    client_info.okta_url = Cookies.get("okta_url");
    client_info.base_url = Cookies.get("base_url");
    client_info.user_login = Cookies.get("user_login");
    client_info.user_password = Cookies.get("user_password");

    $(".client-id").text(client_info.client_id);
    $(".client-secret").text(client_info.client_secret);
    $(".okta-url").text(client_info.okta_url);
    $(".base-url").text(client_info.base_url);
    $(".user-login").text(client_info.user_login);
    $(".user-password").text(client_info.user_password);

    if(success) {
      success();
    }
  } else {
    if(error) {
      error();
    }
  }
}
