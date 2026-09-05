// Factual records are kept separate from reply wording in categories/wtf-*.
export const HTTP: Record<string, {name:string; meaning:string; causes:string[]; try:string[]}> = {
  '400': {name:'Bad Request',meaning:'The server could not understand the request because it was malformed.',causes:['invalid syntax','missing required parameter'],try:['check request syntax','validate input']},
  '401': {name:'Unauthorized',meaning:'Authentication is required or failed.',causes:['missing credentials','expired token'],try:['authenticate','refresh credentials']},
  '403': {name:'Forbidden',meaning:'The server understood the request but refuses to authorize it.',causes:['missing permission','policy restriction'],try:['check permissions','contact an administrator']},
  '404': {name:'Not Found',meaning:'The server could not find the requested resource.',causes:['wrong URL','deleted resource'],try:['check the URL','verify the resource exists']},
  '408': {name:'Request Timeout',meaning:'The server did not receive a complete request in time.',causes:['slow connection','client stalled'],try:['retry the request','check network connectivity']},
  '409': {name:'Conflict',meaning:'The request conflicts with the current state of the resource.',causes:['concurrent update','duplicate resource'],try:['refresh state','resolve the conflict']},
  '418': {name:"I'm a Teapot",meaning:'The server refuses to brew coffee because it is a teapot.',causes:['intentional test response'],try:['use a coffee maker','check application logic']},
  '429': {name:'Too Many Requests',meaning:'The client sent too many requests in a period of time.',causes:['rate limit exceeded','retry loop'],try:['back off','respect Retry-After']},
  '500': {name:'Internal Server Error',meaning:'The server encountered an unexpected condition.',causes:['unhandled exception','bad configuration'],try:['inspect server logs','retry if safe']},
  '502': {name:'Bad Gateway',meaning:'The server acting as a gateway received an invalid response from an upstream server.',causes:['upstream service unavailable','proxy or load balancer issue','network failure'],try:['retry the request','check upstream health','inspect proxy logs']},
  '503': {name:'Service Unavailable',meaning:'The server is temporarily unable to handle the request.',causes:['maintenance','overload'],try:['retry later','check service status']},
  '504': {name:'Gateway Timeout',meaning:'A gateway did not receive a timely response from an upstream server.',causes:['slow upstream','network timeout'],try:['retry the request','inspect upstream latency']}
};
export const TERMS: Record<string, Record<string,string>> = {
  CORS:{expansion:'Cross-Origin Resource Sharing',meaning:'A browser security mechanism controlling whether one origin can access resources from another.',common_mistake:'Trying to fix a server-to-server request by changing browser CORS headers.'},
  DNS:{expansion:'Domain Name System',meaning:'The distributed system that maps domain names to network addresses.',common_mistake:'Assuming a DNS change is visible everywhere immediately.'},
  TLS:{expansion:'Transport Layer Security',meaning:'A protocol that encrypts communication between network endpoints.',common_mistake:'Treating certificate validation failures as harmless.'},
  JWT:{expansion:'JSON Web Token',meaning:'A compact signed token format commonly used to convey claims.',common_mistake:'Decoding a token and assuming it was verified.'},
  OAuth:{expansion:'Open Authorization',meaning:'A framework for delegated authorization between services.',common_mistake:'Using OAuth as if it were authentication by itself.'},
  HTTP:{expansion:'Hypertext Transfer Protocol',meaning:'An application protocol for exchanging web resources.',common_mistake:'Assuming HTTP status always describes application success.'}
};
export const ERRORS: Record<string, Record<string,string>> = { ECONNRESET:{meaning:'A peer abruptly closed a network connection.'}, ECONNREFUSED:{meaning:'No process accepted a connection at the target address.'}, ETIMEDOUT:{meaning:'An operation did not complete within its configured time.'}, ENOTFOUND:{meaning:'The hostname could not be resolved.'}, EADDRINUSE:{meaning:'The requested network address is already in use.'}, ENOENT:{meaning:'A requested file or directory does not exist.'}, OOM:{meaning:'The process ran out of available memory.'}, CORS:TERMS.CORS, DNS:TERMS.DNS, TLS:TERMS.TLS };

