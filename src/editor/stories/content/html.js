const html = String.raw; // Just for better editor support

export default html` <p>I love <strong>HTML</strong> !</p>
  <h1>Heading 1</h1>
  <h2>Heading 2</h2>
  <h3>Heading 3</h3>
  <h4>Heading 4</h4>
  <h5>Heading 5</h5>
  <h6>Heading 6</h6>
  <h2>Color</h2>
  <p>
    <span style=" color:#db4501" data-text-color-mark="#db4501"
      >Text with color</span
    >
  </p>
  <h2>Underline</h2>
  <p><u>Underlined text</u></p>
  <h2>Link</h2>
  <p>
    <a href="https://educacion.bq.com/" rel="noopener noreferrer nofollow"
      >bq educación</a
    >
  </p>
  <h2>Image</h2>
  <p>
    <img
      alt="BQ Educación"
      src="https://educacion.bq.com/wp-content/uploads/2020/11/BQ_Educacion_versiones-logo_rgb_fondo_colores_Mesa-de-trabajo-1-copia-10-3.png.webp"
      title="BQ Educación"
      resizable="false"
    />
  </p>
  <h2>Blockquote</h2>
  <pre
    spellcheck="false"
    class="language-ts"
  ><code data-code-block-language="ts">const int button = 3;</code></pre>
  <h2>Lists</h2>
  <ul>
    <li>
      <p>an unordered</p>
      <ul>
        <li>
          <p>list is a thing</p>
          <ul>
            <li><p>of beauty</p></li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
  <ol>
    <li><p>As is</p></li>
    <li><p>An ordered</p></li>
    <li><p>List</p></li>
  </ol>`;
