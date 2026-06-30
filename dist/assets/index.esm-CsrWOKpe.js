import{F as Ae,L as ye,g as we,_ as Ce,a as Ne,b as Le,D as be,c as Pe,C as Me,r as J}from"./index-BT3sGfM2.js";var K="@firebase/ai",H="2.13.1";/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P="AI",Q="us-central1",re="firebasevertexai.googleapis.com",v="v1beta",X=H,De="gl-js",ve="hybrid",ke=180*1e3,Ue="gemini-2.5-flash-lite";/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class c extends Ae{constructor(e,t,n){const o=P,i=`${o}/${e}`,a=`${o}: ${t} (${i})`;super(e,a),this.code=e,this.customErrorData=n,Error.captureStackTrace&&Error.captureStackTrace(this,c),Object.setPrototypeOf(this,c.prototype),this.toString=()=>a}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const z=["user","model","function","system"],kt={HARM_CATEGORY_HATE_SPEECH:"HARM_CATEGORY_HATE_SPEECH",HARM_CATEGORY_SEXUALLY_EXPLICIT:"HARM_CATEGORY_SEXUALLY_EXPLICIT",HARM_CATEGORY_HARASSMENT:"HARM_CATEGORY_HARASSMENT",HARM_CATEGORY_DANGEROUS_CONTENT:"HARM_CATEGORY_DANGEROUS_CONTENT"},Ut={BLOCK_LOW_AND_ABOVE:"BLOCK_LOW_AND_ABOVE",BLOCK_MEDIUM_AND_ABOVE:"BLOCK_MEDIUM_AND_ABOVE",BLOCK_ONLY_HIGH:"BLOCK_ONLY_HIGH",BLOCK_NONE:"BLOCK_NONE",OFF:"OFF"},xt={SEVERITY:"SEVERITY",PROBABILITY:"PROBABILITY"},Gt={NEGLIGIBLE:"NEGLIGIBLE",LOW:"LOW",MEDIUM:"MEDIUM",HIGH:"HIGH"},ce={HARM_SEVERITY_NEGLIGIBLE:"HARM_SEVERITY_NEGLIGIBLE",HARM_SEVERITY_LOW:"HARM_SEVERITY_LOW",HARM_SEVERITY_MEDIUM:"HARM_SEVERITY_MEDIUM",HARM_SEVERITY_HIGH:"HARM_SEVERITY_HIGH",HARM_SEVERITY_UNSUPPORTED:"HARM_SEVERITY_UNSUPPORTED"},Ft={SAFETY:"SAFETY",OTHER:"OTHER",BLOCKLIST:"BLOCKLIST",PROHIBITED_CONTENT:"PROHIBITED_CONTENT"},g={STOP:"STOP",MAX_TOKENS:"MAX_TOKENS",SAFETY:"SAFETY",RECITATION:"RECITATION",OTHER:"OTHER",BLOCKLIST:"BLOCKLIST",PROHIBITED_CONTENT:"PROHIBITED_CONTENT",SPII:"SPII",MALFORMED_FUNCTION_CALL:"MALFORMED_FUNCTION_CALL",IMAGE_SAFETY:"IMAGE_SAFETY",IMAGE_PROHIBITED_CONTENT:"IMAGE_PROHIBITED_CONTENT",IMAGE_OTHER:"IMAGE_OTHER",NO_IMAGE:"NO_IMAGE",IMAGE_RECITATION:"IMAGE_RECITATION",LANGUAGE:"LANGUAGE",UNEXPECTED_TOOL_CALL:"UNEXPECTED_TOOL_CALL",TOO_MANY_TOOL_CALLS:"TOO_MANY_TOOL_CALLS",MISSING_THOUGHT_SIGNATURE:"MISSING_THOUGHT_SIGNATURE",MALFORMED_RESPONSE:"MALFORMED_RESPONSE"},Ht={SQUARE_1x1:"1:1",PORTRAIT_9x16:"9:16",LANDSCAPE_16x9:"16:9",PORTRAIT_3x4:"3:4",LANDSCAPE_4x3:"4:3",PORTRAIT_2x3:"2:3",LANDSCAPE_3x2:"3:2",PORTRAIT_4x5:"4:5",LANDSCAPE_5x4:"5:4",PORTRAIT_1x4:"1:4",LANDSCAPE_4x1:"4:1",PORTRAIT_1x8:"1:8",LANDSCAPE_8x1:"8:1",ULTRAWIDE_21x9:"21:9"},$t={SIZE_512:"512",SIZE_1K:"1K",SIZE_2K:"2K",SIZE_4K:"4K"},Bt={AUTO:"AUTO",ANY:"ANY",NONE:"NONE"},Vt={MODALITY_UNSPECIFIED:"MODALITY_UNSPECIFIED",TEXT:"TEXT",IMAGE:"IMAGE",VIDEO:"VIDEO",AUDIO:"AUDIO",DOCUMENT:"DOCUMENT"},Yt={TEXT:"TEXT",IMAGE:"IMAGE",AUDIO:"AUDIO"},R={PREFER_ON_DEVICE:"prefer_on_device",ONLY_ON_DEVICE:"only_on_device",ONLY_IN_CLOUD:"only_in_cloud",PREFER_IN_CLOUD:"prefer_in_cloud"},I={ON_DEVICE:"on_device",IN_CLOUD:"in_cloud"},qt={UNSPECIFIED:"OUTCOME_UNSPECIFIED",OK:"OUTCOME_OK",FAILED:"OUTCOME_FAILED",DEADLINE_EXCEEDED:"OUTCOME_DEADLINE_EXCEEDED"},Wt={UNSPECIFIED:"LANGUAGE_UNSPECIFIED",PYTHON:"PYTHON"},jt={MINIMAL:"MINIMAL",LOW:"LOW",MEDIUM:"MEDIUM",HIGH:"HIGH"};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jt={URL_RETRIEVAL_STATUS_UNSPECIFIED:"URL_RETRIEVAL_STATUS_UNSPECIFIED",URL_RETRIEVAL_STATUS_SUCCESS:"URL_RETRIEVAL_STATUS_SUCCESS",URL_RETRIEVAL_STATUS_ERROR:"URL_RETRIEVAL_STATUS_ERROR",URL_RETRIEVAL_STATUS_PAYWALL:"URL_RETRIEVAL_STATUS_PAYWALL",URL_RETRIEVAL_STATUS_UNSAFE:"URL_RETRIEVAL_STATUS_UNSAFE"},L={SERVER_CONTENT:"serverContent",TOOL_CALL:"toolCall",TOOL_CALL_CANCELLATION:"toolCallCancellation",GOING_AWAY_NOTICE:"goingAwayNotice",SESSION_RESUMPTION_UPDATE:"sessionResumptionUpdate"};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const l={ERROR:"error",REQUEST_ERROR:"request-error",RESPONSE_ERROR:"response-error",FETCH_ERROR:"fetch-error",SESSION_CLOSED:"session-closed",INVALID_CONTENT:"invalid-content",API_NOT_ENABLED:"api-not-enabled",INVALID_SCHEMA:"invalid-schema",NO_API_KEY:"no-api-key",NO_APP_ID:"no-app-id",NO_MODEL:"no-model",NO_PROJECT_ID:"no-project-id",PARSE_FAILED:"parse-failed",UNSUPPORTED:"unsupported"};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const C={STRING:"string",NUMBER:"number",INTEGER:"integer",BOOLEAN:"boolean",ARRAY:"array",OBJECT:"object"};/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kt={BLOCK_LOW_AND_ABOVE:"block_low_and_above",BLOCK_MEDIUM_AND_ABOVE:"block_medium_and_above",BLOCK_ONLY_HIGH:"block_only_high",BLOCK_NONE:"block_none"},Qt={BLOCK_ALL:"dont_allow",ALLOW_ADULT:"allow_adult",ALLOW_ALL:"allow_all"},Xt={SQUARE:"1:1",LANDSCAPE_3x4:"3:4",PORTRAIT_4x3:"4:3",LANDSCAPE_16x9:"16:9",PORTRAIT_9x16:"9:16"};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _={VERTEX_AI:"VERTEX_AI",GOOGLE_AI:"GOOGLE_AI"};/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class le{constructor(e){this.backendType=e}}class B extends le{constructor(){super(_.GOOGLE_AI)}_getModelPath(e,t){return`/${v}/projects/${e}/${t}`}_getTemplatePath(e,t){return`/${v}/projects/${e}/templates/${t}`}}class V extends le{constructor(e=Q){super(_.VERTEX_AI),e?this.location=e:this.location=Q}_getModelPath(e,t){return`/${v}/projects/${e}/locations/${this.location}/${t}`}_getTemplatePath(e,t){return`/${v}/projects/${e}/locations/${this.location}/templates/${t}`}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xe(s){if(s instanceof B)return`${P}/googleai`;if(s instanceof V)return`${P}/vertexai/${s.location}`;throw new c(l.ERROR,`Invalid backend: ${JSON.stringify(s.backendType)}`)}function Ge(s){const e=s.split("/");if(e[0]!==P)throw new c(l.ERROR,`Invalid instance identifier, unknown prefix '${e[0]}'`);switch(e[1]){case"vertexai":const n=e[2];if(!n)throw new c(l.ERROR,`Invalid instance identifier, unknown location '${s}'`);return new V(n);case"googleai":return new B;default:throw new c(l.ERROR,`Invalid instance identifier string: '${s}'`)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const h=new ye("@firebase/vertexai");var T;(function(s){s.UNAVAILABLE="unavailable",s.DOWNLOADABLE="downloadable",s.DOWNLOADING="downloading",s.AVAILABLE="available"})(T||(T={}));/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const de={type:"text",languages:["en"]},U=[de,{type:"image"}],x=[de];class O{constructor(e,t,n){this.languageModelProvider=e,this.mode=t,this.downloadPromise=null,this.onDeviceParams={createOptions:{expectedInputs:U,expectedOutputs:x}},n&&(this.onDeviceParams=n,this.onDeviceParams.createOptions?(this.onDeviceParams.createOptions.expectedInputs||(this.onDeviceParams.createOptions.expectedInputs=U),this.onDeviceParams.createOptions.expectedOutputs||(this.onDeviceParams.createOptions.expectedOutputs=x)):this.onDeviceParams.createOptions={expectedInputs:U,expectedOutputs:x})}async isAvailable(e){var n;if(!this.mode)return h.debug("On-device inference unavailable because mode is undefined."),!1;if(this.mode===R.ONLY_IN_CLOUD)return h.debug('On-device inference unavailable because mode is "only_in_cloud".'),!1;const t=await((n=this.languageModelProvider)==null?void 0:n.availability(this.onDeviceParams.createOptions));if(this.mode===R.ONLY_ON_DEVICE){if(t===T.UNAVAILABLE)throw new c(l.API_NOT_ENABLED,"Local LanguageModel API not available in this environment.");if(t===T.DOWNLOADABLE||t===T.DOWNLOADING){h.debug("Waiting for download of LanguageModel to complete.");try{await this.downloadPromise}catch(o){throw new c(l.ERROR,o.message)}return!0}return!0}return t!==T.AVAILABLE?(h.debug(`On-device inference unavailable because availability is "${t}".`),!1):O.isOnDeviceRequest(e)?!0:(h.debug("On-device inference unavailable because request is incompatible."),!1)}async generateContent(e){const t=await this.createSession(),n=await Promise.all(e.contents.map(O.toLanguageModelMessage)),o=await t.prompt(n,this.onDeviceParams.promptOptions);return O.toResponse(o)}async generateContentStream(e){const t=await this.createSession(),n=await Promise.all(e.contents.map(O.toLanguageModelMessage)),o=t.promptStreaming(n,this.onDeviceParams.promptOptions);return O.toStreamResponse(o)}async countTokens(e){throw new c(l.REQUEST_ERROR,"Count Tokens is not yet available for on-device model.")}static isOnDeviceRequest(e){if(e.contents.length===0)return h.debug("Empty prompt rejected for on-device inference."),!1;for(const t of e.contents){if(t.role==="function")return h.debug('"Function" role rejected for on-device inference.'),!1;for(const n of t.parts)if(n.inlineData&&O.SUPPORTED_MIME_TYPES.indexOf(n.inlineData.mimeType)===-1)return h.debug(`Unsupported mime type "${n.inlineData.mimeType}" rejected for on-device inference.`),!1}return!0}async downloadIfAvailable(e){var n;const t=await((n=this.languageModelProvider)==null?void 0:n.availability(this.onDeviceParams.createOptions));return(t===T.DOWNLOADABLE||t===T.DOWNLOADING)&&this.download(e),t}download(e){var n;if(this.downloadPromise)return;const t={...this.onDeviceParams.createOptions};t&&!t.monitor&&e&&(t.monitor=o=>{o.addEventListener("downloadprogress",i=>{e(i.loaded)})}),this.downloadPromise=(n=this.languageModelProvider)==null?void 0:n.create(t).finally(()=>{this.downloadPromise=null})}static async toLanguageModelMessage(e){const t=await Promise.all(e.parts.map(O.toLanguageModelMessageContent));return{role:O.toLanguageModelMessageRole(e.role),content:t}}static async toLanguageModelMessageContent(e){if(e.text)return{type:"text",value:e.text};if(e.inlineData){const n=await(await fetch(`data:${e.inlineData.mimeType};base64,${e.inlineData.data}`)).blob();return{type:"image",value:await createImageBitmap(n)}}throw new c(l.REQUEST_ERROR,"Processing of this Part type is not currently supported.")}static toLanguageModelMessageRole(e){return e==="model"?"assistant":"user"}async createSession(){if(!this.languageModelProvider)throw new c(l.UNSUPPORTED,"Chrome AI requested for unsupported browser version.");const e=await this.languageModelProvider.create(this.onDeviceParams.createOptions);return this.oldSession&&this.oldSession.destroy(),this.oldSession=e,e}static toResponse(e){return{json:async()=>({candidates:[{content:{parts:[{text:e}]}}]})}}static toStreamResponse(e){const t=new TextEncoder;return{body:e.pipeThrough(new TransformStream({transform(n,o){const i=JSON.stringify({candidates:[{content:{role:"model",parts:[{text:n}]}}]});o.enqueue(t.encode(`data: ${i}

`))}}))}}}O.SUPPORTED_MIME_TYPES=["image/jpeg","image/png"];function Fe(s,e,t){if(typeof e<"u"&&s)return new O(e.LanguageModel,s,t)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class He{constructor(e,t,n,o,i){this.app=e,this.backend=t,this.chromeAdapterFactory=i;const a=o==null?void 0:o.getImmediate({optional:!0}),r=n==null?void 0:n.getImmediate({optional:!0});this.auth=r||null,this.appCheck=a||null,t instanceof V?this.location=t.location:this.location=""}_delete(){return Promise.resolve()}set options(e){this._options=e}get options(){return this._options}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $e(s,{instanceIdentifier:e}){if(!e)throw new c(l.ERROR,"AIService instance identifier is undefined.");const t=Ge(e),n=s.getProvider("app").getImmediate(),o=s.getProvider("auth-internal"),i=s.getProvider("app-check-internal");return new He(n,t,o,i,Fe)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Y(s){var t,n,o,i,a,r,d;if((n=(t=s.app)==null?void 0:t.options)!=null&&n.apiKey)if((i=(o=s.app)==null?void 0:o.options)!=null&&i.projectId){if(!((r=(a=s.app)==null?void 0:a.options)!=null&&r.appId))throw new c(l.NO_APP_ID,'The "appId" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid app ID.')}else throw new c(l.NO_PROJECT_ID,'The "projectId" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid project ID.');else throw new c(l.NO_API_KEY,'The "apiKey" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid API key.');const e={apiKey:s.app.options.apiKey,project:s.app.options.projectId,appId:s.app.options.appId,automaticDataCollectionEnabled:s.app.automaticDataCollectionEnabled,location:s.location,backend:s.backend};if(Le(s.app)&&s.app.settings.appCheckToken){const u=s.app.settings.appCheckToken;e.getAppCheckToken=()=>Promise.resolve({token:u})}else s.appCheck&&((d=s.options)!=null&&d.useLimitedUseAppCheckTokens?e.getAppCheckToken=()=>s.appCheck.getLimitedUseToken():e.getAppCheckToken=()=>s.appCheck.getToken());return s.auth&&(e.getAuthToken=()=>s.auth.getToken()),e}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class w{constructor(e,t){this._apiSettings=Y(e),this.model=w.normalizeModelName(t,this._apiSettings.backend.backendType)}static normalizeModelName(e,t){return t===_.GOOGLE_AI?w.normalizeGoogleAIModelName(e):w.normalizeVertexAIModelName(e)}static normalizeGoogleAIModelName(e){return`models/${e}`}static normalizeVertexAIModelName(e){let t;return e.includes("/")?e.startsWith("models/")?t=`publishers/google/${e}`:t=e:t=`publishers/google/models/${e}`,t}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Be="Timeout has expired.",G="AbortError";class Ve{constructor(e){this.params=e}toString(){const e=new URL(this.baseUrl);return e.pathname=this.pathname,e.search=this.queryParams.toString(),e.toString()}get pathname(){return this.params.templateId?`${this.params.apiSettings.backend._getTemplatePath(this.params.apiSettings.project,this.params.templateId)}:${this.params.task}`:`${this.params.apiSettings.backend._getModelPath(this.params.apiSettings.project,this.params.model)}:${this.params.task}`}get baseUrl(){var e;return((e=this.params.singleRequestOptions)==null?void 0:e.baseUrl)??`https://${re}`}get queryParams(){const e=new URLSearchParams;return this.params.stream&&e.set("alt","sse"),e}}class Ye{constructor(e){this.apiSettings=e}toString(){const e=new URL(`wss://${re}`);e.pathname=this.pathname;const t=new URLSearchParams;return t.set("key",this.apiSettings.apiKey),e.search=t.toString(),e.toString()}get pathname(){return this.apiSettings.backend.backendType===_.GOOGLE_AI?"ws/google.firebase.vertexai.v1beta.GenerativeService/BidiGenerateContent":`ws/google.firebase.vertexai.v1beta.LlmBidiService/BidiGenerateContent/locations/${this.apiSettings.location}`}}function qe(s){const e=[];return e.push(`${De}/${X}`),e.push(`fire/${X}`),(s.params.apiSettings.inferenceMode===R.PREFER_ON_DEVICE||s.params.apiSettings.inferenceMode===R.PREFER_IN_CLOUD)&&e.push(ve),e.join(" ")}async function We(s){const e=new Headers;if(e.append("Content-Type","application/json"),e.append("x-goog-api-client",qe(s)),e.append("x-goog-api-key",s.params.apiSettings.apiKey),s.params.apiSettings.automaticDataCollectionEnabled&&e.append("X-Firebase-Appid",s.params.apiSettings.appId),s.params.apiSettings.getAppCheckToken){const t=await s.params.apiSettings.getAppCheckToken();t&&(e.append("X-Firebase-AppCheck",t.token),t.error&&h.warn(`Unable to obtain a valid App Check token: ${t.error.message}`))}if(s.params.apiSettings.getAuthToken){const t=await s.params.apiSettings.getAuthToken();t&&e.append("Authorization",`Firebase ${t.accessToken}`)}return e}async function A(s,e){var u,f;const t=new Ve(s);let n;const o=(u=s.singleRequestOptions)==null?void 0:u.signal,i=((f=s.singleRequestOptions)==null?void 0:f.timeout)!=null&&s.singleRequestOptions.timeout>=0?s.singleRequestOptions.timeout:ke,a=new AbortController,r=setTimeout(()=>{a.abort(new DOMException(Be,G)),h.debug(`Aborting request to ${t} due to timeout (${i}ms)`)},i),d=AbortSignal.any(o?[o,a.signal]:[a.signal]);if(o&&o.aborted)throw clearTimeout(r),new DOMException(o.reason??"Aborted externally before fetch",G);try{const p={method:"POST",headers:await We(t),signal:d,body:e};if(n=await fetch(t.toString(),p),!n.ok){let S="",m;try{const E=await n.json();S=E.error.message,E.error.details&&(S+=` ${JSON.stringify(E.error.details)}`,m=E.error.details)}catch{}throw n.status===403&&m&&m.some(E=>E.reason==="SERVICE_DISABLED")&&m.some(E=>{var W,j;return(j=(W=E.links)==null?void 0:W[0])==null?void 0:j.description.includes("Google developers console API activation")})?new c(l.API_NOT_ENABLED,`The Firebase AI SDK requires the Firebase AI API ('firebasevertexai.googleapis.com') to be enabled in your Firebase project. Enable this API by visiting the Firebase Console at https://console.firebase.google.com/project/${t.params.apiSettings.project}/ailogic/ and clicking "Get started". If you enabled this API recently, wait a few minutes for the action to propagate to our systems and then retry.`,{status:n.status,statusText:n.statusText,errorDetails:m}):new c(l.FETCH_ERROR,`Error fetching from ${t}: [${n.status} ${n.statusText}] ${S}`,{status:n.status,statusText:n.statusText,errorDetails:m})}}catch(p){let S=p;throw p.code!==l.FETCH_ERROR&&p.code!==l.API_NOT_ENABLED&&p instanceof Error&&p.name!==G&&(S=new c(l.ERROR,`Error fetching from ${t.toString()}: ${p.message}`),S.stack=p.stack),S}finally{clearTimeout(r)}return n}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function D(s){if(s.candidates&&s.candidates.length>0){if(s.candidates.length>1&&h.warn(`This response had ${s.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),pe(s.candidates[0]))throw new c(l.RESPONSE_ERROR,`Response error: ${y(s)}. Response body stored in error.response`,{response:s});return!0}else return!1}function M(s,e=I.IN_CLOUD){s.candidates&&!s.candidates[0].hasOwnProperty("index")&&(s.candidates[0].index=0);const t=je(s);return t.inferenceSource=e,t}function je(s){return s.text=()=>{if(D(s))return Z(s,e=>!e.thought);if(s.promptFeedback)throw new c(l.RESPONSE_ERROR,`Text not available. ${y(s)}`,{response:s});return""},s.thoughtSummary=()=>{if(D(s)){const e=Z(s,t=>!!t.thought);return e===""?void 0:e}else if(s.promptFeedback)throw new c(l.RESPONSE_ERROR,`Thought summary not available. ${y(s)}`,{response:s})},s.inlineDataParts=()=>{if(D(s))return Je(s);if(s.promptFeedback)throw new c(l.RESPONSE_ERROR,`Data not available. ${y(s)}`,{response:s})},s.functionCalls=()=>{if(D(s))return ue(s);if(s.promptFeedback)throw new c(l.RESPONSE_ERROR,`Function call not available. ${y(s)}`,{response:s})},s}function Z(s,e){var n,o,i,a;const t=[];if((o=(n=s.candidates)==null?void 0:n[0].content)!=null&&o.parts)for(const r of(a=(i=s.candidates)==null?void 0:i[0].content)==null?void 0:a.parts)r.text&&e(r)&&t.push(r.text);return t.length>0?t.join(""):""}function ue(s){var t,n,o,i;if(!s)return;const e=[];if((n=(t=s.candidates)==null?void 0:t[0].content)!=null&&n.parts)for(const a of(i=(o=s.candidates)==null?void 0:o[0].content)==null?void 0:i.parts)a.functionCall&&e.push(a.functionCall);if(e.length>0)return e}function Je(s){var t,n,o,i;const e=[];if((n=(t=s.candidates)==null?void 0:t[0].content)!=null&&n.parts)for(const a of(i=(o=s.candidates)==null?void 0:o[0].content)==null?void 0:i.parts)a.inlineData&&e.push(a);if(e.length>0)return e}const Ke=[g.RECITATION,g.SAFETY,g.BLOCKLIST,g.PROHIBITED_CONTENT,g.SPII,g.MALFORMED_FUNCTION_CALL,g.IMAGE_SAFETY,g.IMAGE_PROHIBITED_CONTENT,g.IMAGE_OTHER,g.NO_IMAGE,g.IMAGE_RECITATION,g.LANGUAGE,g.UNEXPECTED_TOOL_CALL,g.TOO_MANY_TOOL_CALLS,g.MISSING_THOUGHT_SIGNATURE,g.MALFORMED_RESPONSE];function pe(s){return!!s.finishReason&&Ke.some(e=>e===s.finishReason)}function y(s){var t,n,o;let e="";if((!s.candidates||s.candidates.length===0)&&s.promptFeedback)e+="Response was blocked",(t=s.promptFeedback)!=null&&t.blockReason&&(e+=` due to ${s.promptFeedback.blockReason}`),(n=s.promptFeedback)!=null&&n.blockReasonMessage&&(e+=`: ${s.promptFeedback.blockReasonMessage}`);else if((o=s.candidates)!=null&&o[0]){const i=s.candidates[0];pe(i)&&(e+=`Candidate was blocked due to ${i.finishReason}`,i.finishMessage&&(e+=`: ${i.finishMessage}`))}return e}async function $(s){var o;const e=await s.json(),t=[];let n;if(!e.predictions||((o=e.predictions)==null?void 0:o.length)===0)throw new c(l.RESPONSE_ERROR,"No predictions or filtered reason received from Vertex AI. Please report this issue with the full error details at https://github.com/firebase/firebase-js-sdk/issues.");for(const i of e.predictions)if(i.raiFilteredReason)n=i.raiFilteredReason;else if(i.mimeType&&i.bytesBase64Encoded)t.push({mimeType:i.mimeType,bytesBase64Encoded:i.bytesBase64Encoded});else if(i.mimeType&&i.gcsUri)t.push({mimeType:i.mimeType,gcsURI:i.gcsUri});else if(!i.safetyAttributes)throw new c(l.RESPONSE_ERROR,`Unexpected element in 'predictions' array in response: '${JSON.stringify(i)}'`);return{images:t,filteredReason:n}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function he(s){var e,t;if((e=s.safetySettings)==null||e.forEach(n=>{if(n.method)throw new c(l.UNSUPPORTED,"SafetySetting.method is not supported in the the Gemini Developer API. Please remove this property.")}),(t=s.generationConfig)!=null&&t.topK){const n=Math.round(s.generationConfig.topK);n!==s.generationConfig.topK&&(h.warn("topK in GenerationConfig has been rounded to the nearest integer to match the format for requests to the Gemini Developer API."),s.generationConfig.topK=n)}return s}function q(s){return{candidates:s.candidates?Xe(s.candidates):void 0,prompt:s.promptFeedback?ze(s.promptFeedback):void 0,usageMetadata:s.usageMetadata}}function Qe(s,e){return{generateContentRequest:{model:e,...s}}}function Xe(s){const e=[];let t;return e&&s.forEach(n=>{var a,r;let o;if(n.citationMetadata&&(o={citations:n.citationMetadata.citationSources}),n.safetyRatings&&(t=n.safetyRatings.map(d=>({...d,severity:d.severity??ce.HARM_SEVERITY_UNSUPPORTED,probabilityScore:d.probabilityScore??0,severityScore:d.severityScore??0}))),(r=(a=n.content)==null?void 0:a.parts)!=null&&r.some(d=>d==null?void 0:d.videoMetadata))throw new c(l.UNSUPPORTED,"Part.videoMetadata is not supported in the Gemini Developer API. Please remove this property.");const i={index:n.index,content:n.content,finishReason:n.finishReason,finishMessage:n.finishMessage,safetyRatings:t,citationMetadata:o,groundingMetadata:n.groundingMetadata,urlContextMetadata:n.urlContextMetadata};e.push(i)}),e}function ze(s){const e=[];return s.safetyRatings.forEach(n=>{e.push({category:n.category,probability:n.probability,severity:n.severity??ce.HARM_SEVERITY_UNSUPPORTED,probabilityScore:n.probabilityScore??0,severityScore:n.severityScore??0,blocked:n.blocked})}),{blockReason:s.blockReason,safetyRatings:e,blockReasonMessage:s.blockReasonMessage}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ee=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;async function fe(s,e,t){const n=s.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),o=nt(n),[i,a]=o.tee(),{response:r,firstValue:d}=await Ze(a,e,t);return{stream:tt(i,e,t),response:r,firstValue:d}}async function Ze(s,e,t){const[n,o]=s.tee(),i=n.getReader(),{value:a}=await i.read();return{firstValue:a,response:et(o,e,t)}}async function et(s,e,t){const n=[],o=s.getReader();for(;;){const{done:i,value:a}=await o.read();if(i){let r=st(n);return e.backend.backendType===_.GOOGLE_AI&&(r=q(r)),M(r,t)}n.push(a)}}async function*tt(s,e,t){var o,i;const n=s.getReader();for(;;){const{value:a,done:r}=await n.read();if(r)break;let d;e.backend.backendType===_.GOOGLE_AI?d=M(q(a),t):d=M(a,t);const u=(o=d.candidates)==null?void 0:o[0];!((i=u==null?void 0:u.content)!=null&&i.parts)&&!(u!=null&&u.finishReason)&&!(u!=null&&u.citationMetadata)&&!(u!=null&&u.urlContextMetadata)||(yield d)}}function nt(s){const e=s.getReader();return new ReadableStream({start(n){let o="";return i();function i(){return e.read().then(({value:a,done:r})=>{if(r){if(o.trim()){n.error(new c(l.PARSE_FAILED,"Failed to parse stream"));return}n.close();return}o+=a;let d=o.match(ee),u;for(;d;){try{u=JSON.parse(d[1])}catch{n.error(new c(l.PARSE_FAILED,`Error parsing JSON response: "${d[1]}`));return}n.enqueue(u),o=o.substring(d[0].length),d=o.match(ee)}return i()})}}})}function st(s){const e=s[s.length-1],t={promptFeedback:e==null?void 0:e.promptFeedback};for(const n of s)if(n.candidates)for(const o of n.candidates){const i=o.index||0;t.candidates||(t.candidates=[]),t.candidates[i]||(t.candidates[i]={index:o.index}),t.candidates[i].citationMetadata=o.citationMetadata,t.candidates[i].finishReason=o.finishReason,t.candidates[i].finishMessage=o.finishMessage,t.candidates[i].safetyRatings=o.safetyRatings,t.candidates[i].groundingMetadata=o.groundingMetadata;const a=o.urlContextMetadata;if(typeof a=="object"&&a!==null&&Object.keys(a).length>0&&(t.candidates[i].urlContextMetadata=a),o.content){if(!o.content.parts)continue;t.candidates[i].content||(t.candidates[i].content={role:o.content.role||"user",parts:[]});for(const r of o.content.parts){const d={...r};r.text!==""&&Object.keys(d).length>0&&t.candidates[i].content.parts.push(d)}}}return t}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ot=[l.FETCH_ERROR,l.ERROR,l.API_NOT_ENABLED];async function me(s,e,t,n){if(!e)return{response:await n(),inferenceSource:I.IN_CLOUD};switch(e.mode){case R.ONLY_ON_DEVICE:if(await e.isAvailable(s))return{response:await t(),inferenceSource:I.ON_DEVICE};throw new c(l.UNSUPPORTED,"Inference mode is ONLY_ON_DEVICE, but an on-device model is not available.");case R.ONLY_IN_CLOUD:return{response:await n(),inferenceSource:I.IN_CLOUD};case R.PREFER_IN_CLOUD:try{return{response:await n(),inferenceSource:I.IN_CLOUD}}catch(o){if(o instanceof c&&ot.includes(o.code)&&await e.isAvailable(s))return{response:await t(),inferenceSource:I.ON_DEVICE};throw o}case R.PREFER_ON_DEVICE:return await e.isAvailable(s)?{response:await t(),inferenceSource:I.ON_DEVICE}:{response:await n(),inferenceSource:I.IN_CLOUD};default:throw new c(l.ERROR,`Unexpected infererence mode: ${e.mode}`)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function it(s,e,t,n){return s.backend.backendType===_.GOOGLE_AI&&(t=he(t)),A({task:"streamGenerateContent",model:e,apiSettings:s,stream:!0,singleRequestOptions:n},JSON.stringify(t))}async function Ee(s,e,t,n,o){const i=await me(t,n,()=>n.generateContentStream(t),()=>it(s,e,t,o));return fe(i.response,s,i.inferenceSource)}async function at(s,e,t,n){return s.backend.backendType===_.GOOGLE_AI&&(t=he(t)),A({model:e,task:"generateContent",apiSettings:s,stream:!1,singleRequestOptions:n},JSON.stringify(t))}async function ge(s,e,t,n){const o=await A({task:"templateGenerateContent",templateId:e,apiSettings:s,stream:!1,singleRequestOptions:n},JSON.stringify(t)),i=await Re(o,s);return{response:M(i)}}async function Se(s,e,t,n){const o=await A({task:"templateStreamGenerateContent",templateId:e,apiSettings:s,stream:!0,singleRequestOptions:n},JSON.stringify(t));return fe(o,s)}async function Oe(s,e,t,n,o){const i=await me(t,n,()=>n.generateContent(t),()=>at(s,e,t,o)),a=await Re(i.response,s);return{response:M(a,i.inferenceSource)}}async function Re(s,e){const t=await s.json();return e.backend.backendType===_.GOOGLE_AI?q(t):t}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function k(s){if(s!=null){if(typeof s=="string")return{role:"system",parts:[{text:s}]};if(s.text)return{role:"system",parts:[s]};if(s.parts)return s.role?s:{role:"system",parts:s.parts}}}function b(s){let e=[];if(typeof s=="string")e=[{text:s}];else for(const t of s)typeof t=="string"?e.push({text:t}):e.push(t);return rt(e)}function rt(s){const e={role:"user",parts:[]},t={role:"function",parts:[]};let n=!1,o=!1;for(const i of s)"functionResponse"in i?(t.parts.push(i),o=!0):(e.parts.push(i),n=!0);if(n&&o)throw new c(l.INVALID_CONTENT,"Within a single message, FunctionResponse cannot be mixed with other type of Part in the request for sending chat message.");if(!n&&!o)throw new c(l.INVALID_CONTENT,"No Content is provided for sending chat message.");return n?e:t}function F(s){let e;return s.contents?e=s:e={contents:[b(s)]},s.systemInstruction&&(e.systemInstruction=k(s.systemInstruction)),e}function te(s,{gcsURI:e,imageFormat:t,addWatermark:n,numberOfImages:o=1,negativePrompt:i,aspectRatio:a,safetyFilterLevel:r,personFilterLevel:d}){return{instances:[{prompt:s}],parameters:{storageUri:e,negativePrompt:i,sampleCount:o,aspectRatio:a,outputOptions:t,addWatermark:n,safetyFilterLevel:r,personGeneration:d,includeRaiReason:!0,includeSafetyAttributes:!0}}}/**
 * @license
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ne="SILENT_ERROR",se=10;class _e{constructor(e,t,n){this.params=t,this.requestOptions=n,this._history=[],this._sendPromise=Promise.resolve(),this._apiSettings=e}async getHistory(){return await this._sendPromise,this._history}async _sendMessage(e,t){let n={};await this._sendPromise;const o=[];return this._sendPromise=this._sendPromise.then(async()=>{var d,u,f;let i,a=0;const r=((d=this.requestOptions)==null?void 0:d.maxSequentialFunctionCalls)??se;do{let p;if(i){a++;const E=await this._callFunctionsAsNeeded(i);p=b(E)}else p=b(e);const S=this._formatRequest(p,[...o]);o.push(p);const m=await this._callGenerateContent(S,t);if(m)if(n=m,i=this._getCallableFunctionCalls(m.response),m.response.candidates&&m.response.candidates.length>0){const E={parts:((u=m.response.candidates)==null?void 0:u[0].content.parts)||[],role:((f=m.response.candidates)==null?void 0:f[0].content.role)||"model"};o.push(E)}else{const E=y(m.response);E&&h.warn(`sendMessage() was unsuccessful. ${E}. Inspect response object for details.`)}else i=void 0}while(i&&a<r);i&&a>=r&&h.warn(`Automatic function calling exceeded the limit of ${r} function calls. Returning last model response.`)}),await this._sendPromise,this._history=this._history.concat(o),n}async _sendMessageStream(e,t){await this._sendPromise;const n=[],i=(async()=>{var f;let a,r=0;const d=((f=this.requestOptions)==null?void 0:f.maxSequentialFunctionCalls)??se;let u;do{let p;if(a){r++;const m=await this._callFunctionsAsNeeded(a);p=b(m)}else p=b(e);const S=this._formatRequest(p,[...n]);if(n.push(p),u=await this._callGenerateContentStream(S,t),a=this._getCallableFunctionCalls(u.firstValue),a&&u.firstValue&&u.firstValue.candidates&&u.firstValue.candidates.length>0){const m={...u.firstValue.candidates[0].content};m.role||(m.role="model"),n.push(m)}}while(a&&r<d);return a&&r>=d&&h.warn(`Automatic function calling exceeded the limit of ${d} function calls. Returning last model response.`),{stream:u.stream,response:u.response}})();return this._sendPromise=this._sendPromise.then(async()=>i).catch(a=>{throw new Error(ne)}).then(a=>a.response).then(a=>{if(a.candidates&&a.candidates.length>0){this._history=this._history.concat(n);const r={...a.candidates[0].content};r.role||(r.role="model"),this._history.push(r)}else{const r=y(a);r&&h.warn(`sendMessageStream() was unsuccessful. ${r}. Inspect response object for details.`)}}).catch(a=>{a.message!==ne&&a.name!=="AbortError"&&h.error(a)}),i}_getCallableFunctionCalls(e){var o,i,a;const t=(i=(o=this.params)==null?void 0:o.tools)==null?void 0:i.find(r=>r.functionDeclarations);if(!(t!=null&&t.functionDeclarations))return;const n=ue(e);if(n){for(const r of n)if(!((a=t.functionDeclarations)==null?void 0:a.some(u=>u.name===r.name&&typeof u.functionReference=="function")))return;return n}}async _callFunctionsAsNeeded(e){var i,a;const t=[],n=[],o=(a=(i=this.params)==null?void 0:i.tools)==null?void 0:a.find(r=>r.functionDeclarations);if(o&&o.functionDeclarations){for(const d of e){const u=o.functionDeclarations.find(f=>f.name===d.name);if(u!=null&&u.functionReference){const f=Promise.resolve(u.functionReference(d.args)).catch(p=>{const S=new c(l.ERROR,`Error in user-defined function "${u.name}": ${p.message}`);throw S.stack=p.stack,S});t.push({name:d.name,id:d.id,results:f}),n.push(f)}}await Promise.all(n);const r=[];for(const{name:d,id:u,results:f}of t){const p={name:d,response:await f};u&&(p.id=u),r.push({functionResponse:p})}return r}else throw new c(l.REQUEST_ERROR,'No function declarations were provided in "tools".')}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oe=["text","inlineData","functionCall","functionResponse","thought","thoughtSignature"],ct={user:["text","inlineData"],function:["functionResponse"],model:["text","functionCall","thought","thoughtSignature"],system:["text"]},ie={user:["model"],function:["model"],model:["user","function"],system:[]};function Te(s){let e=null;for(const t of s){const{role:n,parts:o}=t;if(!e&&n!=="user")throw new c(l.INVALID_CONTENT,`First Content should be with role 'user', got ${n}`);if(!z.includes(n))throw new c(l.INVALID_CONTENT,`Each item should include role field. Got ${n} but valid roles are: ${JSON.stringify(z)}`);if(!Array.isArray(o))throw new c(l.INVALID_CONTENT,"Content should have 'parts' property with an array of Parts");if(o.length===0)throw new c(l.INVALID_CONTENT,"Each Content should have at least one part");const i={text:0,inlineData:0,functionCall:0,functionResponse:0,thought:0,thoughtSignature:0,executableCode:0,codeExecutionResult:0};for(const r of o)for(const d of oe)d in r&&(i[d]+=1);const a=ct[n];for(const r of oe)if(!a.includes(r)&&i[r]>0)throw new c(l.INVALID_CONTENT,`Content with role '${n}' can't contain '${r}' part`);if(e&&!ie[n].includes(e.role))throw new c(l.INVALID_CONTENT,`Content with role '${n}' can't follow '${e.role}'. Valid previous roles: ${JSON.stringify(ie)}`);e=t}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt extends _e{constructor(e,t,n,o,i){var a;super(e,o,i),this.model=t,this.chromeAdapter=n,this.params=o,this.requestOptions=i,o!=null&&o.history&&(Te(o.history),this._history=o.history),((a=this.params)==null?void 0:a.systemInstruction)!=null&&(this.params={...this.params,systemInstruction:k(this.params.systemInstruction)})}_formatRequest(e,t){var n,o,i,a,r;return{safetySettings:(n=this.params)==null?void 0:n.safetySettings,generationConfig:(o=this.params)==null?void 0:o.generationConfig,tools:(i=this.params)==null?void 0:i.tools,toolConfig:(a=this.params)==null?void 0:a.toolConfig,systemInstruction:(r=this.params)==null?void 0:r.systemInstruction,contents:[...this._history,...t,e]}}_callGenerateContent(e,t){return Oe(this._apiSettings,this.model,e,this.chromeAdapter,{...this.requestOptions,...t})}_callGenerateContentStream(e,t){return Ee(this._apiSettings,this.model,e,this.chromeAdapter,{...this.requestOptions,...t})}async sendMessage(e,t){return this._sendMessage(e,t)}async sendMessageStream(e,t){return this._sendMessageStream(e,t)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dt(s,e,t,n){let o="";if(s.backend.backendType===_.GOOGLE_AI){const a=Qe(t,e);o=JSON.stringify(a)}else o=JSON.stringify(t);return(await A({model:e,task:"countTokens",apiSettings:s,stream:!1,singleRequestOptions:n},o)).json()}async function ut(s,e,t,n,o){if((n==null?void 0:n.mode)===R.ONLY_ON_DEVICE)throw new c(l.UNSUPPORTED,"countTokens() is not supported for on-device models.");return dt(s,e,t,o)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pt extends w{constructor(e,t,n,o){super(e,t.model),this.chromeAdapter=o,this.generationConfig=t.generationConfig||{},ht(this.generationConfig),this.safetySettings=t.safetySettings||[],this.tools=t.tools,this.toolConfig=t.toolConfig,this.systemInstruction=k(t.systemInstruction),this.requestOptions=n||{}}async initializeDeviceModel(e){if(!this.chromeAdapter||this.chromeAdapter.mode===R.ONLY_IN_CLOUD)return;if(await this.chromeAdapter.downloadIfAvailable(e)===T.UNAVAILABLE){const n=new c(l.API_NOT_ENABLED,"Local LanguageModel API not available in this environment.");if(this.chromeAdapter.mode===R.ONLY_ON_DEVICE)throw n;h.debug(n.message)}await this.chromeAdapter.downloadPromise}async generateContent(e,t){const n=F(e);return Oe(this._apiSettings,this.model,{generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,...n},this.chromeAdapter,{...this.requestOptions,...t})}async generateContentStream(e,t){const n=F(e),{stream:o,response:i}=await Ee(this._apiSettings,this.model,{generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,...n},this.chromeAdapter,{...this.requestOptions,...t});return{stream:o,response:i}}startChat(e){return new lt(this._apiSettings,this.model,this.chromeAdapter,{tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,generationConfig:this.generationConfig,safetySettings:this.safetySettings,...e},this.requestOptions)}async countTokens(e,t){const n=F(e);return ut(this._apiSettings,this.model,n,this.chromeAdapter,{...this.requestOptions,...t})}}function ht(s){var e,t;if(((e=s.thinkingConfig)==null?void 0:e.thinkingBudget)!=null&&((t=s.thinkingConfig)!=null&&t.thinkingLevel))throw new c(l.UNSUPPORTED,"Cannot set both thinkingBudget and thinkingLevel in a config.");if(s.responseSchema!=null&&s.responseJsonSchema!=null)throw new c(l.UNSUPPORTED,"Cannot set both responseSchema and responseJsonSchema in a config.");if((s.responseSchema!=null||s.responseJsonSchema!=null)&&s.responseMimeType!=="application/json")throw new c(l.UNSUPPORTED,'responseMimeType must be set to "application/json" if responseSchema or responseJsonSchema are set.')}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ft{constructor(){if(typeof WebSocket>"u")throw new c(l.UNSUPPORTED,'The WebSocket API is not available in this environment. The "Live" feature is not supported here. It is supported in modern browser windows, Web Workers with WebSocket support, and Node >= 22.')}connect(e){return new Promise((t,n)=>{this.ws=new WebSocket(e),this.ws.binaryType="blob",this.ws.addEventListener("open",()=>t(),{once:!0}),this.ws.addEventListener("error",()=>n(new c(l.FETCH_ERROR,"Error event raised on WebSocket")),{once:!0}),this.ws.addEventListener("close",o=>{o.reason&&h.warn(`WebSocket connection closed by server. Reason: '${o.reason}'`)})})}send(e){if(!this.ws||this.ws.readyState!==WebSocket.OPEN)throw new c(l.REQUEST_ERROR,"WebSocket is not open.");this.ws.send(e)}async*listen(){if(!this.ws)throw new c(l.REQUEST_ERROR,"WebSocket is not connected.");const e=[],t=[];let n=null,o=!1;const i=async d=>{let u;if(d.data instanceof Blob)u=await d.data.text();else if(typeof d.data=="string")u=d.data;else{t.push(new c(l.PARSE_FAILED,`Failed to parse WebSocket response. Expected data to be a Blob or string, but was ${typeof d.data}.`)),n&&(n(),n=null);return}try{const f=JSON.parse(u);e.push(f)}catch(f){const p=f;t.push(new c(l.PARSE_FAILED,`Error parsing WebSocket message to JSON: ${p.message}`))}n&&(n(),n=null)},a=()=>{t.push(new c(l.FETCH_ERROR,"WebSocket connection error.")),n&&(n(),n=null)},r=d=>{var u,f,p;d.reason&&h.warn(`WebSocket connection closed by the server with reason: ${d.reason}`),o=!0,n&&(n(),n=null),(u=this.ws)==null||u.removeEventListener("message",i),(f=this.ws)==null||f.removeEventListener("close",r),(p=this.ws)==null||p.removeEventListener("error",a)};for(this.ws.addEventListener("message",i),this.ws.addEventListener("close",r),this.ws.addEventListener("error",a);!o;){if(t.length>0)throw t.shift();e.length>0?yield e.shift():await new Promise(d=>{n=d})}if(t.length>0)throw t.shift()}close(e,t){return new Promise(n=>{if(!this.ws||(this.ws.addEventListener("close",()=>n(),{once:!0}),this.ws.readyState===WebSocket.CLOSED||this.ws.readyState===WebSocket.CONNECTING))return n();this.ws.readyState!==WebSocket.CLOSING&&this.ws.close(e,t)})}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt{constructor(e,t,n,o){this._setupMessage=e,this._apiSettings=t,this._sessionResumption=n,this.isClosed=!1,this.inConversation=!1,this._serverMessages=null,this._webSocketHandler=o||new ft,this.connectionPromise=this._connectSession(this._sessionResumption)}async _connectSession(e){const t=new Ye(this._apiSettings);await this._webSocketHandler.connect(t.toString());try{this._serverMessages=this._webSocketHandler.listen();const n={...this._setupMessage};e&&(n.setup.sessionResumption=e),this._webSocketHandler.send(JSON.stringify(n));const o=(await this._serverMessages.next()).value;if(!o||typeof o!="object"||!("setupComplete"in o))throw await this._webSocketHandler.close(1011,"Handshake failure"),new c(l.RESPONSE_ERROR,"Server connection handshake failed. The server did not respond with a setupComplete message.");this.isClosed=!1}catch(n){throw await this._webSocketHandler.close(),n}}async resumeSession(e){if(!this._sessionResumption)throw new c(l.UNSUPPORTED,"Cannot resume session: no sessionResumption config provided");await this.close(),await this._connectSession(e)}async send(e,t=!0){if(this.isClosed)throw new c(l.REQUEST_ERROR,"This LiveSession has been closed and cannot be used.");const o={clientContent:{turns:[b(e)],turnComplete:t}};this._webSocketHandler.send(JSON.stringify(o))}async sendTextRealtime(e){if(this.isClosed)throw new c(l.REQUEST_ERROR,"This LiveSession has been closed and cannot be used.");const t={realtimeInput:{text:e}};this._webSocketHandler.send(JSON.stringify(t))}async sendAudioRealtime(e){if(this.isClosed)throw new c(l.REQUEST_ERROR,"This LiveSession has been closed and cannot be used.");const t={realtimeInput:{audio:e}};this._webSocketHandler.send(JSON.stringify(t))}async sendVideoRealtime(e){if(this.isClosed)throw new c(l.REQUEST_ERROR,"This LiveSession has been closed and cannot be used.");const t={realtimeInput:{video:e}};this._webSocketHandler.send(JSON.stringify(t))}async sendFunctionResponses(e){if(this.isClosed)throw new c(l.REQUEST_ERROR,"This LiveSession has been closed and cannot be used.");const t={toolResponse:{functionResponses:e}};this._webSocketHandler.send(JSON.stringify(t))}async*receive(){if(this.isClosed)throw new c(l.SESSION_CLOSED,"Cannot read from a Live session that is closed. Try starting a new Live session.");if(this._serverMessages)for await(const e of this._serverMessages)if(e&&typeof e=="object")if(L.SERVER_CONTENT in e)yield{type:"serverContent",...e.serverContent};else if(L.TOOL_CALL in e)yield{type:"toolCall",...e.toolCall};else if(L.TOOL_CALL_CANCELLATION in e)yield{type:"toolCallCancellation",...e.toolCallCancellation};else if("goAway"in e){const t=e.goAway;yield{type:L.GOING_AWAY_NOTICE,timeLeft:Et(t.timeLeft)}}else L.SESSION_RESUMPTION_UPDATE in e?yield{type:L.SESSION_RESUMPTION_UPDATE,...e.sessionResumptionUpdate}:h.warn(`Received an unknown message type from the server: ${JSON.stringify(e)}`);else h.warn(`Received an invalid message from the server: ${JSON.stringify(e)}`)}async close(){this.isClosed||(this.isClosed=!0,await this._webSocketHandler.close(1e3,"Client closed session."))}async sendMediaChunks(e){if(this.isClosed)throw new c(l.REQUEST_ERROR,"This LiveSession has been closed and cannot be used.");e.forEach(t=>{const n={realtimeInput:{mediaChunks:[t]}};this._webSocketHandler.send(JSON.stringify(n))})}async sendMediaStream(e){if(this.isClosed)throw new c(l.REQUEST_ERROR,"This LiveSession has been closed and cannot be used.");const t=e.getReader();for(;;)try{const{done:n,value:o}=await t.read();if(n)break;if(!o)throw new Error("Missing chunk in reader, but reader is not done.");await this.sendMediaChunks([o])}catch(n){const o=n instanceof Error?n.message:"Error processing media stream.";throw new c(l.REQUEST_ERROR,o)}}}function Et(s){return!s||!s.endsWith("s")?0:Number(s.slice(0,-1))}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt extends w{constructor(e,t,n){super(e,t.model),this._webSocketHandler=n,this.generationConfig=t.generationConfig||{},this.tools=t.tools,this.toolConfig=t.toolConfig,this.systemInstruction=k(t.systemInstruction)}async connect(e){let t;this._apiSettings.backend.backendType===_.GOOGLE_AI?t=`projects/${this._apiSettings.project}/${this.model}`:t=`projects/${this._apiSettings.project}/locations/${this._apiSettings.location}/${this.model}`;const{inputAudioTranscription:n,outputAudioTranscription:o,...i}=this.generationConfig,a=i.contextWindowCompression;delete i.contextWindowCompression;const r={setup:{model:t,generationConfig:i,contextWindowCompression:a,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,inputAudioTranscription:n,outputAudioTranscription:o,sessionResumption:e}},d=new mt(r,this._apiSettings,e,this._webSocketHandler);return await d.connectionPromise,d}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St extends w{constructor(e,t,n){const{model:o,generationConfig:i,safetySettings:a}=t;super(e,o),this.requestOptions=n,this.generationConfig=i,this.safetySettings=a}async generateImages(e,t){const n=te(e,{...this.generationConfig,...this.safetySettings}),o=await A({task:"predict",model:this.model,apiSettings:this._apiSettings,stream:!1,singleRequestOptions:{...this.requestOptions,...t}},JSON.stringify(n));return $(o)}async generateImagesGCS(e,t,n){const o=te(e,{gcsURI:t,...this.generationConfig,...this.safetySettings}),i=await A({task:"predict",model:this.model,apiSettings:this._apiSettings,stream:!1,singleRequestOptions:{...this.requestOptions,...n}},JSON.stringify(o));return $(i)}}/**
 * @license
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ot extends _e{constructor(e,t,n){super(e,t,n),this.params=t,this.requestOptions=n,t.history&&(Te(t.history),this._history=t.history)}_formatRequest(e,t){var o;const n={history:[...this._history,...t,e]};return this.params.templateVariables&&(n.inputs=this.params.templateVariables),this.params.tools&&(n.tools=(o=this.params.tools)==null?void 0:o.map(i=>i.functionDeclarations?{templateFunctions:i.functionDeclarations.map(a=>{if(a.parameters){const r={...a};return delete r.parameters,r.inputSchema=a.parameters,r}return a})}:i)),this.params.toolConfig&&(n.toolConfig=this.params.toolConfig),n}_callGenerateContent(e,t){return ge(this._apiSettings,this.params.templateId,e,{...this.requestOptions,...t})}_callGenerateContentStream(e,t){return Se(this._apiSettings,this.params.templateId,e,{...this.requestOptions,...t})}async sendMessage(e,t){return this._sendMessage(e,t)}async sendMessageStream(e,t){return this._sendMessageStream(e,t)}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(e,t){this.requestOptions=t||{},this._apiSettings=Y(e)}async generateContent(e,t,n,o){return ge(this._apiSettings,e,{inputs:t,...o&&{toolConfig:o}},{...this.requestOptions,...n})}async generateContentStream(e,t,n,o){return Se(this._apiSettings,e,{inputs:t,...o&&{toolConfig:o}},{...this.requestOptions,...n})}startChat(e){return new Ot(this._apiSettings,e,this.requestOptions)}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(e,t){this.requestOptions=t||{},this._apiSettings=Y(e)}async generateImages(e,t,n){const o=await A({task:"templatePredict",templateId:e,apiSettings:this._apiSettings,stream:!1,singleRequestOptions:{...this.requestOptions,...n}},JSON.stringify({inputs:t}));return $(o)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N{constructor(e){if(!e.type&&!e.anyOf)throw new c(l.INVALID_SCHEMA,"A schema must have either a 'type' or an 'anyOf' array of sub-schemas.");for(const t in e)this[t]=e[t];this.type=e.type,this.format=e.hasOwnProperty("format")?e.format:void 0,this.nullable=e.hasOwnProperty("nullable")?!!e.nullable:!1}toJSON(){const e={type:this.type};for(const t in this)this.hasOwnProperty(t)&&this[t]!==void 0&&(t!=="required"||this.type===C.OBJECT)&&(e[t]=this[t]);return e}static array(e){return new yt(e,e.items)}static object(e){return new wt(e,e.properties,e.optionalProperties)}static string(e){return new ae(e)}static enumString(e){return new ae(e,e.enum)}static integer(e){return new Tt(e)}static number(e){return new It(e)}static boolean(e){return new At(e)}static anyOf(e){return new Ct(e)}}class Tt extends N{constructor(e){super({type:C.INTEGER,...e})}}class It extends N{constructor(e){super({type:C.NUMBER,...e})}}class At extends N{constructor(e){super({type:C.BOOLEAN,...e})}}class ae extends N{constructor(e,t){super({type:C.STRING,...e}),this.enum=t}toJSON(){const e=super.toJSON();return this.enum&&(e.enum=this.enum),e}}class yt extends N{constructor(e,t){super({type:C.ARRAY,...e}),this.items=t}toJSON(){const e=super.toJSON();return e.items=this.items.toJSON(),e}}class wt extends N{constructor(e,t,n=[]){super({type:C.OBJECT,...e}),this.properties=t,this.optionalProperties=n}toJSON(){const e=super.toJSON();e.properties={...this.properties};const t=[];if(this.optionalProperties){for(const n of this.optionalProperties)if(!this.properties.hasOwnProperty(n))throw new c(l.INVALID_SCHEMA,`Property "${n}" specified in "optionalProperties" does not exist.`)}for(const n in this.properties)this.properties.hasOwnProperty(n)&&(e.properties[n]=this.properties[n].toJSON(),this.optionalProperties.includes(n)||t.push(n));return t.length>0&&(e.required=t),delete e.optionalProperties,e}}class Ct extends N{constructor(e){if(e.anyOf.length===0)throw new c(l.INVALID_SCHEMA,"The 'anyOf' array must not be empty.");super({...e,type:void 0}),this.anyOf=e.anyOf}toJSON(){const e=super.toJSON();return this.anyOf&&Array.isArray(this.anyOf)&&(e.anyOf=this.anyOf.map(t=>t.toJSON())),e}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt{constructor(){this.mimeType="image/png"}static jpeg(e){return e&&(e<0||e>100)&&h.warn(`Invalid JPEG compression quality of ${e} specified; the supported range is [0, 100].`),{mimeType:"image/jpeg",compressionQuality:e}}static png(){return{mimeType:"image/png"}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nt=16e3,Lt=24e3,Ie="audio-processor",bt=`
  class AudioProcessor extends AudioWorkletProcessor {
    constructor(options) {
      super();
      this.targetSampleRate = options.processorOptions.targetSampleRate;
      // 'sampleRate' is a global variable available inside the AudioWorkletGlobalScope,
      // representing the native sample rate of the AudioContext.
      this.inputSampleRate = sampleRate;
    }

    /**
     * This method is called by the browser's audio engine for each block of audio data.
     * Input is a single input, with a single channel (input[0][0]).
     */
    process(inputs) {
      const input = inputs[0];
      if (input && input.length > 0 && input[0].length > 0) {
        const pcmData = input[0]; // Float32Array of raw audio samples.
        
        // Simple linear interpolation for resampling.
        const resampled = new Float32Array(Math.round(pcmData.length * this.targetSampleRate / this.inputSampleRate));
        const ratio = pcmData.length / resampled.length;
        for (let i = 0; i < resampled.length; i++) {
          resampled[i] = pcmData[Math.floor(i * ratio)];
        }

        // Convert Float32 (-1, 1) samples to Int16 (-32768, 32767)
        const resampledInt16 = new Int16Array(resampled.length);
        for (let i = 0; i < resampled.length; i++) {
          const sample = Math.max(-1, Math.min(1, resampled[i]));
          if (sample < 0) {
            resampledInt16[i] = sample * 32768;
          } else {
            resampledInt16[i] = sample * 32767;
          }
        }
        
        this.port.postMessage(resampledInt16);
      }
      // Return true to keep the processor alive and processing the next audio block.
      return true;
    }
  }

  // Register the processor with a name that can be used to instantiate it from the main thread.
  registerProcessor('${Ie}', AudioProcessor);
`;class Pt{constructor(e,t,n){this.liveSession=e,this.options=t,this.deps=n,this.isStopped=!1,this.stopDeferred=new be,this.playbackQueue=[],this.scheduledSources=[],this.nextStartTime=0,this.isPlaybackLoopRunning=!1,this.liveSession.inConversation=!0,this.receiveLoopPromise=this.runReceiveLoop().finally(()=>this.cleanup()),this.deps.workletNode.port.onmessage=o=>{if(this.isStopped)return;const i=o.data,r={mimeType:"audio/pcm",data:btoa(String.fromCharCode.apply(null,Array.from(new Uint8Array(i.buffer))))};this.liveSession.sendAudioRealtime(r)}}async stop(){this.isStopped||(this.isStopped=!0,this.stopDeferred.resolve(),await this.receiveLoopPromise)}cleanup(){this.interruptPlayback(),this.deps.workletNode.port.onmessage=null,this.deps.workletNode.disconnect(),this.deps.sourceNode.disconnect(),this.deps.mediaStream.getTracks().forEach(e=>e.stop()),this.deps.audioContext.state!=="closed"&&this.deps.audioContext.close(),this.liveSession.inConversation=!1}enqueueAndPlay(e){this.playbackQueue.push(e),this.processPlaybackQueue()}interruptPlayback(){[...this.scheduledSources].forEach(e=>e.stop(0)),this.playbackQueue.length=0,this.nextStartTime=this.deps.audioContext.currentTime}async processPlaybackQueue(){if(!this.isPlaybackLoopRunning){for(this.isPlaybackLoopRunning=!0;this.playbackQueue.length>0&&!this.isStopped;){const e=this.playbackQueue.shift();try{const t=new Int16Array(e),n=t.length,o=this.deps.audioContext.createBuffer(1,n,Lt),i=o.getChannelData(0);for(let r=0;r<n;r++)i[r]=t[r]/32768;const a=this.deps.audioContext.createBufferSource();a.buffer=o,a.connect(this.deps.audioContext.destination),this.scheduledSources.push(a),a.onended=()=>{this.scheduledSources=this.scheduledSources.filter(r=>r!==a)},this.nextStartTime=Math.max(this.deps.audioContext.currentTime,this.nextStartTime),a.start(this.nextStartTime),this.nextStartTime+=o.duration}catch(t){h.error("Error playing audio:",t)}}this.isPlaybackLoopRunning=!1}}async runReceiveLoop(){var t;const e=this.liveSession.receive();for(;!this.isStopped;){const n=await Promise.race([e.next(),this.stopDeferred.promise]);if(this.isStopped||!n||n.done)break;const o=n.value;if(o.type==="serverContent"){const i=o;i.interrupted&&this.interruptPlayback();const a=(t=i.modelTurn)==null?void 0:t.parts.find(r=>{var d;return(d=r.inlineData)==null?void 0:d.mimeType.startsWith("audio/")});if(a!=null&&a.inlineData){const r=Uint8Array.from(atob(a.inlineData.data),d=>d.charCodeAt(0)).buffer;this.enqueueAndPlay(r)}}else if(o.type==="toolCall")if(!this.options.functionCallingHandler)h.warn("Received tool call message, but StartAudioConversationOptions.functionCallingHandler is undefined. Ignoring tool call.");else try{const i=await this.options.functionCallingHandler(o.functionCalls);this.isStopped||this.liveSession.sendFunctionResponses([i])}catch(i){throw new c(l.ERROR,`Function calling handler failed: ${i.message}`)}}}}async function Zt(s,e={}){if(s.isClosed)throw new c(l.SESSION_CLOSED,"Cannot start audio conversation on a closed LiveSession.");if(s.inConversation)throw new c(l.REQUEST_ERROR,"An audio conversation is already in progress for this session.");if(typeof AudioWorkletNode>"u"||typeof AudioContext>"u"||typeof navigator>"u"||!navigator.mediaDevices)throw new c(l.UNSUPPORTED,"Audio conversation is not supported in this environment. It requires the Web Audio API and AudioWorklet support.");let t;try{t=new AudioContext,t.state==="suspended"&&await t.resume();const n=await navigator.mediaDevices.getUserMedia({audio:!0}),o=new Blob([bt],{type:"application/javascript"}),i=URL.createObjectURL(o);await t.audioWorklet.addModule(i);const a=t.createMediaStreamSource(n),r=new AudioWorkletNode(t,Ie,{processorOptions:{targetSampleRate:Nt}});a.connect(r);const d=new Pt(s,e,{audioContext:t,mediaStream:n,sourceNode:a,workletNode:r});return{stop:()=>d.stop()}}catch(n){throw t&&t.state!=="closed"&&t.close(),n instanceof c||n instanceof DOMException?n:new c(l.ERROR,`Failed to initialize audio recording: ${n.message}`)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function en(s=Ne(),e){s=we(s);const t=Ce(s,P),n=(e==null?void 0:e.backend)??new B,o={useLimitedUseAppCheckTokens:(e==null?void 0:e.useLimitedUseAppCheckTokens)??!1},i=xe(n),a=t.getImmediate({identifier:i});return a.options=o,a}const Mt=["mode","onDeviceParams","inCloudParams"];function tn(s,e,t){var r;const n=e;let o;if(n.mode){for(const d of Object.keys(e))Mt.includes(d)||h.warn(`When a hybrid inference mode is specified (mode is currently set to ${n.mode}), "${d}" cannot be configured at the top level. Configuration for in-cloud and on-device must be done separately in inCloudParams and onDeviceParams. Configuration values set outside of inCloudParams and onDeviceParams will be ignored.`);o=n.inCloudParams||{model:Ue}}else o=e;if(!o.model)throw new c(l.NO_MODEL,"Must provide a model name. Example: getGenerativeModel({ model: 'my-model-name' })");const i=(r=s.chromeAdapterFactory)==null?void 0:r.call(s,n.mode,typeof window>"u"?void 0:window,n.onDeviceParams),a=new pt(s,o,t,i);return a._apiSettings.inferenceMode=n.mode,a}function nn(s,e,t){if(!e.model)throw new c(l.NO_MODEL,"Must provide a model name. Example: getImagenModel({ model: 'my-model-name' })");return new St(s,e,t)}function sn(s,e){if(!e.model)throw new c(l.NO_MODEL,"Must provide a model name for getLiveGenerativeModel. Example: getLiveGenerativeModel(ai, { model: 'my-model-name' })");return new gt(s,e)}function on(s,e){return new Rt(s,e)}function an(s,e){return new _t(s,e)}function Dt(){Pe(new Me(P,$e,"PUBLIC").setMultipleInstances(!0)),J(K,H),J(K,H,"esm2020")}Dt();export{c as AIError,l as AIErrorCode,w as AIModel,Ct as AnyOfSchema,yt as ArraySchema,le as Backend,_ as BackendType,Ft as BlockReason,At as BooleanSchema,lt as ChatSession,_e as ChatSessionBase,g as FinishReason,Bt as FunctionCallingMode,pt as GenerativeModel,B as GoogleAIBackend,xt as HarmBlockMethod,Ut as HarmBlockThreshold,kt as HarmCategory,Gt as HarmProbability,ce as HarmSeverity,Ht as ImageConfigAspectRatio,$t as ImageConfigImageSize,Xt as ImagenAspectRatio,zt as ImagenImageFormat,St as ImagenModel,Qt as ImagenPersonFilterLevel,Kt as ImagenSafetyFilterLevel,R as InferenceMode,I as InferenceSource,Tt as IntegerSchema,Wt as Language,gt as LiveGenerativeModel,L as LiveResponseType,mt as LiveSession,Vt as Modality,It as NumberSchema,wt as ObjectSchema,qt as Outcome,z as POSSIBLE_ROLES,Yt as ResponseModality,N as Schema,C as SchemaType,ae as StringSchema,Rt as TemplateGenerativeModel,_t as TemplateImagenModel,jt as ThinkingLevel,Jt as URLRetrievalStatus,V as VertexAIBackend,en as getAI,tn as getGenerativeModel,nn as getImagenModel,sn as getLiveGenerativeModel,on as getTemplateGenerativeModel,an as getTemplateImagenModel,Zt as startAudioConversation};
