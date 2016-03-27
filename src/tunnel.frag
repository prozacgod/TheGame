precision mediump float;
precision mediump int;

precision lowp sampler2D;

/*precision mediump float;

varying vec2 vTextureCoord;
varying vec4 vColor;

uniform sampler2D uSampler;
uniform float customUniform;

void main(void)
{
   vec2 uvs = vTextureCoord.xy;

   vec4 fg = texture2D(uSampler, vTextureCoord);

   fg.r = uvs.y + sin(customUniform);

   fg.r = clamp(fg.r,0.0,0.9);

   gl_FragColor = fg;
}

*/

varying vec2 vMapCoord;
varying vec2 vTextureCoord;
varying vec4 vColor;

uniform vec2 dimensions;
uniform float iGlobalTime;
uniform sampler2D iChannel0;
uniform sampler2D iChannel1;

void main(void)
{
    vec2 p = vTextureCoord / iResolution;

    vec2 q = p - vec2(0.5, 0.5);

    q.x += sin(iGlobalTime* 0.6) * 0.2;
    q.y += cos(iGlobalTime* 0.4) * 0.3;

    float len = length(q);

    float a = atan(q.y, q.x) + iGlobalTime * 0.3;
    float b = atan(q.y, q.x) + iGlobalTime * 0.3;
    float r1 = 0.3 / len + iGlobalTime * 0.5;
    float r2 = 0.2 / len + iGlobalTime * 0.5;

    float m = (1.0 + sin(iGlobalTime * 0.5)) / 2.0;
    vec4 tex1 = texture2D(iChannel0, vec2(a + 0.1 / len, r1 ));
    vec4 tex2 = texture2D(iChannel1, vec2(b + 0.1 / len, r2 ));
    vec3 col = vec3(mix(tex1, tex2, m));

    gl_FragColor = vec4(col * len * 1.5, 1.0);
}